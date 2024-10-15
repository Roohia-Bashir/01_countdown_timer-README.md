"use client"
import {useEffect, useRef, useState} from 'react'
import { Input } from './input'
import { Button } from './button'

function CountdownTimer() {

//-----------------------------------Variables-------------------------------------------

let [duration , SetDuration] = useState<number | string>()
let [timeLeft , SetTimeLeft] = useState(0)
let [isActive , SetIsActive] = useState<boolean>(false)
let timer = useRef<any>(null)
//----------------------------------Timeformat-------------------------------------------

let timeformat = (time: number): string=>{
  let minutes = Math.floor(time/60);
  let seconds = time % 60; 
  return`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}`
}

//-----------------------------Set Buttons------------------------------------------------

let setBtn = () => {
  if(typeof duration == "number" && duration > 0) {
    SetTimeLeft(timeLeft = duration)
  }
}

//---------------------------------Pause Button------------------------------------------------

let pauseBtn = ()=>{
    SetIsActive(false)
}


//---------------------------------Reset Button------------------------------------------------

  let resetBtn = ()=>{
    SetIsActive(false);
    SetTimeLeft(0);
    SetDuration("");
  }

//-----------------------------Start Button------------------------------------------------

let startBtn = ()=>{
  SetIsActive(true)
}
useEffect(()=>{
  if(isActive == true){
    timer.current = setInterval(()=>{
      if(timeLeft > 0 ){
      SetTimeLeft(timeLeft = timeLeft - 1 )
      }else{
        clearInterval(timer.current!)
      }
    }, 1000)
  }else{
    clearInterval(timer.current!)
  }
}, [isActive])

return (
    <div className='h-[400px] w-[600px] bg-[#ededed] rounded-[16px] text-[black] border-[2px] border-[gray] flex justify-center items-center flex-col'>  

        <h1 className='text-[30px] font-[600]'>Countdown Timer</h1>

        <div className='flex gap-[16px] mt-[10px] '>
        <Input className='w-[300px] text-[16px]' placeholder="Enter duration in seconds" type='number' onChange={(e)=>{SetDuration(Number(e.target.value))}} value={duration}/>
        <Button onClick={()=>{setBtn()}}>Set</Button>
        </div>

        <div className='text-[70px] font-[600]'>{timeformat(timeLeft)}</div>

        <div className='flex gap-[30px]'>
        <Button onClick={()=>{startBtn()}}>Start</Button>
        <Button onClick={()=>{pauseBtn()}}>Pause</Button>
        <Button onClick={()=>{resetBtn()}}>Reset</Button>
        </div>

    </div>
  )
}

export default CountdownTimer