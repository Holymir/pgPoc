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
  // @Validate(yup.string())
  public isConfirmed: boolean;

  @Required()
  @Validate(yup.string())
  public assignedFor: string;
}
