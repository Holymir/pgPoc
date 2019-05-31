import { join, resolve } from "path";
import {keyStore, identityName, channel, chaincode, networkProfile, identityId, identityOrg} from './env';
import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';

import { ContractsController, Contracts } from 'contracts-cc';
const homedir = require('os').homedir();


let adapter: FabricControllerAdapter;

export function ContractsControllerBackEnd () { return ClientFactory(ContractsController, adapter);}



/**
 * Check if the identity has been initialized in the chaincode.
 */
export async function InitServerIdentity(userCert) {

    let userKeyStore = `/${homedir}/hyperledger-fabric-network/.hfc-${userCert}`;
    let networkProfile = `/${homedir}/hyperledger-fabric-network/network-profiles/${userCert}.network-profile.yaml`;

    adapter = new FabricControllerAdapter({
        txTimeout: 300000,
        user: identityName,
        channel,
        chaincode,
        keyStore: resolve(__dirname, userKeyStore),
        networkProfile: resolve(__dirname, networkProfile)
        // userMspPath: keyStore
    });

    await adapter.init();
    console.log(adapter);
}
