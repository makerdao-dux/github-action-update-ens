import * as core from '@actions/core';
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
    const NAME = core.getInput('name');
    const KEY = core.getInput('key');
    const VALUE = core.getInput('value');
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

    const resolver = await provider.getResolver(NAME);
    const text = await resolver?.getText(KEY);

    // const tx = await ens.name(NAME).setText(NAME, KEY, VALUE);
    core.debug('text');
    core.debug(text ? text : '');
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
