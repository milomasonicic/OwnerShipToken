import { ethers, formatUnits } from "ethers";
import abi from "./contract/OwnershipToken.json"
import { useState, useRef, useEffect } from "react";
import Deposit from './Depostit';
import Adress from "./WalletAdress";
import Balance from "./Balance";

import "./index.css"

export default function App() {

    const [connected, setConnected] = useState(false)
    const [walletAddress, setWalletAdress] = useState("")
    const [balance, setBalance] = useState("")

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
        <div className="bg-stone-50 h-[1400px]">

          <div className=" max-w-[90%] mx-auto bg-neutral-50  ">
            <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
            >

             {connected ? "Disconnect MetaMask": "Connect with MetaMask"}   
            </button>
            <div>

              
              <Adress adrs={walletAddress}></Adress>
            
            </div>
            <div>
              {connected ? 
              <div>
                <Balance blnc={balance}></Balance>
              </div>  
              :
              <Balance></Balance>
            }
            
            </div>
         
            <div
            className="w-[90%] 
            mx-auto 
            bg-gradient-to-r from-indigo-50 via-stone-50 via-neutral-50 via-stone-50 to-indigo-50
            h-[120px]
            flex items-center 
            justify-center
            rounded-b-2xl
            "
            >
              <input type="text"
              placeholder="Enter amount"
              value={deposit}
              onChange = {(e) => setDeposite(e.target.value)}
              
              />
              <button 
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleDeposit}> Deposit</button>

            </div>

            <p>kraj diva</p>
            </div>

            <h4>Info</h4>
            <p>Balance {balance} ETH</p>
            <p>Total Deposit: {totalDeposit} ETH</p>
            <p>Your Deposit: {userDeposit} ETH</p>
            <p>Ownership: {ownership}%</p>



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
