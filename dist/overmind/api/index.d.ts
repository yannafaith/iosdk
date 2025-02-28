declare const _default: {
    actions: {
        onInitializeOvermind: import("../../types").Action<undefined, void>;
        auth: typeof import("./actions/auth");
        user: typeof import("./actions/user");
        mood: typeof import("./actions/mood");
        post: typeof import("./actions/post");
    };
    effects: {
        initialize(baseUrl: string): import("../../types").CreatorApi;
        updateToken(token: string): void;
        authorize(): Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    };
    state: {
        client: import("../../types").CreatorApi;
        auth: {
            status: import("../auth/state").AUTH_FLOW_STATUS_TYPE;
            user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse;
            moods: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
            authorized: boolean;
            admitted: boolean;
            userDisplayHandler: string;
            attempted: boolean;
            inviteesList: import("@newstackdev/iosdk-newgraph-client-js").UserInvitationPagedListReadPublicResponse;
        };
        cache: {
            users: {
                byUsername: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                    moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                }>;
                byId: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                    moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                }>;
            };
            powerups: import("./state").PowerupsCache;
            posts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
            videoPosts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
            moods: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse & {
                promise?: Promise<any> | null | undefined;
            }>;
            stakeHistory: {
                user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse;
                amount: string;
                response: any;
                error: any;
            }[];
        };
    };
};
export default _default;
