import { deployments, ethers } from 'hardhat';
import { assert, expect } from 'chai';
import { SogetiSoNFT } from '../typechain-types/contracts/sogetisonft.sol/SogetiSoNFT';
import { BigNumber } from 'ethers';

describe('Sogeti SoNFTs deploy', async () => {
  let sogetiContract: SogetiSoNFT;
  const customRevertErrorMessage =
      "VM Exception while processing transaction: reverted with custom error";

  beforeEach(async () => {
    await deployments.fixture(['all']);
    sogetiContract = await ethers.getContract('SogetiSoNFT');
  });

  it('Should be owned by the deployer', async () => {
    const [deployer] = await ethers.getSigners();
    expect(await sogetiContract.owner()).to.equal(deployer.address);
  });

  it('Should mint number of NFTs', async () => {
    await sogetiContract.mint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 20);
  });

  it('Should revert with custom error MaxSupplyExceeded() ', async () => {
    try {
      await sogetiContract.mint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 321);
    } catch(error: any) {
      expect(error.message).to.equal(
          `${customRevertErrorMessage} 'MaxSupplyExceeded()'`
      )
    }
  });
});
