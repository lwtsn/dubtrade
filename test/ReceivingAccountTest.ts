import {getProvider} from './helpers/contract';
import {deployContract, deployMockContract, MockContract} from 'ethereum-waffle';
import {Erc20, ReceivingAccount} from "../typechain";
import ReceivingAccountArtifact from "../artifacts/contracts/ReceivingAccount.sol/ReceivingAccount.json"
import Erc20Artifact from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"
import {BigNumber} from "ethers";
import {expect} from 'chai';
import {oneEther} from "./helpers/numbers";

const [deployer, treasury, artist] = getProvider().getWallets();

describe('Receiving Account', () => {
    let receivingAccount: ReceivingAccount;
    let token: Erc20 | MockContract;

    let iniitalTreasuryShare = 10;

    beforeEach(async () => {
        receivingAccount = await deployContract(
            deployer,
            ReceivingAccountArtifact,
            [
                artist.address,
                treasury.address,
                iniitalTreasuryShare
            ]
        ) as ReceivingAccount;

        token = await deployMockContract(deployer, Erc20Artifact.abi);
    });

    describe('Share calculation', async () => {
        it('It should calculate the split of profit between the artist & the dubplate treasury', async () => {
            const amount = BigNumber.from(100);
            await receivingAccount.calculateShare(amount).then(shares => {
                expect(shares._shareForArtist).to.eq(90)
                expect(shares._shareForTreasury).to.eq(10)
            })
        });

        it("Should calculate the share between 450 when the artist gets a 60% share and the treasury gets 40%", async () => {
            await receivingAccount.setTreasuryShare(40);

            const amount = oneEther.mul(450);
            const artistShare = oneEther.mul(270);
            const treasuryShare = oneEther.mul(180);

            await receivingAccount.calculateShare(amount).then(shares => {
                expect(shares._shareForArtist).to.eq(artistShare)
                expect(shares._shareForTreasury).to.eq(treasuryShare)
            })
        })
    })

    describe('Withdrawals', async () => {
        it("Should allow for ERC20 withdrawals", async () => {
            await token.mock.balanceOf.withArgs(receivingAccount.address).returns(oneEther.mul(450))

            const artistShare = oneEther.mul(405);
            const treasuryShare = oneEther.mul(45);

            await token.mock.transfer.withArgs(treasury.address, treasuryShare).returns(true)
            await token.mock.transfer.withArgs(artist.address, artistShare).returns(true)

            await receivingAccount.withdraw(token.address)
        })

        it("Should allow Ethereum withdrawals", async () => {
            const artistBalance = await artist.getBalance()
            const treasuryBalance = await treasury.getBalance()

            await receivingAccount.deposit({
                value: oneEther.mul(1000)
            })

            await receivingAccount.withdrawEthereum()

            await artist.getBalance().then(balance => {
                expect(balance).to.eq(artistBalance.add(oneEther.mul(900)))
            })

            await treasury.getBalance().then(balance => {
                expect(balance).to.eq(treasuryBalance.add(oneEther.mul(100)))
            })
        })
    });
});
