export default function Adress({adrs}){

    return(
        <div className="
        md:w-[90%]
        w-[100%]
        mx-auto
        p-4
        rounded-md mt-2 h-[100px] bg-neutral-50 shadow-md ">
            <h4>Wallet:</h4>
            <p class="break-words ...">    {adrs}</p>
        </div>
    )
}