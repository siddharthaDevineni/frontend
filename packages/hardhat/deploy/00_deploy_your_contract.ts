import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { ethers } from "hardhat";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const abiCoder = new ethers.AbiCoder();
  const hashResult = ethers.keccak256(abiCoder.encode(["uint8", "uint256"], [1, 1])); // move, salt
  console.log("hashResult: ", hashResult); 
  
  await deploy("RPS", {
    from: deployer,
    // Contract constructor arguments
    args: [hashResult, "0xE5D66682f152b630EdD3c55499F27dA14c18cBB6"],
    value: "1000000000000000000",
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
  
  // Get the deployed contract to interact with it after deploying.
  const rps = await hre.ethers.getContract<Contract>("RPS", deployer);
  console.log("RPS deployed at:", await rps.getAddress());
  console.log("contract j2: ", await rps.j2());
  console.log("contract stake: ", await rps.stake());
  console.log("contract c1: ", await rps.c1Hash());
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["RPS"];
