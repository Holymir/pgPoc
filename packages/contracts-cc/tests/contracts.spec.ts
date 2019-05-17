// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Contracts, ContractsController } from '../src';

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

  let staticID = uuid();
  let invoiceNumber = 123;
  let invoiceLineItem = 1234;
  let invoiceAmount = 12345;
  let claimAmount = 123456;
  let claimReasonCode = 1234567;
  let resolutionCode = 12345678;
  let resolutionAmount = 123456789;
  let endDate = new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 10);
  let organization = "OtherOrganisation";

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

  it('should create a default model', async () => {
    const modelSample = new Contracts({
      id: staticID,
      name: 'Test',
      invoiceNumber: invoiceNumber,
      invoiceLineItem: invoiceLineItem,
      invoiceAmount: invoiceAmount,
      claimAmount: claimAmount,
      claimReasonCode: claimReasonCode,
      resolutionCode: resolutionCode,
      resolutionAmount: resolutionAmount,
      startDate: Date.now(),
      endDate: endDate,
      organization: organization
    });

    await contractsCtrl.create(modelSample, "org1");

    const justSavedModel = await adapter.getById<Contracts>(modelSample.id);

    expect(justSavedModel.id).to.exist;
  });

  it('should approve contract', async () => {
    (adapter.stub as any).usercert = org2UserCert;
    console.log(adapter.stub);
    await contractsCtrl.confirmContract(staticID);
    const savedContract = await adapter.getById<Contracts>(staticID);
    expect(savedContract.isConfirmed).to.eq(true);
  });
});
