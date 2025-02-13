// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AstarNFTRare
 * @dev An example of an open edition NFT contract.
 */
contract AstarNFTRare is ERC721Enumerable, Ownable {
    string private _baseTokenURI;

    struct SalePeriod {
        uint256 start;
        uint256 end;
        uint256 mintedCount;
    }

    mapping(uint256 => SalePeriod) public salePeriods; // to store the period of each sale and the minted count
    mapping(address => uint256) private _mintedPerWallet;

    uint256 public constant MAX_MINT_PER_DAY = 300;
    uint256 public constant MAX_PER_WALLET = 1;

    event Minted(address indexed to, uint256 indexed tokenId);

    constructor(
        string memory baseTokenURI
    )
        ERC721("Astar Expansion: Soneium Edition - Rare", "AESER")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseTokenURI;

        // 2025/2/19 - 2/25 , 13:00 - 14:00 UTC
        salePeriods[1] = SalePeriod(1739970000, 1739973600, 0); // 2025-02-19
        salePeriods[2] = SalePeriod(1740056400, 1740060000, 0); // 2025-02-20
        salePeriods[3] = SalePeriod(1740142800, 1740146400, 0); // 2025-02-21
        salePeriods[4] = SalePeriod(1740229200, 1740232800, 0); // 2025-02-22
        salePeriods[5] = SalePeriod(1740315600, 1740319200, 0); // 2025-02-23
        salePeriods[6] = SalePeriod(1740402000, 1740405600, 0); // 2025-02-24
        salePeriods[7] = SalePeriod(1740488400, 1740492000, 0); // 2025-02-25
    }

    /**
     * @dev mint NFT
     */
    function mint() external {
        uint256 currentDay = getCurrentSaleDay();
        require(currentDay > 0, "Not in sale period");

        SalePeriod storage period = salePeriods[currentDay];

        require(block.timestamp >= period.start, "Sale has not started");
        require(block.timestamp <= period.end, "Sale has ended");

        require(
            period.mintedCount < MAX_MINT_PER_DAY,
            "Daily mint limit reached"
        );

        require(
            _mintedPerWallet[msg.sender] < MAX_PER_WALLET,
            "Max mint limit reached for wallet"
        );

        uint256 newTokenId = totalSupply() + 1;
        _safeMint(msg.sender, newTokenId);

        period.mintedCount++; // add minted count
        _mintedPerWallet[msg.sender]++;

        emit Minted(msg.sender, newTokenId);
    }

    /**
     * @dev check minted count of a day
     */
    function getMintedCount(uint256 day) external view returns (uint256) {
        return salePeriods[day].mintedCount;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _baseTokenURI;
    }

    /**
     * @dev set the sale period for a day
     */
    function setSalePeriod(
        uint256 day,
        uint256 start,
        uint256 end
    ) external onlyOwner {
        require(start < end, "Invalid time range");
        salePeriods[day] = SalePeriod(start, end, 0);
    }

    /**
     * @dev owner can set the base URI
     */
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        _baseTokenURI = _newBaseURI;
    }

    /**
     * @dev withdraw the contract balance
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @dev get the current sale day
     */
    function getCurrentSaleDay() public view returns (uint256) {
        for (uint256 i = 1; i <= 7; i++) {
            if (
                block.timestamp >= salePeriods[i].start &&
                block.timestamp <= salePeriods[i].end
            ) {
                return i;
            }
        }
        return 0; // not in sale period
    }

    /**
     * @dev check each wallet's minted count
     */
    function mintedCount(address wallet) external view returns (uint256) {
        return _mintedPerWallet[wallet];
    }
}
