import { useState, useEffect } from "react"
import { ethers } from "ethers"
import {useSpring, animated} from "@react-spring/web"
import { Tooltip } from 'react-tooltip'

export default function ParticipantInfo({participant, own}){

    const name = "Name Surname"
    const ownNum = Number(own)
    const props = useSpring({ 
    from: {number: 0}, 
    number: ownNum, 
    delay: 200, 
    config:{duration: 1000}})

    const getColor = (num) => {

        if(num >= 90) return "font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500"
        if(num >= 60) return "font-extrabold bg-gradient-to-r from-emerald-500 to-lime-500"
        if(num >= 30) return "font-extrabold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200"
        return "bg-gradient-to-r from-teal-200 to-lime-200 font-extrabold "
    }

    return(
        <div className="w-[100%] mx-auto flex flex-col  md:flex-row justify-between  mt-4 mb-5">
           <p className={`text-sm vreak-words md:text-lg bg-clip-text text-transparent ${getColor(own)}`}
             
           data-tooltip-id="my-tooltip" data-tooltip-content={participant}
           >{participant} 
        
           </p>


            <Tooltip id="my-tooltip" />
           <h2 className=
           {`text-sm md:text-lg bg-clip-text text-transparent ${getColor(own)}`}
           > <animated.span>
            {props.number.to(n=> n.toFixed(0))}
            </animated.span>%</h2>

        </div>
    )
}