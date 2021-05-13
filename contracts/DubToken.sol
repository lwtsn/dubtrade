pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DubToken is ERC20 {
    constructor() ERC20("Dub Token", "DUB") {
        _mint(msg.sender, 5000000 ether);
    }
}
