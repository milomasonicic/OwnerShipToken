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

    return(
        <div className="w-[100%] mx-auto border-b-4 border-yellow-400  flex justify-between  mt-4 mb-5">
           <h2 className="text-yellow-400 font-mono text-lg"
             
           data-tooltip-id="my-tooltip" data-tooltip-content={name}
           >{participant}</h2>


<Tooltip id="my-tooltip" />
           <h2 className="text-lg text-yellow-200"> <animated.span>
            {props.number.to(n=> n.toFixed(0))}
            </animated.span>%</h2>

        </div>
    )
}