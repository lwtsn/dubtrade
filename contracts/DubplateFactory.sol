pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DubplateNft.sol";

contract DubplateFactory is Ownable {
    function create(
        string memory _name,
        string memory _symbol,
        uint256 _mintage
    ) public returns (address) {
        DubplateNft test = new DubplateNft(_name, _symbol, _mintage);

        return address(test);
    }
}
