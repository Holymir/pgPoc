import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController } from '@worldsibu/convector-core';
import { Contracts, Claim } from './contracts.model';
export declare class ContractsController extends ConvectorController<ChaincodeTx> {
    createContract(contracts: Contracts): Promise<void>;
    getContract(contractId: string): Promise<Contracts>;
    getAllContracts(): Promise<Contracts[]>;
    confirmContract(contractId: string): Promise<void>;
    declineContract(contractId: string): Promise<void>;
    invokeClaim(claim: Claim): Promise<void>;
    getClaim(claimID: string): Promise<Claim>;
    getAllClaims(): Promise<Claim[]>;
}
