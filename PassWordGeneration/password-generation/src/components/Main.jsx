import React,{useState} from 'react'
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
const copy = <FontAwesomeIcon icon={faClipboard} />
const see = <FontAwesomeIcon icon={faEye} className = "icon"/>
const notSee = <FontAwesomeIcon icon={faEyeSlash}  className='icon'/>

// hooks
const [show, setShow] = useState(false)
const [text, setText] = useState("")
const [lenght, setLenght] = useState(0)
const [object, setOjbect] = useState({
        upperCase:0,
        lowerCase:0,
        number:0,
        symbol:0
    });
const [value, setValue] = useState("")
// object

const mapObject = {
    0:"upperCase",
    1:"lowerCase",
    2:"number",
    3:"symbol"
}
const stringFromNumber = {
    upperCase: [65,26],
    lowerCase: [97,26],
    number: [48,9],
    symbol:{33:14, 58:6, 91:5, 123: 3}
}
const generateSymbols = [[33,14], [58,6], [91,5], [123, 3]]
// function
const handlePassword = () => {
    setShow(!show)
}
const clipboard = () => {
    // console.log(text);
    navigator.clipboard.writeText(text)
}
const generateSymbolsFunction = (i) => {
    const RandomIndex = Math.floor(Math.random() * 4)
    const toGenerate = generateSymbols[RandomIndex][0] + Math.floor(Math.random() * generateSymbols[RandomIndex][1])
    return String.fromCharCode(toGenerate) 
}
const generateOtherFunction = (i) => {
    const toGenerate = stringFromNumber[i][0] + Math.floor(Math.random() * stringFromNumber[i][1])
    return String.fromCharCode(toGenerate)
}
const notGenerateOne = () =>  toast("Please checked at least one to Generate")
const notGenerateTwo = () => toast("Password lenght Must be Greater Than Checked Number")
const generateSuccess = () => toast("Password Suceess Generated")
const copyPassword = () => toast("Password Copied")

let passWord = ""
const GeneratePassword = () => {
    let count = 0
    let ourLenght = lenght
    for (let i in object) object[i]?count += 1:count +=0
    if (count === 0){
        // console.log("Please provide a sybmols to add it to password");
        return "Failed1"
    }
    if (ourLenght < count)
    {
        return "Failed2"
    }
    // console.log(count,ourLenght);
    while (ourLenght > count)
    {
        let randomIndex = parseInt(Math.floor(Math.random() * 4))
        // console.log(randomIndex);
        let randomOjbect = mapObject[randomIndex]
        // console.log(randomOjbect);

        let randomI = object[randomOjbect]
        while (!randomI){
            randomIndex = Math.floor(Math.random() * 4)
            randomOjbect = mapObject[randomIndex]
            // console.log(randomOjbect);
            randomI = object[randomOjbect]
        }
        // console.log(randomI);

        if (randomOjbect === 'symbol')
        {
            
            passWord += generateSymbolsFunction((randomOjbect))
        }else {
           passWord += generateOtherFunction((randomOjbect))
        }
        ourLenght -= 1  

    }
    if (ourLenght == count)
    {
        for(let i in object)
        {
            if (object[i] && i === "symbol")
            {
                passWord += generateSymbolsFunction(i)
            }
            else if (object[i])
            {
                passWord += generateOtherFunction(i)
            }
        }
    }
    
    setValue(passWord)
    setText(passWord)
    return "success"
    

}








  return (
    <div class = "parent">
        <div className="inner-container">
  
        <p class="header">Password Generation</p>
        <div className="input-group">
            <input type={show ? "text" :"password"} value={value}  className = 'input-control'  onInput={(e) => {
                setText(e.target.value)
            }}/>
            <div className="icon" onClick = {() => {clipboard();copyPassword()}}>
                {copy}
            </div>
            <div className = "handlePassword" onClick ={() => handlePassword(text)}>
                { show? see : notSee}
            </div>
        </div>

        <div className = "container">
            <div>
                <label htmlFor="number" >Password Lenght</label>
                <input type="number" id = "number" onChange={(e) => setLenght((e.target.value))} />
            </div>
            <div>
                <label htmlFor="uppercase"  >Add Uppercase Letters</label>
                <input type="checkbox" name="upper" id="uppercase"  onClick={() => setOjbect({...object,upperCase:!object.upperCase})}/>
            </div>
            <div>
                <label htmlFor="lowercase" >Add Lowercase Letters</label>
                <input type="checkbox" name="lower" id="lowercase" onClick={() => setOjbect({...object,lowerCase:!object.lowerCase})}/>
            </div>
            <div>
                <label htmlFor="includeNumber" >Include Numbers</label>
                <input type="checkbox" name='includeNumber' id = "includeNumber"  onClick={() => setOjbect({...object,number:!object.number})}/>

            </div>
            <div>
                <label htmlFor="symbols">Include Symbols</label>
                <input type="checkbox"  name = "symbols" id = "symbols" onClick={() => setOjbect({...object,symbol:!object.symbol})}/>
            </div>
        </div>
        <div className="generate">
            <button onClick={() =>{ 
                const compare = GeneratePassword()
                if (compare === "Failed1")
                    notGenerateOne()
                else if (compare === "Failed2")
                    notGenerateTwo()
                else if (compare === "success")
                    generateSuccess()

                }}>Generate</button>
                <ToastContainer />
        </div>
                  
        </div>
    </div>
  )
}

export default Main
