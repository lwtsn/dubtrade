pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ReceivingAccount {
    address artist;
    address treasury;
    uint8 treasuryShare;

    constructor(
        address _artist,
        address _treasury,
        uint8 _treasuryShare
    ) public {
        artist = _artist;
        treasury = _treasury;
        treasuryShare = _treasuryShare;
    }

    function deposit() public payable {}

    function withdraw(address _token) public {
        uint256 amount = ERC20(_token).balanceOf(address(this));

        require(amount > 0, "Nothing to withdraw");

        (uint256 shareForArtist, uint256 shareForTreasury) = calculateShare(amount);

        ERC20(_token).transfer(artist, shareForArtist);
        ERC20(_token).transfer(treasury, shareForTreasury);
    }

    function withdrawEthereum() public {
        uint256 amount = address(this).balance;

        require(amount > 0, "Nothing to withdraw");

        (uint256 shareForArtist, uint256 shareForTreasury) = calculateShare(amount);

        payable(address(artist)).transfer(shareForArtist);
        payable(address(treasury)).transfer(shareForTreasury);
    }

    function calculateShare(uint256 _amount) public view returns (uint256 _shareForArtist, uint256 _shareForTreasury) {
        uint256 artistShare = 100 - treasuryShare;
        uint256 shareForArtist = (_amount / 100) * artistShare;
        uint256 shareForTreasury = (_amount / 100) * treasuryShare;

        return (shareForArtist, shareForTreasury);
    }

    function setTreasuryShare(uint8 _treasuryShare) public {
        treasuryShare = _treasuryShare;
    }
}
