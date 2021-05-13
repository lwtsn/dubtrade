import { getProvider } from './helpers/contract';
import { deployContract } from 'ethereum-waffle';
import { DubplateNft } from '../typechain';
import DubplateArtifact from '../artifacts/contracts/DubplateNft.sol/DubplateNft.json';
import { expect } from 'chai';

const [alice] = getProvider().getWallets();

describe('Dubplate', () => {
  let dubplate: DubplateNft;

  beforeEach(async () => {
    dubplate = (await deployContract(alice, DubplateArtifact)) as DubplateNft;
  });

  describe('API', async () => {
    it('Should set the API endpoint correctly', async () => {

    });
  });
});
