import { ethers, formatUnits } from "ethers";
import abi from "./contract/OwnershipToken.json"
import { useState, useRef } from "react";

export default function Wallet(){

    const [connected, setConnected] = useState(false)
    const [walletAdress, setWalletAdress] = useState("")
    const [balance, setBalance] = useState(" ")

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    })

    async function connectWallet(){


        if(!connected){

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            const walletAdress = await signer.getAddress()
            setConnected(true)
            setWalletAdress(walletAdress)

        } else{
            setConnected(false)
            setWalletAdress(" ")
        }
    }

    return(
        <div>
            <button 
            onClick={connectWallet}

            >

             {connected ? "Disconnect MetaMask": "Connect with MetaMask"}   
            </button>
        </div>
    )

}