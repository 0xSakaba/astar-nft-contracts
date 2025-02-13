import hre from "hardhat";
import { sepolia_verify_address } from "../const";

const arg1 =
  "ipfs://bafkreihawciccb2k2but37kctudfuqzfjnaqrkdx7btwxkpy2dcpndg4iu";
async function main() {
  await hre.run("verify:verify", {
    address: "0x15A580c90B10bF98dFe66f28B8e96D08150Cb6a4",
    constructorArguments: [arg1],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
