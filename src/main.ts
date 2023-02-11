import * as core from '@actions/core';
import ethers from 'ethers';
import {
  DefenderRelayProvider,
  DefenderRelaySigner
} from 'defender-relay-client/lib/ethers';
// @ts-ignore
import ENS, { getEnsAddress } from '@ensdomains/ensjs';

async function run(): Promise<void> {
  try {
    const NAME = core.getInput('name');
    const KEY = core.getInput('key');
    const VALUE = core.getInput('value');
    const DEFENDER_API_KEY = core.getInput('defenderApiKey');
    const DEFENDER_API_SECRET = core.getInput('defenderApiSecret');

    const credentials = { apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const ens = new ENS({ provider, ensAddress: getEnsAddress('5') }); //5 for mainnet
    const tx = ens.name(NAME).setText();
    console.log('tx', tx);

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
