import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Contracts extends ConvectorModel<Contracts> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.contracts';

  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public invoiceNumber: number;

  @Required()
  @Validate(yup.number())
  public invoiceLineItem: number;

  @Required()
  @Validate(yup.number())
  public invoiceAmount: number;

  @Required()
  @Validate(yup.number())
  public claimAmount: number;

  @Required()
  @Validate(yup.number())
  public claimReasonCode: number;

  @Required()
  @Validate(yup.number())
  public resolutionCode: number;

  @Required()
  @Validate(yup.number())
  public resolutionAmount: number;

  @Required()
  @Validate(yup.number())
  public startDate: number;

  @Required()
  @Validate(yup.number())
  public endDate: number;

  @Required()
  @Validate(yup.string())
  public organization: string;

  @Required()
  @Validate(yup.bool())
  public isConfirmed: boolean;

  @Required()
  @Validate(yup.string())
  public assignedFor: string;

  @Required()
  @Validate(yup.string())
  public pngAddress : string;
}

export class Claim extends ConvectorModel<Claim> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.contracts';

  @Required()
  @Validate(yup.string())
  public contractID: string;

  @Required()
  @Validate(yup.number())
  public companyCode: number;

  @Required()
  @Validate(yup.number())
  public customerNumber: number;

  @Required()
  @Validate(yup.number())
  public documentNumber : number;

  @Required()
  @Validate(yup.number())
  public documentDate : number;

  @Required()
  @Validate(yup.number())
  public lineItem : number;

  @Required()
  @Validate(yup.string())
  public reasonCode : string;

  @Required()
  @Validate(yup.number())
  public amount : number;

  @Required()
  @Validate(yup.string())
  public currency : string;

  @Required()
  @Validate(yup.bool())
  public isApproved : boolean;
}
