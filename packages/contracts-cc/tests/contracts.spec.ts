// tslint:disable:no-unused-expression
import {join, resolve} from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Contracts, Claim, ContractsController } from '../src';
import stringify = Mocha.utils.stringify;

describe('Contracts', () => {
  let adapter: MockControllerAdapter;

  let contractsCtrl: ConvectorControllerClient<ContractsController>;

  const org1UserCert = "-----BEGIN CERTIFICATE-----" +
      "MIICbTCCAhOgAwIBAgIUO6GYBZJtsTpIJ5qtvKzK2Uhu9Z8wCgYIKoZIzj0EAwIw" +
      "cTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh" +
      "biBGcmFuY2lzY28xGDAWBgNVBAoTD29yZzEuaHVybGV5LmxhYjEbMBkGA1UEAxMS" +
      "Y2Eub3JnMS5odXJsZXkubGFiMB4XDTE5MDUwODA3NDcwMFoXDTIwMDUwNzA3NTIw" +
      "MFowLjEcMA0GA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTEOMAwGA1UEAxMFdXNl" +
      "cjEwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATWQXEatp4yV3R/3YHflYvHNmYP" +
      "V9uunxm9sdiZBPmialHD1Lkad/JVC7z2pb0Rrvt2s6tp9MDKIuo/3XVLpna4o4HL" +
      "MIHIMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQSCdpd" +
      "livYtF4YRUhbaSojqVJAqjArBgNVHSMEJDAigCAKtHE7mN0D4BSlAwtfdsVSK2NU" +
      "7NMnN3LWCbEsPM6vSzBcBggqAwQFBgcIAQRQeyJhdHRycyI6eyJoZi5BZmZpbGlh" +
      "dGlvbiI6Im9yZzEiLCJoZi5F  bnJvbGxtZW50SUQiOiJ1c2VyMSIsImhmLlR5cGUi" +
      "OiJjbGllbnQifX0wCgYIKoZIzj0EAwIDSAAwRQIhAKYd7jmLC/UuDnikagWfo2tg" +
      "Mx3T/+/yYdeHr6RySAz0AiBCN7Q6wOJ/aAqW4v1g/DBnccaJ/7e/jRPugO2a3Win" +
      "SA==-----END CERTIFICATE-----";

  const org2UserCert = "-----BEGIN CERTIFICATE-----" +
      "MIICbTCCAhOgAwIBAgIUX1cddzIKTvAiUH9YhUq5zLQMeAgwCgYIKoZIzj0EAwIw" +
      "cTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh" +
      "biBGcmFuY2lzY28xGDAWBgNVBAoTD29yZzMuaHVybGV5LmxhYjEbMBkGA1UEAxMS" +
      "Y2Eub3JnMy5odXJsZXkubGFiMB4XDTE5MDUxNDA4MDIwMFoXDTIwMDUxMzA4MDcw" +
      "MFowLjEcMA0GA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTEOMAwGA1UEAxMFdXNl" +
      "cjUwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATa5klXykuSoodc2bj/pzclDuMK" +
      "SRPYkKMUKuTzfeHFULSwpQQu8J2owK/PzRVyKmEkk8mYncFzW59lolvdus9wo4HL" +
      "MIHIMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBTHgN1n" +
      "6wzNvQwb/oWRVgWi/YZfejArBgNVHSMEJDAigCA3Do+1wOq0pjoup/xgDHlpj3fH" +
      "ueFQ7//MGBF3aI2pUTBcBggqAwQFBgcIAQRQeyJhdHRycyI6eyJoZi5BZmZpbGlh" +
      "dGlvbiI6Im9yZzEiLCJoZi5FbnJvbGxtZW50SUQiOiJ1c2VyNSIsImhmLlR5cGUi" +
      "OiJjbGllbnQifX0wCgYIKoZIzj0EAwIDSAAwRQIhAMAGrgN0rhGL5n0BLEkPX+2g" +
      "JV+pXSJ4dJDp7KEVRw0bAiAI4rWse9lE4zDZL9kffv4mSp++TOnCvnI5fiA5LExA" +
      "1w==-----END CERTIFICATE-----";

  // contract model
  const staticID = uuid();
  const staticID2 = uuid(1);
  const invoiceNumber = 123;
  const invoiceLineItem = 1234;
  const invoiceAmount = 12345;
  const claimAmount = 1000;
  const claimReasonCode = 1234567;
  const resolutionCode = 12345678;
  const resolutionAmount = 123456789;
  const endDate = new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 10);
  const organization = "OtherOrganisation";
  const document = "Ly8gdGhpcyBoYXMgb3RoZXIgcHJvcGVydGllcyBhbHNvCmV4cG9ydCBjbGFzcyBNYXN0ZXJTZXJ2aWNlQWdyZWVtZW50IGV4dGVuZHMgQ29udmVjdG9yTW9kZWw8TWFzdGVyU2VydmljZUFncmVlbWVudD4gewoKICBwdWJsaWMgcGFydHlBSWQ6IHN0cmluZzsKCiAgcHVibGljIHBhcnR5QklkOiBzdHJpbmc7Cn0KCi8vIEkgd2FudCB0byBnZXQgdGhlIGxpc3Qgb2YgTWFzdGVyU2VydmljZUFncmVlbWVudHMgb2YgdHdvIHBhcnRpZXMgKHBhcnR5IGEgYW5kIHBhcnR5IGIpCmV4cG9ydCBjbGFzcyBNU0FMaXN0IGV4dGVuZHMgQ29udmVjdG9yTW9kZWw8TVNBTGlzdD4gewogIHB1YmxpYyBwYXJ0eUFJZDogc3RyaW5nOwoKICBwdWJsaWMgcGFydHlCSWQ6IHN0cmluZzsKCiAgcHVibGljIGFncmVlbWVudHM6IE1hc3RlclNlcnZpY2VBZ3JlZW1lbnRbXTsKfQoKLy8gdG8gZ2V0IHRoZSBhZ3JlZW1lbnRzIG9mIGEgcGFydHkKLy8gcGFydHlJZCBjYW4gYmUgcGFydHlBSWQgb3IgcGFydHlCSWQKQEludm9rYWJsZSgpCnB1YmxpYyBhc3luYyBnZXRNU0FMaXN0QnlQYXJ0eSgKICAgIEBQYXJhbSh5dXAuc3RyaW5nKCkpCiAgICBwYXJ0eUlkOiBzdHJpbmcsCiAgKSB7CiAgICAvLyBUT0RPOiBjb3JyZWN0IHRoaXMgcXVlcnkKICAgIHJldHVybiBhd2FpdCBNU0FMaXN0LnF1ZXJ5KE1TQUxpc3QsIHsKICAgICAgJ3NlbGVjdG9yJzogewogICAgICAgICckb3InOiBbCiAgICAgICAgICB7ICdwYXJ0eUFJZCc6IHBhcnR5SWQgfSwKICAgICAgICAgIHsgJ3BhcnR5QklkJzogcGFydHlJZCB9LAogICAgICAgIF0KICAgICAgfQogICAgfSkKICB9Cg==";

  // claim model
  const claimID = uuid(2);
  const companyCode = 123;
  const customerNumber = 234;
  const documentNumber = 345;
  const lineItem = 456;
  const reasonCode = "567";
  const currency = "GRD";
  const assignedFor = "org1";

  const contractSample = new Contracts({
    id: staticID,
    name: 'First Contract',
    invoiceNumber: invoiceNumber,
    invoiceLineItem: invoiceLineItem,
    invoiceAmount: invoiceAmount,
    claimAmount: claimAmount,
    claimReasonCode: claimReasonCode,
    resolutionCode: resolutionCode,
    resolutionAmount: resolutionAmount,
    startDate: Date.now(),
    endDate: endDate,
    organization: organization,
    assignedFor: assignedFor,
    document: document
  });

  const contractSample2 = new Contracts({
    id: staticID2,
    name: 'Second Contract',
    invoiceNumber: invoiceNumber,
    invoiceLineItem: invoiceLineItem,
    invoiceAmount: invoiceAmount,
    claimAmount: claimAmount,
    claimReasonCode: claimReasonCode,
    resolutionCode: resolutionCode,
    resolutionAmount: resolutionAmount,
    startDate: Date.now(),
    endDate: Date.now(),
    organization: organization,
    assignedFor: assignedFor,
    document: document
  });

  const claimSample = new Claim({
    id: claimID,
    contractID: staticID,
    companyCode: companyCode,
    customerNumber: customerNumber,
    documentNumber: documentNumber,
    documentDate: Date.now(),
    lineItem: lineItem,
    reasonCode: reasonCode,
    amount: claimAmount,
    currency: currency,
    isApproved: false
  });

  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    contractsCtrl = ClientFactory(ContractsController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'ContractsController',
        name: join(__dirname, '..')
      }
    ]);
  });

  it('should create contract proposal', async () => {
    await contractsCtrl.createContract(contractSample);

    const justSavedModel = await adapter.getById<Contracts>(contractSample.id);
    expect(justSavedModel.id).to.exist;
  });

  it('should approve contract', async () => {
    (adapter.stub as any).usercert = org2UserCert;
    await contractsCtrl.confirmContract(staticID);
    const savedContract = await adapter.getById<Contracts>(staticID);
    expect(savedContract.isConfirmed).to.eq(true);
  });

  it('should not approve contract if tried from uploader', async () => {
    await contractsCtrl.confirmContract(staticID);
    const savedContract = await adapter.getById<Contracts>(staticID);
    expect(savedContract.isConfirmed).to.eq(true);
  });

  it('should decline contract', async () => {
    (adapter.stub as any).usercert = org2UserCert;
    await contractsCtrl.declineContract(staticID);
    const savedContract = await adapter.getById<Contracts>(staticID);
    expect(savedContract.isConfirmed).to.eq(false);
  });

  it('should return one contract', async () => {
    let result = await contractsCtrl.getContract(staticID);
    let contract = new Contracts(result);
    expect(contract.id).to.exist;
  });

  it('should return all contract', async () => {
    await contractsCtrl.createContract(contractSample2);

    let result = await contractsCtrl.getAllContracts();
    let contract = result.map(model => new Contracts(model));
    contract.forEach(contract => expect(contract.id).to.exist);
  });

  it('should invoke a valid claim', async () => {
    await contractsCtrl.invokeClaim(claimSample);
    let claim = await contractsCtrl.getClaim(claimID);
    expect(claim.isApproved);
  });

  it('should invoke an outdated claim', async () => {
    claimSample.contractID = staticID2;

    // await contractsCtrl.invokeClaim(claimSample);

    await expect(contractsCtrl.invokeClaim(claimSample)).to.throw;

  });

  it('should return one claim', async () => {
    let result = await contractsCtrl.getClaim(claimID);
    let claim = new Claim(result);
    expect(claim.id == claimID);
  });

  it('should return all claims', async () => {
    let result = await contractsCtrl.getAllClaims();
    let claims = result.map(model => new Claim(model));
    claims.forEach(claim => expect(claim.id).to.exist);
  });

});
