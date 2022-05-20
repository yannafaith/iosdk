import { debounce, pipe } from "overmind";
export const getAccountBalance = 
// pipe(
//     debounce(1000),
async ({ effects, state }, { user }) => {
    state.newcoin.account = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "", contract: "eosio.token" });
    // pools current user is in
    state.newcoin.mainPool = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "", contract: "pool.nco" });
    const ps = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "", contract: "pools2.nco" });
    state.newcoin.pools = ps?.acc_balances?.reduce((r, c) => {
        const [total, symbol] = c.split(/ /);
        return { ...r, [symbol]: total };
    }, {});
};
// )
export const getPoolInfo = pipe(debounce(200), async ({ effects, state }, { pool }) => {
    if (!(pool.code || pool.owner))
        return;
    console.log("getPoolInfo for " + pool.owner);
    try {
        const r = await effects.newcoin.newcoin.getPoolInfo(pool);
        if (!r.rows?.length)
            return;
        state.newcoin.cache.pools.byOwner[r.rows[0].owner] = r;
        state.newcoin.cache.pools.byCode[r.rows[0].code] = r;
    }
    catch (e) {
        debugger;
    }
});
export const getAccountHitory = 
// pipe(
// debounce(1000),
async ({ effects, state }, { user, force }) => {
    const curr = state.newcoin.cache.accountHistory[user?.username || ""];
    if (curr && !force)
        return;
    const r = await effects.newcoin.hyperion(`/v2/state/get_account?account=${user?.username}`);
    return state.newcoin.cache.accountHistory[user?.username || ""] = (await r.json());
};
// )
export const daoGetProposals = async ({ state }, { daoId, daoOwner, proposal_id }) => {
    const r = await state.api.client.newcoin.daoProposalListList({
        dao_owner: daoOwner
    });
    state.newcoin.daos[daoOwner] = state.newcoin.daos[daoOwner] ?? { proposals: {} };
    state.newcoin.daos[daoOwner].proposals = r.data;
};
export const daoCreate = async ({ state, actions }, createDaoInput) => {
    // if(!createDaoInput.author)
    //     return;
    try {
        const r = await state.api.client.newcoin.daoCreateCreate(createDaoInput);
        await actions.newcoin.daoGetProposals({ daoOwner: state.api.auth.user?.username || "" });
        return r.data;
    }
    catch (ex) {
        const e = ex;
        actions.ux.showNotification({ message: "That didn't work: " + (e.error.errorMessage.message || e.error.errorMessage) });
    }
};
export const daoCreateProposal = async ({ state, actions }, param) => {
    const vs = (param.vote_start || "").split(/Z/)[0];
    const ve = (param.vote_end || "").split(/Z/)[0];
    try {
        const r = await state.api.client.newcoin.daoProposalCreate({
            ...param,
            vote_start: vs,
            vote_end: ve
        });
        await actions.newcoin.daoGetProposals({ daoOwner: param.dao_owner || "" });
        return r.data;
    }
    catch (ex) {
        actions.ux.showNotification({ message: "That didn't work: " + ex.message });
    }
};
export const daoApproveProposal = async ({ state, actions }, param) => {
    const r = await state.api.client.newcoin.daoProposalApproveCreate({
        dao_owner: param.daoOwner,
        proposal_id: param.proposalId
    });
    await actions.newcoin.daoGetProposals({ daoOwner: param.daoOwner || "" });
    return r.data;
};
export const daoVoteProposal = async ({ state, actions }, voteRequest) => {
    const currUser = state.api.auth.user?.username;
    try {
        const r = await state.api.client.newcoin.daoProposalVoteCreate({
            ...voteRequest,
            voter: state.api.auth.user?.username || ""
        });
        actions.newcoin.voterListVotes({ voter: currUser });
        return r.data;
    }
    catch (ex) {
        const e = ex;
        actions.ux.showNotification({ message: "That didn't work: " + (e.error.errorMessage.message || e.error.errorMessage) });
    }
};
export const voterListVotes = async ({ state }, props) => {
    const voter = props?.voter || state.api.auth.user?.username || "";
    const r = await state.api.client.newcoin.daoProposalVotesList({
        voter
    });
    state.newcoin.cache.votes[voter] = r.data;
    return r.data;
};
//# sourceMappingURL=actions.js.map