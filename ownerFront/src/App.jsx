import './App.css'
import { ethers, formatUnits } from "ethers";
import abi from "./contract/OwnershipToken.json"
import { useState, useRef, useEffect } from "react";
import Deposit from './Depostit';

export default function App() {
  const [connected, setConnected] = useState(false)
    const [walletAddress, setWalletAdress] = useState("")
    const [balance, setBalance] = useState(" ")

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    })

    const [totalDeposit, setTotalDeposit] = useState("")
    const [userDeposit, setUserDeposit] = useState("")
    const [ownership, setOwnership] = useState("")
    const [deposit, setDeposite] = useState("")

    useEffect(() => {

      if(state.contract && walletAddress) {
        updateContractData()
      }

    }, [state.contract, walletAddress])
   

    async function connectWallet(){


        if(!connected){

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            const walletAddress = await signer.getAddress()
            setConnected(true)
            setWalletAdress(walletAddress)

            if(walletAddress !== null){
              const balance1 = await provider.getBalance(walletAddress)
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
       

        } else{
            setConnected(false)
            setWalletAdress(" ")
        }
    }

    //data

   
    async function updateBalanceOwnership(){
        try {

            const {contract} = state
            const balance = await contract.balanceOf(walletAddress)

            setOwnership(ownership.toString())

        } catch(error){
            console.error(error)
        }
    }

    //update Contract Data

    async function updateContractData() {

      try{

        const {contract} = state
        const totalDeposit = await contract.totalDeposit()
        const userDeposit = await contract.deposits(walletAddress)
        const ownership = await contract.owwnerShip(walletAddress)

        console.log(totalDeposit)
        console.log(ownership)
        console.log(userDeposit)
        setTotalDeposit(formatUnits(totalDeposit, "ether"))
        setUserDeposit(formatUnits(userDeposit, "ether"))
        setOwnership(ownership.toString())

      }catch(error){
        console.error(error)
      }
    }

    async function handleDeposit() {

        try{

            const {contract} = state
            const tx = await contract.deposit({
                value: ethers.parseEther(deposit)
            })

            await tx.wait();
            alert("good")

            await updateBalanceOwnership()
        }catch(error){

            console.error("Error depositing:", error);

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
              {walletAddress}
            </div>
            <div>
              {connected ? 
              
                <div>
                  Balance:{balance}
                </div>
                : " "
            }
            </div>

            <h4>Info</h4>
            <p>Balance {balance} ETH</p>
            <p>Total Deposit: {totalDeposit} ETH</p>
            <p>Your Deposit: {userDeposit} ETH</p>
            <p>Ownership: {ownership}%</p>

          
            <input type="text"
            placeholder="Enter amount"
            value={deposit}
            onChange = {(e) => setDeposite(e.target.value)}
            
            />
            <button onClick={handleDeposit}> Deposit</button>
        </div>

    )
}

/*


 <!--div>
              {connected ? 
              <Deposit state={state}></Deposit>
              :
              ""  
            }
            </div*-->*/
