import {getProvider} from './helpers/contract';
import {deployContract} from 'ethereum-waffle';
import DubplateFactoryArtifact from '../artifacts/contracts/DubplateFactory.sol/DubplateFactory.json';
import {expect} from 'chai';
import {DubplateFactory} from '../typechain';

const [alice] = getProvider().getWallets();

describe('Dubplate Factory', () => {
    let dubplateFactory: DubplateFactory;

    beforeEach(async () => {
        dubplateFactory = (await deployContract(alice, DubplateFactoryArtifact)) as DubplateFactory;
    });

    describe('API', async () => {
        it('Should allow the owner to create new NFTs', async () => {
            expect(await dubplateFactory.create(
                "New track",
                "New Track",
                4000,
            )).to.eq('https://https://dubplate.trade/api/record/{id}.json');
        });
    });
});
