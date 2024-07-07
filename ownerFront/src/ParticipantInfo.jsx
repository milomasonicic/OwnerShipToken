import { useState, useEffect } from "react"
import { ethers } from "ethers"

import { Chart } from "react-google-charts";
import {useSpring, animated} from "@react-spring/web"

export default function ParticipantInfo({participant, own}){

    const ownNum = Number(own)
    const props = useSpring({ 
    from: {number: 0}, 
    number: ownNum, 
    delay: 200, 
    config:{duration: 1000}})

    return(
        <div className=" h-[100px] rounded-2xl mt-10 mb-5">
           <h2 className="">{participant}</h2>
           <h2>own {own}</h2>
           <h2> <animated.span>
            {props.number.to(n=> n.toFixed(0))}
            </animated.span>%</h2>

        </div>
    )
}