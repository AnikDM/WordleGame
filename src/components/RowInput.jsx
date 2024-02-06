import { useContext, useEffect, useRef } from "react";
import { inputContext } from "../context/inputContext";

const RowInput = ({len,setIsActive}) => {
  const {inp, setInp } = useContext(inputContext);
  const inputRef=useRef([]);
  useEffect(()=>{
    inputRef.current[0].focus();
  },[])
  
  function handleChange(e,index){
    const value=e.target.value;
    const newInp=[...inp];
    newInp[index]=value.toUpperCase().substring(value.length-1);
    // console.log(newInp)   
    if(value && index<len-1 && inputRef.current[index])
    {inputRef.current[index].blur();
      inputRef.current[++index].focus();}
    // else if(!value && index>0){
    // inputRef.current[index].blur();
    // inputRef.current[--index].focus();}
    
    if(index===len-1 && newInp[index]!='')
    {setIsActive(false)}
    else
    {setIsActive(true)}
    setInp(newInp)
    
  }
  function handleDlt(e,index){
    if(e.key==="Backspace"){
    const value=e.target.value;
    if(!value && index>0 ){
      inputRef.current[index].blur();
      inputRef.current[--index].focus();
    }
  }
  }
  return (
    <>  
        {inp.map((value,index)=>{
          return <input className='w-20 h-20 max-sm:w-16 max-sm:h-16 text-3xl max-sm:text-2xl border border-gray-800 rounded-md mx-1 text-center' key={index} ref={input=>inputRef.current[index]=input} onKeyDown={e=>handleDlt(e,index)} type="text" value={value}  onChange={(e)=>handleChange(e,index)}/>
        })}
    </>
  )
}

export default RowInput