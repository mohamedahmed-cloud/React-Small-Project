import Header from "./Componenet/Header";
import Digits from "./Componenet/Digits";
import Symbols from "./Componenet/Symbols";
import Display from "./Componenet/Display";
import { useState } from "react";


 // to use react toastify
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("");
  const ops = ["/", "*", "+", "-", "DEL"];
  const notify1 = () => toast("No operator at start of operation.");
  const notify2 = () => toast("No consecutive operators")
  const notify3 = () => toast("NO consecutive .")
  const updateCalc = value =>
  {
    if (ops.includes(value) && calc ==="")
      {
        {notify1()}
        return;    
      }else if(ops.includes(value) && ops.includes(calc.slice(-1)))
      { 
        {notify2()}
        return;
      }
      else if (value === "." && calc.slice(-1) === ".")
      {
        {notify3()}
        return;
      }
      if (calc !== "0")
      {
        setCalc (calc + value)
      } else 
      {
        setCalc(value)
      }

      if (!ops.includes(value) && value !== "." && calc !== "0")
      {
        setResult(eval(calc + value).toString())
      }
  }
  const calcEqual = ()=>
  {
    setCalc(result);
    setResult("");
  }
  // this to delete all  the calc
  const deleteFunc= () =>
  {
    setCalc("0")
    setResult(0);
  }
  // delete one by one.
const deleteOne = () =>
{
  let value = "" ;
  if (calc.length)
  {
    value = calc.slice(0,-1)
    setCalc(value)
    
    if (!ops.includes(value.slice(-1)))
      setResult (eval(value))
    else 
      setResult(eval(value.slice(0, -1)))
  }
  else
    setResult(0)
}

  return (
    <div className="App">
   
       <ToastContainer /> 
       <Header/>
       <Display onDisplay= {calc} result= {result}/>
       <Symbols onDigits = {updateCalc} onDelete = {deleteOne}/>
       <Digits  onDigits = {updateCalc} Eqaul = {calcEqual}/>
       <div className ="alert"></div>
    </div>
  );  
}

export default App;
