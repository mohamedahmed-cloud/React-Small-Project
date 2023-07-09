
const Display = ({onDisplay, result}) => {
  return (
    <div className = "container display parent-up">
      {result? <span> ({result}) </span> : "" } 
      &nbsp;
      {(onDisplay || 0)}
    </div>
  )
}

export default Display
