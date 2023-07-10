import { useState } from "react";
import dummyList from "./DummyList"
const Search = () => {
    const [search, setSearch] = useState("")
    const [currValue, setCurrValue] = useState("")



    const FilterSearch = (value) => {
        setCurrValue(value)
        const matchFilter = dummyList.filter(ele => {
            if (value == "") return ele
            else
                var allContent = `${ele.message1}${ele.name}${ele.message3}${ele.description}${ele.message4}${ele.title}${ele.message5}${ele.job}`
            console.log(allContent);
            if(allContent && allContent.toLowerCase().includes(value.toLowerCase())){
                return ele
                
            }
        })
        const finalResult = matchFilter.map(ele => {
            return (
            <div>
                <h2>{ele.message1} {ele.name} 
                    {ele.message3} {ele.description} {ele.message4} {ele.title}
                    {ele.message5} {ele.job}
                </h2>
            </div>
        )})
        setSearch(finalResult)

    }

    return (
        <div class = 'parent'>
            
            <input type="search" onChange={(e) => FilterSearch(e.target.value)}/>
            {!currValue ?
                dummyList.map(ele => {
                    return (
                    <div>
                        <h2 key = {ele.id}>{ele.message1} {ele.name}  
                            {ele.message3} {ele.description} {ele.message4} {ele.title}
                            {ele.message5} {ele.job}
                        </h2>
                    </div>)})
                
          : search }
            

        </div>
    )   
}
export default Search