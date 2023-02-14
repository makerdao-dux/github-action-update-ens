import * as core from '@actions/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Resolver} from '@ensdomains/ens-contracts';
import {ethers} from 'ethers';
// import {
//   DefenderRelayProvider
//   //DefenderRelaySigner
// } from 'defender-relay-client/lib/ethers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line sort-imports
// import ENS, {getEnsAddress} from '@ensdomains/ensjs';

async function run(): Promise<void> {
  try {
    //const NAME = core.getInput('name');
    const KEY = core.getInput('key');
    const VALUE = core.getInput('value');
    const PRIVATE_KEY = core.getInput('privateKey');
    // const DEFENDER_API_KEY = core.getInput('defenderApiKey');
    // const DEFENDER_API_SECRET = core.getInput('defenderApiSecret');

    // const credentials = {
    //   apiKey: DEFENDER_API_KEY,
    //   apiSecret: DEFENDER_API_SECRET
    // };
    // const provider = new DefenderRelayProvider(credentials);
    //const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
    const provider = ethers.getDefaultProvider(
      'https://eth-goerli.alchemyapi.io/v2/O7gYjoxx31ZpVqufjIa_nJuxkBJMOQlq'
    );
    // const ens = new ENS({provider, ensAddress: getEnsAddress('5')}); //5 for goerli
    // core.debug('ens');
    // core.debug(ens);

    // const resolver = await provider.getResolver(NAME);
    // const text = await resolver?.getText(KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const resolverContract = new ethers.Contract(
      '0x19c2d5d0f035563344dbb7be5fd09c8dad62b001',
      Resolver,
      signer
    );

    const tx = await resolverContract.setText(
      '0xa9d4343022f7c39fe996f19b5ef8b55f3e1e5ee9865633c90c2225a906948241',
      KEY,
      VALUE
    );
    core.debug('tx');
    core.debug(tx);
    // const tx = await ens.name(NAME).setText(NAME, KEY, VALUE);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
