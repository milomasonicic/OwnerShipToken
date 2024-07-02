import { ethers, formatUnits, parseEther } from "ethers";
import { useState } from "react";


export default function Deposit({state}){

    const [deposit, setDeposite] = useState("")
    const [ownership, setOwnership] = useState(" ")
   
    async function updateBalanceOwnership(){
        try {

            const {contract} = state
            const balance = await contract.balanceOf(walletAddress)

            setOwnership(ownership.toString())

        } catch(error){
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
            <div>
              Ownesthip  {ownership}
            </div>
            <input type="text"
            placeholder="Enter amount"
            value={deposit}
            onChange = {(e) => setDeposite(e.target.value)}
            
            />
            <button onClick={handleDeposit}> Deposit</button>
        </div>
    )
}