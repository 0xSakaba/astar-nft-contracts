import { ethers } from "hardhat";

const RARE_NFT_ADDRESS = "0xcBdbF291979BbaF4A69817E7EB5bCD4493c65eF5";

// UTC:
// 1:03PM-1:08PM - 3 - 發佈時間21:58
// 1:11PM-1:16PM - 4 - 發佈時間22:06
// 1:23PM-1:28PM - 5 - 發佈時間22:18
// 1:34PM-1:39PM - 6 - 發佈時間22:29
// 1:47PM-1:52PM - 7 - 發佈時間22:42

const day = 4; // dat from 3 to 7

async function main() {
  const rareNFTContract = await ethers.getContractAt(
    "AstarNFTRare",
    RARE_NFT_ADDRESS
  );

  const res = await rareNFTContract.salePeriods(day);
  console.log(res);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// run the script
// npx hardhat run scripts/setPeriod.ts --network soneium
