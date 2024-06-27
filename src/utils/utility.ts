import Web3, { Contract, utils, Web3ContractError } from "web3";
import { isAddress } from 'web3-validator';

declare global {
    interface Window {
        ethereum: any,
        web3: Web3
    }
}

let web3: Web3 = new Web3(Web3.givenProvider);
let contract: Contract<[]> | any = null;

const tokenABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function"
    }
];


export const isConnected = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            if(window.ethereum.isConnected()) {
                resolve(true);
            }else {
                reject(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

export const getAccount = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try{
            const isWalletConnected = await isConnected();
            if (isWalletConnected) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                web3 = new Web3(window.ethereum);
                if(accounts.length > 0) {
                    resolve(accounts[0]);
                } else {
                    reject("");
                }
            } else {
                reject("");
            }
        } catch (error) {
            reject("");
        }
    })
}
export const connect = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        // Checking if its already connected
        // const isWalletConnected = await isConnected();
        // if (isWalletConnected) {
        //     resolve(account);
        // }
        // Modern dapp browsers
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                resolve(accounts[0]);
            } catch (error) {
                // User denied account access...
                reject("User denied access");
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            const account = await web3.eth.getAccounts();
            resolve(account[0]);
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected.');
            reject("Non-Ethereum browser detected");
        }
    })
    
}

export const getContract = async (address: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            contract = new web3.eth.Contract(tokenABI, address);
            resolve(contract);
        } catch (error) {
            reject(error);
        }
    })
}

export const getBalance = async (address: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            contract = new web3.eth.Contract(tokenABI, address);
            const walletAddress = await getAccount();
            const balance = await contract.methods.balanceOf(walletAddress).call();
            resolve(utils.fromWei(balance, 'ether'));
        } catch (error) {
            reject(error);
        }
    })
}

export const transfer = async (address: string, receipientAddress: string, amount: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            contract = new web3.eth.Contract(tokenABI, address);
            const [account] = await web3.eth.getAccounts();
            const receipt = await contract.methods.transfer(receipientAddress, utils.toWei(amount, 'ether')).send({from: account});
            resolve(receipt);
        } catch (error: any) {
            const mesasge = error.toJSON().mesasge || error;
            reject(mesasge);
        }
    })
}

export const isValidContractAddress = async (address: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const code = await web3.eth.getCode(address);
            resolve(code !== '0x' && code !== '0x0');
        } catch (error) {
            resolve(false);
        }
    })
}

export const isValidAddress = (address: string) => {
    try {
        const valid = isAddress(address);
        return (valid);
    } catch (error) {
        return (false);
    }
}