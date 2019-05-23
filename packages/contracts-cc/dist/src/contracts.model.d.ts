import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Contracts extends ConvectorModel<Contracts> {
    readonly type: string;
    name: string;
    invoiceNumber: number;
    invoiceLineItem: number;
    invoiceAmount: number;
    claimAmount: number;
    claimReasonCode: number;
    resolutionCode: number;
    resolutionAmount: number;
    startDate: number;
    endDate: number;
    organization: string;
    isConfirmed: boolean;
    assignedFor: string;
    pngAddress: string;
}
export declare class Claim extends ConvectorModel<Claim> {
    readonly type: string;
    contractID: string;
    companyCode: number;
    customerNumber: number;
    documentNumber: number;
    documentDate: number;
    lineItem: number;
    reasonCode: string;
    amount: number;
    currency: string;
    isApproved: boolean;
}
