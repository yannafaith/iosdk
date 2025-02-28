import { About } from "./Pages/About";
import { Auth } from "./Pages/Auth/Auth";
import { Authenticate } from "./Pages/Onboarding/Authenticate";
import { CreateUser } from "./Pages/Onboarding/CreateUser";
import { DomainSelector, Done, LinkHash } from "./Pages/Onboarding";
import { InviteesList, UserInvite } from "./Pages/User/UserInvite";
import { JoinDao } from "./Pages/JoinDao";
import { LegacyImport } from "./Pages/User/LegacyImport";
import { Mood } from "./Pages/Mood/Mood";
import { MoodCreate } from "./Pages/Mood/MoodCreate";
import { NLView } from "./types";
import { NotInvited } from "./Pages/Onboarding/NotInvited";
import { OnboardingTypeSelector } from "./Pages/Onboarding/OnboardingTypeSelector";
import { OverridableRoute } from "./Components/OverridableRoute";
import { Post, PostInTags } from "./Pages/Post/Post";
import { PostCreate } from "./Pages/Post/components/PostCreate";
import { Privacy } from "./Pages/Privacy";
import { Product } from "./Pages/Store/Product";
import { ProposalsPage } from "./Pages/Dao/Views/Proposals/ProposalList";
import { Route } from "react-router-dom";
import { SearchCreativePost } from "./Pages/SearchCreativePost";
import { SelectMoodForm } from "./Components/SelectMood";
import { State } from "./overmind/overmind";
import { TOS } from "./Pages/TOS";
import { User } from "./Pages/User/User";
import { UserCreate } from "./Pages/User/UserCreate";
import { UserStake } from "./Components/UserWidget";
import { UserUpdate } from "./Pages/User/UserUpdate";
import { ViewProposalPage } from "./Pages/Dao/Views/ProposalView/ViewProposal";
import { ViewWhitelistProposalPage } from "./Pages/Dao/Views/WhitelistProposalView/ViewWhitelistProposal";
import { daoRoutes } from "./Pages/Dao";
import { fischerYates } from "./utils/random";
import { useActions, useAppState } from "./overmind";
import { useEffect } from "react";
import Creators, { TopCreators } from "./Components/Creators";
import DaoCreate from "./Pages/Dao/Views/DaoCreate/DaoCreate";
import Explore from "./Pages/Explore/Explore";
import MyMoods from "./Pages/Mood/MyMoods";
import NewProposal from "./Pages/Dao/Views/NewProposal/NewProposal";
import Notifications from "./Components/Icons/Notifications";
import SearchCreative from "./Pages/SearchCreative";
import SearchTag from "./Pages/Tag/TagSearch";
import Spotlights from "./Components/Spotlights";
import TopFolders from "./Components/TopFolders";
import TopHashtags from "./Components/TopHashtags";
import UserTop from "./Pages/User/Top";

type HostDef = {
  hosts: string[];
  components: {
    Explore: NLView;
    Root: NLView;
  };
};

const UnknownHost: HostDef = {
  hosts: [],
  components: {
    Root: () => <>UnknownHost</>,
    Explore: () => <></>,
  },
};

const testDomain = window.location.host;

const HostToDomain: HostDef[] = [
  {
    hosts: ["newlink.page"],
    components: {
      Root: LinkHash,
      Explore: UserTop,
    },
  },
  {
    hosts: ["localhost", "www.newlife.io", "web.newlife.io", "web-dev.newlife.io", "share.newlife.io", "test.newlife.io"],
    components: {
      Root: LinkHash,
      Explore: Explore,
    },
  },
  {
    hosts: ["unsid.org", "web-dev.unsid.org"],
    components: {
      Root: LinkHash,
      Explore: () => (
        <>
          You are good to go.
          <br />
          Use Newsafe to access the apps in the Newcoin ecosystem:
          <br />
          <br />
          <ul>
            <li>
              <a href="https://web.newlife.io">newlife.IO</a>
            </li>
            <li>
              <a href="https://web.newlife.io">newthis.IO</a>
            </li>
            <li>
              <a href="https://web.newlife.io">newthat.OI</a>
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    hosts: ["dao.newmoon.ac"],
    components: {
      Root: LinkHash,
      Explore: () => {
        const actions = useActions();
        useEffect(() => {
          actions.routing.historyPush({ location: "/dao/newmoon.io" });
        }, []);
        return <></>;
      },
    },
  },
];

// const isNewlink = /newlink.page/.test(window.location.host)

const currentHost = window.location.host.replace(/:\d+/, "");
const HostBasedComponents =
  HostToDomain.find((htd) => htd.hosts.find((h) => h === currentHost))?.components || UnknownHost.components;

const View: NLView = (props) => <div {...props}>{props.children}</div>;
const Topics = () => <h3>Topics</h3>;
export const DEFAULT_ROUTES = (state: State) => [
  <OverridableRoute key="a" exact path="/auth" component={Auth} />,
  <OverridableRoute key="h" exact path="/" component={HostBasedComponents.Root} />,
  <OverridableRoute key="dj" exact path="/dao/join" component={JoinDao} />,

  <OverridableRoute key="np" exact path="/newlink.page" component={UserTop} />,
  <OverridableRoute key="c" exact path="/user-create" component={UserCreate} />,
  <OverridableRoute key="u" exact path="/my/profile" component={User} />,
  <OverridableRoute key="u" exact path="/my/profile/update" component={UserUpdate} />,
  <OverridableRoute key="d" exact path="/my/profile/notifications" component={Notifications} />,
  // <OverridableRoute key="d" exact path="/notifications" component={Notifications} />,
  <OverridableRoute key="e" path="/explore" component={HostBasedComponents.Explore} />,
  <OverridableRoute key="mm" path="/my/folders" component={MyMoods} />,

  <OverridableRoute key="t" path="/topics" component={Topics} />,
  <OverridableRoute key="b" path="/about" component={About} />,

  <OverridableRoute key="p" path="/post/:id" component={Post} />,
  <OverridableRoute key="pc" path="/post-create" component={PostCreate} />,

  <OverridableRoute key="mc" path="/mood-create" component={MoodCreate} />,
  <OverridableRoute key="sc" exact path="/search-creative" component={SearchCreative} />,
  <OverridableRoute key="scv" exact path="/search-creative/vote" component={SearchCreativePost} />,
  <OverridableRoute key="mpo" exact path="/mood/:moodId/:postId" component={Post} />,
  <OverridableRoute key="mo" exact path="/mood/:moodId" component={Mood} />,
  <OverridableRoute key="mp" exact path="/folder/:moodId/:postId" component={Post} />,
  <OverridableRoute key="m" exact path="/folder/:moodId" component={Mood} />,
  <OverridableRoute key="us" path="/user/stake/:id" component={UserStake} />,
  <OverridableRoute key="v" exact path="/user/:username" component={User} />,
  <OverridableRoute key="s" exact path="/payment/subscription" component={Product} />,
  <OverridableRoute key="ue" exact path="/auth/newlife-members" component={LegacyImport} />,
  <OverridableRoute key="sf" exact path="/save-folder" component={SelectMoodForm} />,
  <OverridableRoute key="ts" exact path="/terms_of_service" component={TOS} />,
  <OverridableRoute key="pp" exact path="/privacy_policy" component={Privacy} />,
  <OverridableRoute key="st" exact path="/search" component={SearchTag} />,
  <OverridableRoute key="st" exact path="/tags/:tags/:postId" component={PostInTags} />,

  // DAO
  ...daoRoutes,

  // Onboarding v2
  <OverridableRoute key="sulv" exact path="/signup/auth" component={Authenticate} />,
  <OverridableRoute key="sud" exact path="/signup/domain" component={DomainSelector} />,
  <OverridableRoute key="sus" exact path="/signup/subscribe" component={Product} />,
  <OverridableRoute key="suc" exact path="/signup/create" component={CreateUser} />,
  <OverridableRoute key="sudn" exact path="/signup/done" component={Done} />,
  <OverridableRoute key="suni" exact path="/signup/notInvited" component={NotInvited} />,

  // User Invite
  <OverridableRoute key="ui" exact path="/user/invite" component={UserInvite} />,
  <OverridableRoute key="uia" exact path="/user/invite/all" component={InviteesList} />,

  // Metamask
  <OverridableRoute key="suots" exact path="/signup/metamask" component={OnboardingTypeSelector} />,

  // TOP
  <OverridableRoute key="tc" exact path="/top/creators" component={TopCreators} />,
  <OverridableRoute key="tf" exact path="/top/folders" component={TopFolders} />,
  <OverridableRoute key="tp" exact path="/top/posts" component={Creators} />,
  <OverridableRoute key="th" exact path="/top/hashtags" component={TopHashtags} />,
  <OverridableRoute
    key="sp"
    exact
    path="/top/spotlights"
    component={() => <Spotlights title="Top Spotlights" posts={state.lists.top.posts.items} />}
  />,
  <OverridableRoute
    key="tv"
    exact
    path="/top/videos"
    component={() => <Spotlights title="Top Videos" posts={state.lists.top.videoPosts.items} />}
  />,
];
