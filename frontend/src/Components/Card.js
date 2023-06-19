import React,{useState} from 'react'
import "../Styles/card.css"
import { Link } from 'react-router-dom';
import Logo from '../assets/drawing.jpg';
import Details from './Details';
//import Details from './Details';
function Card({data}) {
  const [showDynamicComponent, setShowDynamicComponent] = useState(false);
 // const [itemdata,setItemData]=useState([]);
  const handleClick = (item) => {
    setShowDynamicComponent(true);
  //  setItemData(item);
  //  console.log(item);
  };

  return (
    <> 
    <div className="tiffins-card">
                   <div key={data.id} className="itm-card">

                    <img className='tiffin-img-card' description="add to cart" src={data.image} alt="" />
                    <p>{data.name}</p>
                     <div className='desc-card'>
                        <p>Price:₹{data.price}</p>
                    <button className='btn-card'  ><Link to={`/products/details/${data._id}`}>Details </Link></button>

                    </div>
                    
     </div>
     </div>
     {/* {showDynamicComponent && <Details />} */}
     </>
  )
}

export default Card