import { expect } from "chai";
import hre from "hardhat";
import { Signer } from "ethers";
import { AstarNFTCommon, AstarNFTRare } from "../typechain-types";

describe("NuushiNFT", function () {
  let AstarNFTCommon: AstarNFTCommon;
  let AstarNFTRare: AstarNFTRare;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const AstarNFTCommonFactory = await hre.ethers.getContractFactory(
      "AstarNFTCommon"
    );
    AstarNFTCommon = await AstarNFTCommonFactory.deploy("https://example.com/");

    const AstarNFTRareFactory = await hre.ethers.getContractFactory(
      "AstarNFTRare"
    );
    AstarNFTRare = await AstarNFTRareFactory.deploy("https://example.com/");
  });

  it("Should deploy the contract", async function () {
    expect(await AstarNFTCommon.name()).to.equal(
      "Astar Expansion: Soneium Edition - Common"
    );
    expect(await AstarNFTCommon.symbol()).to.equal("AESEC");

    expect(await AstarNFTRare.name()).to.equal(
      "Astar Expansion: Soneium Edition - Rare"
    );
    expect(await AstarNFTRare.symbol()).to.equal("AESER");
  });

  // it("Should mint NFTs within the sale period", async function () {
  //   await hre.ethers.provider.send("evm_increaseTime", [1]); // Increase time by 1 second
  //   await hre.ethers.provider.send("evm_mine", []);
  //   await NuushiNFT.connect(addr1).mint(1, {
  //     value: hre.ethers.parseEther("0.000777"),
  //   });
  //   expect(await NuushiNFT.totalSupply()).to.equal(1);
  // });

  // it("Should not mint NFTs exceeding the maximum supply", async function () {
  //   const newTimestamp = 1740700700;

  //   await hre.ethers.provider.send("evm_setNextBlockTimestamp", [newTimestamp]);
  //   await hre.ethers.provider.send("evm_mine", []);

  //   await expect(
  //     NuushiNFT.connect(addr1).mint(1000000, {
  //       value: hre.ethers.parseEther("777"),
  //     })
  //   ).to.be.revertedWith("Exceeds MAX_SUPPLY");
  // });

  // it("Should allow the owner to set the base URI", async function () {
  //   await NuushiNFT.connect(owner).setBaseURI("https://newexample.com/");

  //   await NuushiNFT.connect(addr1).mint(1, {
  //     value: hre.ethers.parseEther("0.000777"),
  //   });
  //   expect(await NuushiNFT.tokenURI(1)).to.equal("https://newexample.com/");
  // });

  // it("Should not mint NFTs after the sale period", async function () {
  //   // const block = await hre.ethers.provider.getBlock("latest");
  //   // console.log("Block timestamp:", block?.timestamp);

  //   const newTimestamp = 1740700799;

  //   await hre.ethers.provider.send("evm_setNextBlockTimestamp", [newTimestamp]);
  //   await hre.ethers.provider.send("evm_mine", []);

  //   await expect(
  //     NuushiNFT.connect(addr1).mint(1, {
  //       value: hre.ethers.parseEther("0.000777"),
  //     })
  //   ).to.be.revertedWith("Sale has ended");
  // });
});
