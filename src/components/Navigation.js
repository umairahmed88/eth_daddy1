import { ethers } from "ethers";
import logo from "../assets/logo.svg";

const Navigation = ({ account, setAccount }) => {
	const connectHnadler = async () => {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const account = ethers.utils.getAddress(accounts[0]);
		setAccount(account);
	};

	return (
		<nav>
			<div className='nav__brand'>
				<img alt='logo' src={logo} />
				<h1>ETH Daddy</h1>
				<ul className='nav__links'>
					<li>
						<a href='/'>Domain Names</a>
					</li>
					<li>
						<a href='/'>Website & Hosting</a>
					</li>
					<li>
						<a href='/'>Commerce</a>
					</li>
					<li>
						<a href='/'>Email & Marketing</a>
					</li>
				</ul>
			</div>
			{account ? (
				<button type='button' className='nav__connect'>
					{account.slice(0, 6) + "..." + account.slice(38, 42)}
				</button>
			) : (
				<button type='button' className='nav__connect' onClick={connectHnadler}>
					Connect
				</button>
			)}{" "}
		</nav>
	);
};

export default Navigation;
