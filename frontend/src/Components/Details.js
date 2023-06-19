
import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import Logo from "../assets/drawing.png";
import '../Styles/Details.css';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState(false);
  const name = localStorage.getItem('name');
  const gmail = localStorage.getItem('gmail');

  useEffect(() => {
    const fetchItem = async (id) => {
      try {
        const response = await fetch('/api/v1//main/getproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setItem(data);
        setErr(data && data.length === 0);
      } catch (error) {
        console.error(error);
        setErr(true);
      }
    };

    fetchItem(id);
  }, [id]);

  return (
    <div>
      {!err && item && (
        <div>
          {Object.keys(item).map((category) => (
            <div key={category}>
              <div className="grid-card">
                {item[category].map((itemData) => (
                  <div className='full-details'>
                    <img
                      className='details-img left-details'
                      src={itemData.image}
                      alt={itemData.name}
                    />
                    <div className='right-details'>
                      <div className='name-owner'>Owner:{name}</div>
                      <div className='name-detail'>IitemName:{itemData.name}</div>
                      <div className='desc-detail'>Reason For Selling:{itemData.reason}</div>
                      <div className='price-detail'>
                        <span>Price: ₹</span> {itemData.price}
                      </div>
                      <div className='phonenumber-detail'>Contact Number:{itemData.number}</div>
                      <div className='email-detail'>Gmail:{gmail}</div>
                      <div className='go-back-detail'>Go Back</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;


// import React, { useState, useEffect } from 'react';
// import Logo from "../assets/drawing.png";
// import '../Styles/Details.css';
// import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
// function Header() {
//   return (
//     <header className="header">
//       <div className="header-title">Your Items</div>
//       <div className="header-links">
//         <Link to="/">Main Page</Link>
//         <button onClick={() => window.location.reload()}>Regenerate</button>
//       </div>
//     </header>
//   );
// }

// function Details() {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [err, setErr] = useState(false);
//   const name = localStorage.getItem('name');
//   const gmail = localStorage.getItem('gmail');

//   useEffect(() => {
//     const fetchItem = async (id) => {
//       try {
//         const response = await fetch('/api/v1/items/search', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id }),
//         });
//         const data = await response.json();
//         setItem(data);
//         setErr(data && data.length === 0);
//       } catch (error) {
//         console.error(error);
//         setErr(true);
//       }
//     };

//     fetchItem(id);
//   }, [id]);

//   if (err) {
//     return <div>No item found</div>;
//   }

//   if (!item || item.length === 0) {
//     setErr(true);
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//         <Header />
//       {err && (
//         <div className='full-details'>
//           <img
//             className='details-img left-details'
//             src={item[0].image}
//             alt={item[0].name}
//           />
//           <div className='right-details'>
//             <div className='name-owner'>{name}</div>
//             <div className='name-detail'>{item[0].name}</div>
//             <div className='desc-detail'>{item[0].reason}</div>
//             <div className='price-detail'>
//               <span>Price: ₹</span> {item[0].price}
//             </div>
//             <div className='phonenumber-detail'>{item[0].number}</div>
//             <div className='email-detail'>{gmail}</div>
//             <div className='go-back-detail'>Go Back</div>
//           </div>
//         </div>
//       )}
//       {!err &&  <div className='no-item'>No item found</div>}
//     </div>
//   );
// }

// export default Details;


// import React,{useState,useEffect} from 'react'
// //import Img from './img3.jpeg'
// import Logo from "../assets/drawing.png"
// import '../Styles/Details.css'
// import { useLocation, Link,useNavigate,useParams } from 'react-router-dom';
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
//   }
// function Details() {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const name = localStorage.getItem('name');
//   const gmail = localStorage.getItem('gmail');

//   useEffect(() => {
//     const fetchItem = async (id) => {
//       try {
//         const response = await fetch('/api/v1/items/search', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id }),
//         });
//         const data = await response.json();
//         setItem(data.item);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchItem(id);
//   }, [id]);

//   if (item === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='full-details'>
//       <img className='details-img left-details' src={item[0].image} alt={item[0].name} />
//       <div className="right-details">
//         <div className="name-owner">{name}</div>
//         <div className="name-detail">{item[0].name}</div>
//         <div className="desc-detail">{item[0].reason}</div>
//         <div className="price-detail">
//           <span>Price: ₹</span> {item[0].price}
//         </div>
//         <div className="phonenumber-detail">{item[0].number}</div>
//         <div className="email-detail">{gmail}</div>
//         <div className="go-back-detail">Go Back</div>
//       </div>
//     </div>
//   );
// }

// export default Details


// // import React,{useState,useEffect} from 'react'
// // //import Img from './img3.jpeg'
// // import Logo from "../assets/drawing.png"
// // import '../Styles/Details.css'
// // import { useLocation, Link,useNavigate,useParams } from 'react-router-dom';
// // function useQuery() {
// //     return new URLSearchParams(useLocation().search);
// //   }
// // function Details() {
// //     // const query = useQuery();
// //     // const id=query.get('_id')
// //     const { id } = useParams();
// //     const [item, setItem] = useState(null);
// //     const name=localStorage.getItem('name');
// //     const gmail=localStorage.getItem('gmail')
// //     useEffect(() => {
// //         const fetchItem = async (id) => {
// //           try {
// //             const response = await fetch('/api/v1/items/search', {
// //               method: 'POST',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({ id }),
// //             });
// //             const data = await response.json();
// //             setItem(data);
// //           } catch (error) {
// //             console.error(error);
// //           }
// //         };
    
// //         fetchItem(id);
// //       }, [id]);

// //   if (!id) {
// //     return <div>Loading...</div>;
// //   }
// //   console.log(item);

// //   return (
// //     <div className='full-details'>
// //     <img className='details-img left-details' src={item[0].image} alt={item[0].name} />
// //     <div className="right-details">
// //       <div className="name-owner">{name}</div>
// //       <div className="name-detail">{item[0].name}</div>
// //       <div className="desc-detail">{item[0].reason}</div>
// //       <div className="price-detail">
// //         <span>Price: ₹</span> {item[0].price}
// //       </div>
// //       <div className="phonenumber-detail">{item[0].number}</div>
// //       <div className="email-detail">{gmail}</div>
// //       <div className="go-back-detail">Go Back</div>
// //     </div>
// //   </div>
// //     // <div className='full-details'>
// //     //         {/* <img className='details-img left-details' src={item.image} alt="name" /> */}
// //     //         <div className="right-details">
// //     //             {/* <div className="name-owner">
// //     //                { name}
// //     //             </div>
// //     //             <div className="name-detail">
                
// //     //                { item.name}
// //     //             </div>
// //     //             <div className="desc-detail">
// //     //                { item.reason}
// //     //             </div>
// //     //             <div className="price-detail">
// //     //                 <span>Price :₹</span> {item.price}
// //     //             </div>
// //     //             <div className="phonenumber-detail">
// //     //                { item.number}
// //     //             </div>
// //     //             <div className="email-detail">
// //     //                 {gmail}
// //     //             </div> */}
// //     //             <div className="go-back-detail">
// //     //                 Go Back
// //     //             </div>                 
// //     //     </div>
// //     // </div>
// //   )
// // }

// // export default Details


{/* <div className='full-details'>
{item[0] && (
<>
 <img
   className='details-img left-details'
   src={item[0].image}
   alt={item[0].name}
 />
 <div className='right-details'>
   <div className='name-owner'>{name}</div>
   <div className='name-detail'>{item[0].name}</div>
   <div className='desc-detail'>{item[0].reason}</div>
   <div className='price-detail'>
     <span>Price: ₹</span> {item[0].price}
   </div>
   <div className='phonenumber-detail'>{item[0].number}</div>
   <div className='email-detail'>{gmail}</div>
   <div className='go-back-detail'>Go Back</div>
 </div>
</>
)}
</div> */}