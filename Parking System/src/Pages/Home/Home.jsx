import React from 'react';
import one from '../../Assests/one.png';
import './Home.css';
import { faArrowDown,faGripLinesVertical} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// <i class="fa-light faGripLinesVertical"></i>
const Home = () => {
  // const [data, setData] = useState([]);
  // const API = 'http://localhost/my-api/api.php?action=get_locations'
  const Jsondata = [
  {"id":1, 'location':"free"}, {"id":2, 'location':"free"}, 
  {'id':3, 'location':"occ"},  {'id':4, 'location':"free"},
  {'id':5, 'location':"free"}, {'id':6, 'location':"free"}, 
  {'id':7, 'location':"occ"},  {'id':8, 'location':"free"},
  {'id':9, 'location':"free"}, {'id':10, 'location':"free"}, 
  {'id':11, 'location':"occ"},  {'id':12, 'location':"free"},
  {'id':13, 'location':"free"}, {'id':14, 'location':"free"}, 
  {'id':15, 'location':"free"},  {'id':16, 'location':"free"},
  {'id':17, 'location':"occ"}, {'id':18, 'location':"occ"},      
  {'id':19, 'location':"free"},  {'id':20, 'location':"occ"},
  {'id':21, 'location':"free"}, {'id':22, 'location':"occ"}, 
  {'id':23, 'location':"free"}, 
    
]
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API);
  //       const jsonData = await response.json();
        const data =new Array(Jsondata.length + 1).fill(0)
        for(let i of Jsondata)
        {
          data[i['id']] = (i["location"])
        }
        console.log(data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  
  return (
    <div className="mainHome">
      <FontAwesomeIcon icon={faGripLinesVertical} className='arrow'/>
      <FontAwesomeIcon icon={faArrowDown} className='arrow-2 arrow'/>
      <div className="grid-container">
        {data.map((item, index ) => {
          if (item === 'occ') {
            return (
              <div key={index} className="grid-item occupied">
                <img src={one} alt="car image" className={index %2?"img-1":"img-2"} />
              </div>
            );
          } else if (item === 'free') {
            return (
              <div key={index} className="grid-item free">
                {index}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Home;