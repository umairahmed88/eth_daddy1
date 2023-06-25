// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
	return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
	const [deployer] = await hre.ethers.getSigners();
	const NAME = "ETH Daddy";
	const SYMBOL = "ETHD";

	const ETHDaddy = await hre.ethers.getContractFactory("ETHDaddy");
	const ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL);
	await ethDaddy.deployed();

	console.log(`Deployed Domain Contract at ${ethDaddy.address}\n`);

	const names = [
		"umair.eth",
		"ahmed.eth",
		"honey.eth",
		"mom.eth",
		"dad.eth",
		"bro.eth",
	];

	const costs = [
		tokens(29),
		tokens(28),
		tokens(22),
		tokens(25),
		tokens(30),
		tokens(10),
	];

	for (var i = 0; i < 6; i++) {
		const transaction = await ethDaddy
			.connect(deployer)
			.list(names[i], costs[i]);
		await transaction.wait();

		console.log(`Listed domains ${i + 1}: ${names[i]}`);
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
