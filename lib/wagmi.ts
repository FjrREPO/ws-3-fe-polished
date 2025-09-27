import { http, createConfig } from "wagmi"
import {
  base,
  baseSepolia,
} from "wagmi/chains"
import { injected, metaMask, walletConnect } from "wagmi/connectors"

const projectId = "b4876f2e352abe23effb6273efd564af";

export const config = createConfig({
  chains: [
    baseSepolia,
    base,
  ],
  connectors: [
    metaMask(),
    walletConnect({ projectId }),
    injected(),
  ],
  transports: {
    [base.id]: http(""),
    [baseSepolia.id]: http(""),
  },
});
