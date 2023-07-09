
const Symbols = ({onDigits, onDelete}) => {
  return (
    <div className = "container symbols">
        <button onClick = {(e) => onDigits("/")}>/</button>
        <button onClick = {(e) => onDigits("*")}>*</button>
        <button onClick = {(e) => onDigits("-")}>-</button>
        <button onClick = {(e) => onDigits("+")}>+</button>
        <button onClick={(e) => onDelete()}>DEL</button>
    </div>
  )
}

export default Symbols
