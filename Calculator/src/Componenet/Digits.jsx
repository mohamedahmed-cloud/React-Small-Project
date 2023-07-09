
const Digits = ({onDigits, Eqaul}) => {
    
    const createDigit = () =>
    {
        const digits = []
        for(let i = 1; i < 10; i++)
        {
            digits.push(
                <button key={i} onClick = {(e) => onDigits(`${i}`)}> {i} </button>
            )
        }
        return digits
    }
  return (
    <div className="container digits">
        {createDigit()}
        <button className="border-left"  onClick={(e) => onDigits("0")}>0</button>
        <button onClick={(e) => onDigits(".")}>.</button>
        <button className = 'border-right' onClick = {(e) => Eqaul()}>=</button>
    </div>
  )
}

export default Digits
