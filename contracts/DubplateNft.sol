pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DubplateNft is ERC721 {
    // What is the total number of this NFT that can be minted
    uint256 mintage;

    /**
        @param _name    string
        @param _symbol  string
        @param _mintage uint256
    **/
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _mintage
    ) public ERC721(_name, _symbol) {}
}
