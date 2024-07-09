import {useState} from 'react'

export default function TokenValue({value, totalTokens}){
    
    const [toggle, setToggle] = useState(false)
   
    const ETH = totalTokens * 5

    const handleToggle = () => {
        setToggle((prevToggle) => !prevToggle)
    }

    return(
        <div className="mx-auto">
            <div className="mt-5 flex flex-col  mx-auto w-[100%] h-[120px] border-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-gray-500 border-4 rounded-2xl">

                    <h2 className="font-extrabold font-mono text-yellow-400 p-4 text-center">
                        {toggle? `${totalTokens} OWN`  : `${ETH} ETH`}

                    </h2>  
                    <div className='mx-auto'>
                        <button 
                        
                        class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleToggle}
                        >{toggle? "OWN" : "ETH"}
                        
                        </button>
                    </div>
            </div>
        </div>
    )
}