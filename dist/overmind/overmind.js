// import { firebaseRequestToken, firebaseVerifyPhone, historyPush, logout, newlifeAuthorize, onInitializeOvermind, onRouteChange, routeAfterAuth, setBreadcrumbs, setFbUser, setPreloginRoute, wrapPromise } from './actions';
import { namespaced } from 'overmind/config';
// import configuration from './config';
import { merge } from 'lodash';
import { config as defaultConfig } from "../config";
import { standardModules } from './standardModules';
// export type 
export const config = (cfg) => {
    const _cfg = { state: merge({}, defaultConfig, cfg) };
    return namespaced({
        ...standardModules,
        config: _cfg,
    });
};
//# sourceMappingURL=overmind.js.map