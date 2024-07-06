export default function Burn(){
    return(

        <div className="w-[80%] mx-auto mb-10">
              <div
            className="w-[90%] 
            mx-auto 
            bg-gradient-to-r from-purple-400  via-indigo-200 to-purple-400
            h-[320px]
            flex items-center 
            justify-center
            rounded-2xl
            "
            >
              <input type="text"
              placeholder="Enter amount"
              className="p-4 mr-2 ml-2 w-[240px]"
             
              />
              <button 
             class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-7 py-4 text-center me-2 mb-2"
            > Burn</button>

            </div>

        </div>
    )
}