const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        callbackGasLimit: "500000", // 500,000 gas
    },
    4: {
        name: "rinkeby",
        subscriptionId: "2776",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cffcacd319c818142124b7a15e857ab",
    },
    1: {
        name: "mainnet",
        subscriptionId: "0",
        gasLane: "0x9fe0eebf5e446e3c998ec9bb19951541aee00bb90ea201ae456421a2ded86805", // 1000 gwei
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
    },
}

const developmentChains = [
    "hardhat",
    "localhost",
]

module.exports = {
    networkConfig,
    developmentChains,
}
