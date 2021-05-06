pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Dubplate is ERC1155 {
    constructor() public ERC1155("https://https://dubplate.trade/api/record/{id}.json") {}
}
