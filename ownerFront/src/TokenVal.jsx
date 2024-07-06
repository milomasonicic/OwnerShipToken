export default function TokenValue({value}){

    return(
        <div className="mx-auto">
            <div className="mt-5 flex items-center mx-auto w-[60%] h-[70px] border-4 bg-neutral-600 border-gray-500 border-4 rounded-2xl">
                <h2 className="font-extrabold font-mono text-yellow-400 pl-4">OWN = {value} ETH</h2>
            </div>
        </div>
    )
}