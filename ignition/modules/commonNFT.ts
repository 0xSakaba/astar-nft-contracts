// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const input_baseTokenURI =
  "ipfs://bafkreiflw2uycuiwaat3auagiyeu7lmhioznxwmsy7lhgenhibqft34eie";

const AstarNFTCommonModule = buildModule("AstarNFTCommonModule", (m) => {
  const baseTokenURI = m.getParameter("baseTokenURI", input_baseTokenURI);

  const CommonNFT = m.contract("AstarNFTCommon", [baseTokenURI]);

  return { CommonNFT };
});

export default AstarNFTCommonModule;
