import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController } from '@worldsibu/convector-core';
import { Contracts, Claim } from './contracts.model';
export declare class ContractsController extends ConvectorController<ChaincodeTx> {
    createContract(contracts: Contracts): Promise<void>;
    getContract(contractId: string): Promise<{
        readonly type?: "io.worldsibu.contracts";
        name?: string;
        invoiceNumber?: number;
        invoiceLineItem?: number;
        invoiceAmount?: number;
        claimAmount?: number;
        claimReasonCode?: number;
        resolutionCode?: number;
        resolutionAmount?: number;
        startDate?: number;
        endDate?: number;
        organization?: string;
        isConfirmed?: boolean;
        assignedFor?: string;
        pngAddress?: string;
        id?: string;
        update?: (content: {
            readonly type?: "io.worldsibu.contracts";
            name?: string;
            invoiceNumber?: number;
            invoiceLineItem?: number;
            invoiceAmount?: number;
            claimAmount?: number;
            claimReasonCode?: number;
            resolutionCode?: number;
            resolutionAmount?: number;
            startDate?: number;
            endDate?: number;
            organization?: string;
            isConfirmed?: boolean;
            assignedFor?: string;
            pngAddress?: string;
            id?: string;
            update?: any;
            fetch?: (storageOptions?: any) => Promise<void>;
            history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Contracts>[]>;
            save?: (storageOptions?: any) => Promise<void>;
            clone?: () => Contracts;
            toJSON?: (skipEmpty?: boolean) => any;
            delete?: (storageOptions?: any) => Promise<void>;
        }) => Promise<void>;
        fetch?: (storageOptions?: any) => Promise<void>;
        history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Contracts>[]>;
        save?: (storageOptions?: any) => Promise<void>;
        clone?: () => Contracts;
        toJSON?: (skipEmpty?: boolean) => any;
        delete?: (storageOptions?: any) => Promise<void>;
    }>;
    getAllContracts(): Promise<{
        readonly type?: "io.worldsibu.contracts";
        name?: string;
        invoiceNumber?: number;
        invoiceLineItem?: number;
        invoiceAmount?: number;
        claimAmount?: number;
        claimReasonCode?: number;
        resolutionCode?: number;
        resolutionAmount?: number;
        startDate?: number;
        endDate?: number;
        organization?: string;
        isConfirmed?: boolean;
        assignedFor?: string;
        pngAddress?: string;
        id?: string;
        update?: (content: {
            readonly type?: "io.worldsibu.contracts";
            name?: string;
            invoiceNumber?: number;
            invoiceLineItem?: number;
            invoiceAmount?: number;
            claimAmount?: number;
            claimReasonCode?: number;
            resolutionCode?: number;
            resolutionAmount?: number;
            startDate?: number;
            endDate?: number;
            organization?: string;
            isConfirmed?: boolean;
            assignedFor?: string;
            pngAddress?: string;
            id?: string;
            update?: any;
            fetch?: (storageOptions?: any) => Promise<void>;
            history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Contracts>[]>;
            save?: (storageOptions?: any) => Promise<void>;
            clone?: () => Contracts;
            toJSON?: (skipEmpty?: boolean) => any;
            delete?: (storageOptions?: any) => Promise<void>;
        }) => Promise<void>;
        fetch?: (storageOptions?: any) => Promise<void>;
        history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Contracts>[]>;
        save?: (storageOptions?: any) => Promise<void>;
        clone?: () => Contracts;
        toJSON?: (skipEmpty?: boolean) => any;
        delete?: (storageOptions?: any) => Promise<void>;
    }[]>;
    confirmContract(contractId: string): Promise<void>;
    declineContract(contractId: string): Promise<void>;
    invokeClaim(claim: Claim): Promise<void>;
    getClaim(claimID: string): Promise<{
        readonly type?: "io.worldsibu.contracts";
        contractID?: string;
        companyCode?: number;
        customerNumber?: number;
        documentNumber?: number;
        documentDate?: number;
        lineItem?: number;
        reasonCode?: string;
        amount?: number;
        currency?: string;
        isApproved?: boolean;
        id?: string;
        update?: (content: {
            readonly type?: "io.worldsibu.contracts";
            contractID?: string;
            companyCode?: number;
            customerNumber?: number;
            documentNumber?: number;
            documentDate?: number;
            lineItem?: number;
            reasonCode?: string;
            amount?: number;
            currency?: string;
            isApproved?: boolean;
            id?: string;
            update?: any;
            fetch?: (storageOptions?: any) => Promise<void>;
            history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Claim>[]>;
            save?: (storageOptions?: any) => Promise<void>;
            clone?: () => Claim;
            toJSON?: (skipEmpty?: boolean) => any;
            delete?: (storageOptions?: any) => Promise<void>;
        }) => Promise<void>;
        fetch?: (storageOptions?: any) => Promise<void>;
        history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Claim>[]>;
        save?: (storageOptions?: any) => Promise<void>;
        clone?: () => Claim;
        toJSON?: (skipEmpty?: boolean) => any;
        delete?: (storageOptions?: any) => Promise<void>;
    }>;
    getAllClaims(): Promise<{
        readonly type?: "io.worldsibu.contracts";
        contractID?: string;
        companyCode?: number;
        customerNumber?: number;
        documentNumber?: number;
        documentDate?: number;
        lineItem?: number;
        reasonCode?: string;
        amount?: number;
        currency?: string;
        isApproved?: boolean;
        id?: string;
        update?: (content: {
            readonly type?: "io.worldsibu.contracts";
            contractID?: string;
            companyCode?: number;
            customerNumber?: number;
            documentNumber?: number;
            documentDate?: number;
            lineItem?: number;
            reasonCode?: string;
            amount?: number;
            currency?: string;
            isApproved?: boolean;
            id?: string;
            update?: any;
            fetch?: (storageOptions?: any) => Promise<void>;
            history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Claim>[]>;
            save?: (storageOptions?: any) => Promise<void>;
            clone?: () => Claim;
            toJSON?: (skipEmpty?: boolean) => any;
            delete?: (storageOptions?: any) => Promise<void>;
        }) => Promise<void>;
        fetch?: (storageOptions?: any) => Promise<void>;
        history?: () => Promise<import("../../../../../../../../../Users/ventsislav/Documents/Hyperledger/pgtest/pgPoc/node_modules/@worldsibu/convector-core-model/dist/src/convector-model").History<Claim>[]>;
        save?: (storageOptions?: any) => Promise<void>;
        clone?: () => Claim;
        toJSON?: (skipEmpty?: boolean) => any;
        delete?: (storageOptions?: any) => Promise<void>;
    }[]>;
}
