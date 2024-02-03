import { useEffect, useRef, useState } from "react";
import "./App.css";
import RowInput from "./components/RowInput";
import { inputContext } from "./context/inputContext";
import Alphabets from "./components/Alphabets";
import Button from "./components/Button";
import { generate } from "random-words";
function App() {
  const word=useRef(generate({ minLength: 3, maxLength: 7 }))
  const len = word.current.length;
  console.log(word.current)
  const inputRef=useRef([]);
  const [attempts,setAttempts]=useState(6);
  const [inp, setInp] = useState(new Array(len).fill(""));
  const [isActive,setIsActive]=useState(true)
  let incAlbhabets=[];
  let incAlbhabets2=[];
  console.log(inputRef);
  function handleClick() {
    console.log(inp.join(''))
    
    if(inp.join('')===word.current.toUpperCase())
      alert('voila')
    else if(attempts===0)
    {
        alert('Game Over')
    }
    else
      {
        incAlbhabets=inp.filter(item=> {if(!word.current.toUpperCase().includes(item))
        return item})
        incAlbhabets2=inp.filter(item=> word.current.toUpperCase().includes(item))
        console.log(incAlbhabets)
        console.log(incAlbhabets2)
        setInp((new Array(len).fill("")))
        setAttempts(attempts-1);
        incAlbhabets2.forEach(item=>{
          inputRef.current[item.toLowerCase()].classList.add('bg-green-600');
        })
        incAlbhabets.forEach(item=>{
          inputRef.current[item.toLowerCase()].classList.add('bg-red-600');
        })
      }
  }
  return (
    <inputContext.Provider value={{ inp, setInp }}>
      <div className="app">
        <div className=' bg-yellow-400 w-full h-28 shadow-md flex items-center justify-center'>
        <h1 className="text-5xl title">Wordle Game</h1>
        </div>
        <div className="my-5 input">
          <RowInput len={len} setIsActive={setIsActive}/>
        </div>
        <div className="">
          <Button handleClick={handleClick} isActive={isActive}/>
          <Alphabets inputRef={inputRef}/>
          <div className='mt-5'>
            <p className='font-bold text-xl'>Attempts: {attempts} left</p>
          </div>
        </div>
      </div>
    </inputContext.Provider>
  );
}

export default App;
