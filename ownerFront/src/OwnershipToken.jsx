import { useEffect, useState } from "react"
import TokenValue from "./TokenVal"
import ParticipantInfo from "./ParticipantInfo"


export default function OwnershipToken({state}){

    
    const {contract} = state
    console.log(contract)
    console.log("owntokenComp", contract)
    const [totalTokens, setTotalTokens] = useState("0")
    const [participants, setParticipants] = useState([])
    const [tokenValue, setTokenValue] = useState(5)
    const [toglePartc, setPartc] = useState(false)
        //gpt
    const [ownerships, setOwnerships] = useState([]);




    const fetchTokenNumber = async() => {

        try{

            const totalSupply = await contract.totalSupply()
            setTotalTokens(totalSupply.toString())

            const participants = await contract.getParticipants()
            setParticipants(participants)
            console.log("prt", participants)

      
      const ownershipPromises = participants.map(async (participant) => {
            const ownership = await contract.ownership(participant)

            return {
            participant,
            ownership: ownership.toString() 
            }
        })

      const ownershipResults = await Promise.all(ownershipPromises)
      setOwnerships(ownershipResults)

        }catch (error) {
            console.error(error)
        }
    } 

    useEffect(() => {
        if(contract){
            fetchTokenNumber()
        }
     }, [contract])

     async function toogleComponenet(){
        setPartc(toglePartc => !toglePartc)
      }

    return(
        <div className="p-6 w-[80%] mx-auto">
            <div>
                <h1 className="mt-4 mb-4 text-yellow-400 font-mono font-extrabold text-xl md:text-4xl text-center"> Participants Infos </h1>
                
                <TokenValue value={tokenValue} totalTokens={totalTokens}></TokenValue>
            </div>

            <div>
            <button 
            className="text-left h-[70px] w-[100%] mt-4 mb-5"
            
            onClick={toogleComponenet}> 
            {toglePartc === true ? 
                <p className="pl-6 text-left mt-12  border-b-4 border-yellow-400  text-yellow-400 font-mono font-extrabold">  Close </p>
                
                :
                
                <p className="pl-6 mt-12 border-b-4 border-b-4 border-yellow-400  text-yellow-400 font-mono font-extrabold"> See Participants </p>
            }
            
            </button>
            {toglePartc === true ? 

            (
                <div className="w-[100%] mx-auto">
                        
                            <p >   
             
                            {ownerships.map(({participant, ownership}) =>
                                
                                (
                                    <div key={participant}> 
                                    <ParticipantInfo participant={participant} own={ownership}></ParticipantInfo>
                                    </div> 
                                ))}
                            
                            </p>
                    

                </div>
            
        )
        : 
        
        ""} 

            </div>

        
          <br></br>
          
        </div>
    )
}
/*
     */