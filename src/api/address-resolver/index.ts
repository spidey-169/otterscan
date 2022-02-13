import { ensRenderer } from "../../components/ENSName";
import { plainStringRenderer } from "../../components/PlainString";
import { tokenRenderer } from "../../components/TokenName";
import { uniswapV1PairRenderer } from "../../components/UniswapV1ExchangeName";
import { uniswapV2PairRenderer } from "../../components/UniswapV2PairName";
import { uniswapV3PairRenderer } from "../../components/UniswapV3PoolName";
import { IAddressResolver, ResolvedAddressRenderer } from "./address-resolver";
import {
  CompositeAddressResolver,
  SelectedResolvedName,
} from "./CompositeAddressResolver";
import { ENSAddressResolver } from "./ENSAddressResolver";
import { UniswapV1Resolver } from "./UniswapV1Resolver";
import { UniswapV2Resolver } from "./UniswapV2Resolver";
import { UniswapV3Resolver } from "./UniswapV3Resolver";
import { ERCTokenResolver } from "./ERCTokenResolver";
import { HardcodedAddressResolver } from "./HardcodedAddressResolver";

export type ResolvedAddresses = Record<string, SelectedResolvedName<any>>;

// Create and configure the main resolver
const ensResolver = new ENSAddressResolver();
const uniswapV1Resolver = new UniswapV1Resolver();
const uniswapV2Resolver = new UniswapV2Resolver();
const uniswapV3Resolver = new UniswapV3Resolver();
const ercTokenResolver = new ERCTokenResolver();
const hardcodedResolver = new HardcodedAddressResolver();

const _mainnetResolver = new CompositeAddressResolver();
_mainnetResolver.addResolver(ensResolver);
_mainnetResolver.addResolver(uniswapV3Resolver);
_mainnetResolver.addResolver(uniswapV2Resolver);
_mainnetResolver.addResolver(uniswapV1Resolver);
_mainnetResolver.addResolver(ercTokenResolver);
_mainnetResolver.addResolver(hardcodedResolver);

const _defaultResolver = new CompositeAddressResolver();
_defaultResolver.addResolver(hardcodedResolver);

const resolvers: Record<number, IAddressResolver<SelectedResolvedName<any>>> = {
  1: _mainnetResolver,
  0: _defaultResolver,
};

export const getResolver = (
  chainId: number
): IAddressResolver<SelectedResolvedName<any>> => {
  const resolver = resolvers[chainId];
  if (resolver === undefined) {
    return resolver[0]; // default MAGIC NUMBER
  }
  return resolver;
};

export const resolverRendererRegistry = new Map<
  IAddressResolver<any>,
  ResolvedAddressRenderer<any>
>();
resolverRendererRegistry.set(ensResolver, ensRenderer);
resolverRendererRegistry.set(uniswapV1Resolver, uniswapV1PairRenderer);
resolverRendererRegistry.set(uniswapV2Resolver, uniswapV2PairRenderer);
resolverRendererRegistry.set(uniswapV3Resolver, uniswapV3PairRenderer);
resolverRendererRegistry.set(ercTokenResolver, tokenRenderer);
resolverRendererRegistry.set(hardcodedResolver, plainStringRenderer);
