import { ethers, formatUnits } from "ethers";
import abi from "./contract/OwnershipToken.json"
import { useState, useRef, useEffect } from "react";
import Deposit from './Depostit';
import Adress from "./WalletAdress";
import Balance from "./Balance";
import Ownership from "./Ownership";
import TotalDep from "./TotalDepo";
import UserDep from "./UserDepo";

import "./index.css"
import { useWallet } from "./WalletContext";

export default function App() {
  const {connected, initializedWallet,  walletAddress, balance, connectWallet} = useWallet()

  return(
    
       <div className=" max-w-[80%] mx-auto bg-neutral-50  ">
            <div className="w-[90%] mx-auto p-4 rounded-md mt-10 h-[100px]">
             
              <button type="button"    onClick={connectWallet} class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
           
              {connected ? "Disconnect MetaMask": "Connect with MetaMask"}  
              </button>

            </div>
    </div>
  )
}

 