import { NCPoolsInfo } from "@newcoin-foundation/newcoin-sdk";
import { BcApproveDaoProposalRequest, BcDaoProposalVoteRequest, BcDaoProposalVoteResponse, BcListDaoProposalsResponse } from "@newlife/newlife-creator-client-api";
import { HyperionAccountHistory } from "./types";

export interface PoolInfo {
    rows:     Row[];
    more:     boolean;
    next_key: string;
}

export interface Row {
    id:               number;
    code:             string;
    owner:            string;
    description:      string;
    total:            Total;
    creation_date:    Date;
    last_update_date: Date;
}

export interface Total {
    quantity: string;
    contract: string;
}


export default {
    account: {} as any,
    pools: {} as any,
    mainPool: {} as any,
    daos: {} as Record<string, {
        proposals: BcListDaoProposalsResponse,
    }>,
    cache: {
        accountHistory: {} as Record<string, HyperionAccountHistory>,
        pools: {
            byCode: {} as Record<string, NCPoolsInfo>,
            byOwner: {} as Record<string, NCPoolsInfo>
        },
        votes: {} as Record<string, BcDaoProposalVoteResponse>
    }
}