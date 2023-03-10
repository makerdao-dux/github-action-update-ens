"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ens_contracts_1 = require("@ensdomains/ens-contracts");
const ethers_1 = require("ethers");
// import {
//   DefenderRelayProvider
//   //DefenderRelaySigner
// } from 'defender-relay-client/lib/ethers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line sort-imports
// import ENS, {getEnsAddress} from '@ensdomains/ensjs';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const provider = ethers_1.ethers.getDefaultProvider('https://eth-goerli.alchemyapi.io/v2/O7gYjoxx31ZpVqufjIa_nJuxkBJMOQlq');
            // const ens = new ENS({provider, ensAddress: getEnsAddress('5')}); //5 for goerli
            // core.debug('ens');
            // core.debug(ens);
            // const resolver = await provider.getResolver(NAME);
            // const text = await resolver?.getText(KEY);
            const signer = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
            const resolverContract = new ethers_1.ethers.Contract('0x19c2d5d0f035563344dbb7be5fd09c8dad62b001', ens_contracts_1.Resolver, signer);
            const tx = yield resolverContract.setText('0xa9d4343022f7c39fe996f19b5ef8b55f3e1e5ee9865633c90c2225a906948241', KEY, VALUE);
            core.debug('tx');
            core.debug(tx);
            // const tx = await ens.name(NAME).setText(NAME, KEY, VALUE);
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
