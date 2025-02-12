// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const input_baseTokenURI =
  "ipfs://bafkreihawciccb2k2but37kctudfuqzfjnaqrkdx7btwxkpy2dcpndg4iu";

const AstarNFTRareModule = buildModule("AstarNFTRareModule", (m) => {
  const baseTokenURI = m.getParameter("baseTokenURI", input_baseTokenURI);

  const RareNFT = m.contract("AstarNFTRare", [baseTokenURI]);

  return { RareNFT };
});

export default AstarNFTRareModule;
