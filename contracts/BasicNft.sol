// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

error BasicNft__MaxTokenSupplyReached();

/// @title Basic Nft
/// @author Adam Linscott
/// @notice This is a simple ERC721a implemenmettion for quickly deploying tokens for the purpose of testing
/// @dev This implementsOpenzeppelin security contracts, and ERC721A
contract BasicNft is
	ERC721A,
	Ownable
{
	/// Maximum token supply
	uint16 public constant MAX_SUPPLY = 10;
	string private baseURI;

	/// @dev Constructor sets up Chainlink VRF data
	constructor(string memory _baseUri) ERC721A("Cryptobys Demo Token", "CDT") {
		baseURI = _baseUri;
	}

	/////////////////////////////////
	///        Public Write       ///
	/////////////////////////////////

	function mint(
		uint8 quantity
	) public {
		if (quantity + _totalMinted() > MAX_SUPPLY) {
			revert BasicNft__MaxTokenSupplyReached();
		}

		uint256 startTokenId = _nextTokenId();

		_mint(msg.sender, quantity);
		emit TokensMinted(msg.sender, quantity, startTokenId);
	}


	/////////////////////////////////
	///         Only Owner        ///
	/////////////////////////////////

	function selfDestruct(address _paymentAddress) external onlyOwner {
		selfdestruct(payable(_paymentAddress));
	}

	/////////////////////////////////
	///        Pure / View        ///
	/////////////////////////////////
	
	function tokenURI(uint256 tokenId)
		public
		view
		override
		returns (string memory)
	{
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
		
        // If baseURI is set, concatenate the baseURI and tokenId with '.json' (via abi.encodePacked).
        if (bytes(baseURI).length > 0) {
            return string(abi.encodePacked(baseURI, tokenId,".json"));
        }

        return super.tokenURI(tokenId);
	}

	/////////////////////////////////
	///          Events           ///
	/////////////////////////////////

	event TokensMinted(
		address indexed minter,
		uint8 quantity,
		uint256 firstTokenId
	);
}
