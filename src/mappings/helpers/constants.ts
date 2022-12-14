import { BigDecimal, BigInt, Address, dataSource } from '@graphprotocol/graph-ts';

import assets from './assets';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProtocolFeeType {
  export const Swap = 0;
  export const FlashLoan = 1;
  export const Yield = 2;
  export const Aum = 3;
}

export let ZERO = BigInt.fromI32(0);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export const SWAP_IN = 0;
export const SWAP_OUT = 1;

export let ZERO_ADDRESS = Address.fromString('0x0000000000000000000000000000000000000000');

export let MIN_POOL_LIQUIDITY = BigDecimal.fromString('2000');
export let MIN_SWAP_VALUE_USD = BigDecimal.fromString('1');

export let USD_STABLE_ASSETS = assets.stableAssets;
export let PRICING_ASSETS = assets.stableAssets.concat(assets.pricingAssets);

class AddressByNetwork {
  public mainnet: string;
  public goerli: string;
  public polygon: string;
  public arbitrum: string;
  public dev: string;
  public aurora_testnet: string;
  public aurora: string;
  public mumbai: string;
}

let network: string = dataSource.network();

let vaultAddressByNetwork: AddressByNetwork = {
  mainnet: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  goerli: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  polygon: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  arbitrum: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
  dev: '0xa0B05b20e511B1612E908dFCeE0E407E22B76028',
  aurora_testnet: '0x39526464ac81f75009a8c1e425f2340e7f1ddfd4',
  aurora: '0x364d44dFc31b3d7b607797B514348d57Ad0D784E',
  mumbai: '0x7e5D79D67A1dAc16E8024B99c4B8A8Ec37C5eA2B',
};

function forNetwork(addressByNetwork: AddressByNetwork, network: string): Address {
  if (network == 'mainnet') {
    return Address.fromString(addressByNetwork.mainnet);
  } else if (network == 'goerli') {
    return Address.fromString(addressByNetwork.goerli);
  } else if (network == 'matic') {
    return Address.fromString(addressByNetwork.polygon);
  } else if (network == 'arbitrum-one') {
    return Address.fromString(addressByNetwork.arbitrum);
  } else if (network == 'aurora-testnet') {
    return Address.fromString(addressByNetwork.aurora_testnet);
  } else if (network == 'aurora') {
    return Address.fromString(addressByNetwork.aurora);
  } else if (network == 'mumbai') {
    return Address.fromString(addressByNetwork.mumbai);
  } else {
    return Address.fromString(addressByNetwork.dev);
  }
}

export let VAULT_ADDRESS = forNetwork(vaultAddressByNetwork, network);
