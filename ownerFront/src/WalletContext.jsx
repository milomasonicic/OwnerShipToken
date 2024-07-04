import React, {createContext, useContext, useEffect, useState, useRef, Children} from "react";
import { ethers } from "ethers";
import abi from "./contract/OwnershipToken.json"

const WalletContext = createContext()

export const WalletProvider = ({ children}) =>{

    const [connected, setConnected] = useState(false)
    const [walletAddress, setWalletAdress] = useState("")
    const [balance, setBalance] = useState("")

    const providerRef = useRef(null)
    const signerRef = useRef(null)
    const contractRef = useRef(null)

    useEffect(() => {

        const initializedWallet = async () => {

            const savedWalletAdress = localStorage.getItem("walletAdress")
            const savedConnection = localStorage.getItem("connected") === true

            if(savedConnection && savedWalletAdress) {

                try{
                    const provider = new ethers.BrowserProvider(window.ethereum)
                    const signer = await provider.getSigner()
        
                    const walletAddress = await signer.getAddress()
                    const balance = await provider.getBalance(walletAddress)
                    const showBalance = ethers.formatUnits(balance, "ether")

                    const contractAddres = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                    const contractABI = abi.abi

                    const contract = new ethers.Contract(
                        contractAddres,
                        contractABI,
                        signer
                    )

                    providerRef.current = provider
                    signerRef.current = signer
                    contractRef.current = contract

                    setConnected(true)
                    setWalletAdress(walletAddress)
                    setBalance(showBalance)
                    console.log(contract)
                
                }catch(error){
                    console.error(error)
                }
            }

        }
        initializedWallet()
    }, [])

    const connectWallet = async() => {

        if(!connected) {

            try{

                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
    
                const walletAddress = await signer.getAddress()
                const balance = await provider.getBalance(walletAddress)
                const showBalance = ethers.formatUnits(balance, "ether")

                const contractAddres = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contractABI = abi.abi

                const contract = new ethers.Contract(
                    contractAddres,
                    contractABI,
                    signer
                )

                providerRef.current = provider
                signerRef.current = signer
                contractRef.current = contract 

                setConnected(true)
                setWalletAdress(walletAddress)
                
                setBalance(showBalance)
                console.log(showBalance)

                localStorage.setItem("connected", "true")
                localStorage.setItem("walletAddress", walletAddress)
            } catch {
                console.error(error)
            } 

        } else {

            providerRef.current = null
            signerRef.current = null
            contractRef.current = null 
            
            localStorage.removeItem("connected", "true")
            localStorage.removeItem("walletAddress", walletAddress)
        }
    }


    return (

        <WalletContext.Provider
            value={{
                connected, 
                walletAddress,
                balance, 
                provider: providerRef.current,
                signer: signerRef.current,
                contract: contractRef.current,
                connectWallet
            }}
        >
            {children}

        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)