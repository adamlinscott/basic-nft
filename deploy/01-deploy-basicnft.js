const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const deploymentArgs = [
        'https://gateway.pinata.cloud/ipfs/QmUthTMGJZgwN4Ujupat3risBg2xLsEkYokDq3NZK1tQWh'
    ];

    const basicnft = await deploy("BasicNft", {
        from: deployer,
        args: deploymentArgs,
        log: true,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("will verify on etherscan here");
        await verify(basicnft.address, deploymentArgs);
    }
}

module.exports.tags = ["all", "basicnft"];
