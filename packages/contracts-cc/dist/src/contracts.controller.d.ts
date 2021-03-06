import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController } from '@worldsibu/convector-core';
import { Contracts } from './contracts.model';
export declare class ContractsController extends ConvectorController<ChaincodeTx> {
    create(contracts: Contracts, assignedFor: string): Promise<void>;
    confirmContract(contractId: string): Promise<void>;
}
