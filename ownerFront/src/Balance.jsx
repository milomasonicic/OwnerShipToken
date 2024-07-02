export default function Balance({blnc}){

    return(
        <div className="
        w-[90%]
        mx-auto
        p-4
     
        
        rounded-md mt-2 h-[100px] bg-neutral-50 shadow-md ">
            <h4>Balance:</h4>
            <p class="break-words ...">    {blnc}</p>
        </div>
    )
}