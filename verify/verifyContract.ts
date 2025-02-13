import hre from "hardhat";
import { sepolia_verify_address } from "../const";

const arg1 =
  "ipfs://bafkreihawciccb2k2but37kctudfuqzfjnaqrkdx7btwxkpy2dcpndg4iu";
async function main() {
  await hre.run("verify:verify", {
    address: "0x31896d4544AEf14045f34c90Fb4fbE5D96cD0470",
    constructorArguments: [arg1],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
