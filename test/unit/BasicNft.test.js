const { assert, expect } = require("chai");
const { BigNumber } = require("ethers");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

const MAX_TOKEN_SUPPLY_REACHED_ERROR = "BasicNft__MaxTokenSupplyReached";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BasicNft", function () {
        let deployer_BasicNft, minter_BasicNft, deployer, minter, vrfCoordinatorMock;

        beforeEach(async function () {
            deployer = (await getNamedAccounts()).deployer;
            minter = (await getNamedAccounts()).minter;
            await deployments.fixture(["all"]);
            deployer_BasicNft = await ethers.getContract("BasicNft", deployer);
            minter_BasicNft = await ethers.getContract("BasicNft", minter);
        });

        // Token Const values
        let MAX_SUPPLY;
        beforeEach(async function () {
            MAX_SUPPLY = await deployer_BasicNft.MAX_SUPPLY();
        });

        describe("mint", function () {
            it("reverts if quantity would put supply over MAX_SUPPLY", async function () {
                await expect(minter_BasicNft.mint(
                    MAX_SUPPLY + 1
                )).to.be.revertedWith(MAX_TOKEN_SUPPLY_REACHED_ERROR);
            });

            it("mints correct number of token for address", async function () {
                const MINT_NUMBER = 6;
                await minter_BasicNft.mint(
                    MINT_NUMBER,
                );
                const accountBalance = await minter_BasicNft.balanceOf(minter);
                assert.equal(accountBalance, MINT_NUMBER);
            });

            it("emits event on mint", async function () {
                await expect(minter_BasicNft.mint(
                    1,
                )).to.emit(minter_BasicNft, "TokensMinted");
            });
        });

        describe("tokenURI", function () {
            beforeEach(async function () {
                await minter_BasicNft.mint(
                    1,
                );
            });

            it("returns JSON data", async function () {
                const res = await minter_BasicNft.tokenURI(0);
                console.log(res);
                assert(typeof (res) == "string");
            });
        });

        /////////////////////////////////
        ///         Only Owner        ///
        /////////////////////////////////
        describe("onlyOwner", function () {
        });
    });
