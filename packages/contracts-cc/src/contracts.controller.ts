import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';


import { Contracts, Claim } from './contracts.model';

@Controller('contracts')
export class ContractsController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async createContract(
      @Param(Contracts)
          contracts: Contracts,
  ) {
    contracts.isConfirmed = false;
    contracts.pngAddress = this.sender;
    await contracts.save();
  }

  @Invokable()
  public async getContract(
      @Param(yup.string())
          contractId: string
  ) {
    return await Contracts.getOne(contractId);
  }

  @Invokable()
  public async getAllContracts(
  ) {
    return Contracts.getAll();
  }

  @Invokable()
  public async confirmContract(
      @Param(yup.string())
          contractId: string
  ) {
    let contract  = await Contracts.getOne(contractId);


    if (this.sender == contract.pngAddress) {
      throw new Error(`Confirming your own contacts is not allowed`);
    }

    if (this.tx.identity.getAttributeValue("hf.Affiliation") !== contract.assignedFor) {
      throw new Error(`Your organisation "${this.tx.identity.getAttributeValue("hf.Affiliation")}" is not allowed to sign this contract `);
    }

    contract.isConfirmed = true;
    await contract.save();
  }

  @Invokable()
  public async declineContract(
      @Param(yup.string())
          contractId: string
  ) {
    let contract  = await Contracts.getOne(contractId);
    contract.isConfirmed = false;
    await contract.save();
  }

  @Invokable()
  public async invokeClaim(
      @Param(Claim)
          claim: Claim
  ) {
    let contractID = claim.contractID;
    const contract = await Contracts.getOne(contractID);

    if(contract.isConfirmed) {
      throw new Error(`Contract ${contract.name} is approved`)
    }

    if(contract.endDate < Date.now()) {
      throw new Error(`Contract ${contract.name} is outdated`)
    }

    if (contract.claimAmount != claim.amount) {
      claim.isApproved = true;
    }
    await claim.save();
  }

  @Invokable()
  public async getClaim(
      @Param(yup.string())
          claimID: string
  ) {
    return Claim.getOne(claimID);
  }

  @Invokable()
  public async getAllClaims(
  ) {
    return Claim.getAll();
  }
}
