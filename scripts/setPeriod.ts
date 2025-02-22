import { ethers } from "hardhat";

const RARE_NFT_ADDRESS = "0xcBdbF291979BbaF4A69817E7EB5bCD4493c65eF5";

// UTC:
// 1:03PM-1:08PM - 3 - 發佈時間21:58V
// 1:11PM-1:16PM - 4 - 發佈時間22:06V
// 1:23PM-1:28PM - 5 - 發佈時間22:18V
// 1:34PM-1:39PM - 6 - 發佈時間22:29V
// 1:47PM-1:52PM - 7 - 發佈時間22:42

const day = 0; // dat from 3 to 7

async function main() {
  const periodSet = {
    3: {
      day: 3,
      start: 1740142980,
      end: 1740143280,
    },
    4: {
      day: 4,
      start: 1740143460,
      end: 1740143760,
    },
    5: {
      day: 5,
      start: 1740144180,
      end: 1740144480,
    },
    6: {
      day: 6,
      start: 1740144841,
      end: 1740145140,
    },
    7: {
      day: 7,
      start: 1740145620,
      end: 1740145920,
    },
  };

  const rareNFTContract = await ethers.getContractAt(
    "AstarNFTRare",
    RARE_NFT_ADDRESS
  );

  const tx = await rareNFTContract.setSalePeriod(
    periodSet[day].day,
    periodSet[day].start,
    periodSet[day].end
  );
  await tx.wait();
  console.log("Sale period set");
  console.log("Day: ", periodSet[day].day);
  console.log("Time start: ", periodSet[day].start);
  console.log("Time end: ", periodSet[day].end);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// run the script
// npx hardhat run scripts/setPeriod.ts --network soneium
