import { Action } from "../../../types";
import { MoodCreateRequest, MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { debounce, pipe } from "overmind";
import isEmpty from "lodash/isEmpty";
import uniqBy from "lodash/uniqBy";

export const cache: Action<{
  moods?: (MoodReadResponse & { promise?: Promise<any> })[];
  overwrite?: boolean;
}> = async ({ state, actions, effects }, { moods, overwrite }) => {
  if (!moods) return;

  if ((moods as any).id && !(moods instanceof Array)) moods = [moods];

  /* dexie cache - TODO: in progress, now it just saves values without utilizing it - makes e2e testing unstable */
  // await Promise.all(
  //   moods.map(async (m) => {
  //     if (!m.posts || m.promise) return Promise.resolve();

  //     return Promise.all([
  //       actions.api.post.cache({ posts: m.posts }),
  //       actions.cache.store({ label: "folder", value: m }),
  //       actions.cache.storeEdgeMultiple({
  //         fromLabel: "folder",
  //         toLabel: "post",
  //         from: [m],
  //         to: m.posts,
  //       }),
  //     ]);
  //     // await actions.api.post.cache({ posts: m.posts });
  //     // await ;
  //   }),
  // );

  moods.forEach((m) => {
    const id = m.id || "";
    const curr = state.api.cache.moods[id] || {};

    if (!m.promise) {
      m.posts && actions.api.post.cache({ posts: m.posts });

      m.posts?.forEach(
        (p) =>
          p.id &&
          (state.api.cache.posts[p.id] = {
            ...state.api.cache.posts[p.id],
            ...p,
          }),
      );
    }

    // const currPosts = m.posts;

    state.api.cache.moods[id] = {
      ...m,
      ...curr,
      promise: m.promise || null,
      posts: uniqBy(((curr.posts && curr.posts.length) || 0) < ((m && m.posts?.length) || 0) ? m.posts : curr.posts, "id"),
    };

    // if(
    //     // !curr?.id ||
    //     // curr.promise ||
    //     // new Date(curr.updated || "").getDate() < new Date(m.updated || "").getDate(),
    //     // overwrite ||

    // ) {
    //     state.api.cache.moods[id].posts = posts;
    // }
  });
};

export const read: Action<{ id?: string }> = async ({ state, actions, effects }, { id }) => {
  console.log("start");
  if (!id) return;

  const curr = state.api.cache.moods[id] || {};

  if (curr.promise) return; // await curr.promise;

  const promise = state.api.client.mood.moodList({ id });

  console.log(await promise, "moods");

  await actions.api.mood.cache({ moods: [{ id, promise }] });

  const r = await promise;

  await actions.api.mood.cache({ moods: [r.data] });
  //state.api.cache.moods[id] = r.data;
};

export const readMultiple: Action<{ moods: MoodReadResponse[] }> = async ({ state, actions, effects }, { moods }) => {
  moods?.filter((m) => m?.posts?.length || 0 <= 4).forEach((m) => actions.api.mood.read(m));
};

export const getPosts: Action<MoodReadResponse> = pipe(debounce(100), async ({ state, actions, effects }, mood) => {
  if (!mood.id) return;
  if (state.indicators.specific["__getPosts" + mood.id]) return;
  state.indicators.specific["__getPosts" + mood.id] = true;
  const page = state.lists.selectedUser.posts.page ?? 0;
  const r = await state.api.client.mood.postsList({ id: mood.id, page: page.toString() });
  if (isEmpty(r.data?.value)) {
    state.lists.selectedUser.isNextPostsAvailable = false;
    return;
  }
  state.indicators.specific["__getPosts" + mood.id] = false;

  // state.api.cache.moods[id] = { ...state.api.cache.moods[id], posts: uniqBy(r.data.value, p => p.id) };
  await actions.api.mood.cache({ moods: [{ ...mood, posts: r.data.value }] });
  r.data.value?.forEach((p) => p.id && (state.api.cache.posts[p.id] = { ...state.api.cache.posts[p.id], ...p }));
  state.lists.selectedUser.posts.page++;
  // state.api.users[id] = {
  //     ...state.api.users[id],
  //     moods: (r.data?.value || []) as MoodReadResponse[]
  // };
});

export const create: Action<{ mood: MoodCreateRequest }, MoodReadResponse> = pipe(
  debounce(100),
  async ({ state, actions, effects }, { mood }) => {
    const m = await state.api.client.mood.moodCreate(mood);
    await actions.api.mood.cache({ moods: [m.data] });
    state.api.auth.moods.push(m.data);
    return m.data;
  },
);
