// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";
//creating NFT contract (ERC721non-fungible)
//flexible but more expensive way of storing metadata
contract NFT is ERC721URIStorage {
    //assign all the functions inside the Counters library
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    //The contstructor takes an argument for the `mrketplace` address, 
    //saving the value and making it available in the smart contract.
    constructor(address mrktplace) ERC721("Eat The Blocks NFTs", "ETBNFT") {
        contractAddress = mrktplace;
    }
    //the developToken function can allow the Market contract approval to transfer
    //the token away from the owner to the seller
    function developToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 itemId = _tokenIds.current();

        //mint argument of sender of the message (current call) and itemId
        //emitting the transfer of tokens
        _mint(msg.sender, itemId);

        //set Token URI in the new NFT, which updates the mappin
        _setTokenURI(itemId, tokenURI);

        //sets the approval to trandfer token of the sender on their behalf.
        setApprovalForAll(contractAddress, true);
        return itemId;
    }
}