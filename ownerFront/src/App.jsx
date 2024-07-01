import './App.css'
import { ethers, formatUnits } from "ethers";
import abi from "./contract/OwnershipToken.json"
import { useState, useRef } from "react";

export default function App() {
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

            if(walletAdress !== null){
              const balance1 = await provider.getBalance(walletAdress)
              const showBalance = formatUnits(balance1,"ether")
              setBalance(showBalance)
          }
      
          const contractAddres = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contractABI = abi.abi;
  
          const contract = new ethers.Contract(
              contractAddres,
              contractABI,
              signer
          )

          setState({provider,signer,contract});
          console.log("state iz wallet komp", state)

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

            <div>
              {walletAdress}
            </div>
            <div>
              {connected ? 
              
                <div>
                  Balance:{balance}
                </div>
                : " "
            }
            </div>
        </div>
    )
}

 
