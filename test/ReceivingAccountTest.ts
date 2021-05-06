import {getProvider} from './helpers/contract';
import {deployContract} from 'ethereum-waffle';
import {Dubplate} from "../typechain";
import DubplateArtifact from "../artifacts/contracts/Dubplate.sol/Dubplate.json"
import {expect} from 'chai';

const [alice] = getProvider().getWallets();

describe('Dubplate', () => {
    let dubplate: Dubplate;

    beforeEach(async () => {
        dubplate = await deployContract(alice, DubplateArtifact) as Dubplate;
    });

    describe('API', async () => {
        it('Should set the API endpoint correctly', async () => {
            expect(await dubplate.uri(1)).to.eq('https://https://dubplate.trade/api/record/{id}.json');
        });
    });
});
