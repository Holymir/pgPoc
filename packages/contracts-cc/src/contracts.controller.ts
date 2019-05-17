import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';


import { Contracts, Car } from './contracts.model';

@Controller('contracts')
export class ContractsController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async create(
    @Param(Contracts)
    contracts: Contracts,
    @Param(yup.string())
    assignedFor: string
  ) {
    contracts.isConfirmed = false;
    contracts.assignedFor = assignedFor;
    await contracts.save();
  }

  @Invokable()
  public async confirmContract(
      @Param(yup.string())
      contractId: string
  ) {
    console.log("!!!HERE!!!");
    console.log(this.sender);
    console.log(this.tx.identity.getAttributeValue("hf.Affiliation"));
    console.log(this.tx.identity);
    let contract  = await Contracts.getOne(contractId);
    if (this.tx.identity.getAttributeValue("hf.Affiliation") !== contract.assignedFor) {
      throw new Error(`Your organisation "${this.tx.identity.getAttributeValue("hf.Affiliation")}" is not allowed to sign this contract `);
    }
    contract.isConfirmed = true;
    await contract.save();
  }

  @Invokable()
  public async demoFunction(
      @Param(Car)
          car: Car
  ) {
    await car.save();
  }

  @Invokable()
  public async getDemo(
      @Param(yup.string())
          id: string
  ) {
    return Car.getOne(id);
  }
}
