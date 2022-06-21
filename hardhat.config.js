require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require('@primitivefi/hardhat-dodoc');
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const REPORT_GAS = process.env.REPORT_GAS || false
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1
    },
    rinkeby: {
      url: RINKEBY_RPC_URL || "",
      chainId: 4,
      blockConfirmations: 6,
      saveDeployments: true,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    ropsten: {
      url: ROPSTEN_RPC_URL || "",
      chainId: 3,
      blockConfirmations: 6,
      saveDeployments: true,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    minter: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: {
      ropsten: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
    }
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  dodoc: {
    exclude: [
      "mocks"
    ]
  },
};
