import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import '../Styles/card.css';
import { Link, useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Drawing from '../assets/drawing.png';

function Products() {
  const navigator = useNavigate();
  const gmail = localStorage.getItem('gmail');
  const [nav, setNav] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [no, setNo] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function handlenav(e) {
    if (nav === true) {
      setNav(false);
    } else {
      setNav(true);
    }
  }

  function handlefull() {
    if (nav === true) {
      setNav(false);
    }
  }

  const LogoutHandler = (event) => {
    navigator('/login');
  };

  const ProfileHandler = (event) => {
    navigator('/products/profile');
  };

  const MyproductsHandler = (event) => {
    navigator('/products/myproducts');
  };

  const SellChangeHandler = (event) => {
    event.preventDefault();
    navigator('/products/postitem');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/v1/main');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterDataByName = (name) => {
    const filteredData = data.filter((item) => item.name === name);
    console.log(filteredData);
  };
  const fetchData = async (name) => {
    setIsLoading(true);
    
      setNo(true);
      const filteredData = Object.values(data).flatMap((items) =>
        items.filter((item) => item.name === name)
      );
      setFilterData(filteredData);
      setIsSearching(true);
    
    setIsLoading(false);
  };
  // const fetchData = async (name) => {
  //   setIsLoading(true);
  //   setNo(true);
  //   const filtereddata = Object.values(data).flatMap((items) =>
  //     items.filter((item) => item.name === name)
  //   );
  //   console.log(filtereddata);
  //   setFilterData(filtereddata);
  //   setIsLoading(false);
  // };

  const fetchDatamore = async (name) => {
    setNo(false);
    setSearchValue('')
    setIsSearching(false);
  };

  // const handleSearch = () => {
  //   fetchData(searchValue);
  // };
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchData(searchValue);
      //setSearchValue(' ')
    }
  };

  return (
    <div className='full-prod' onClick={handlefull}>
      <nav className='header-prod'>
        <img className='header-logo-prod' src={Drawing} alt='' />
        <div className='header-search-prod'>
          <input
            type='text'
            className='search-input-prod'
            value={searchValue}
            placeholder='search in singular form of an item'
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleSearch}
          />
          <SearchIcon className='header-search-icon-prod' onClick={handleSearch} />
        </div>
        <div className='headernav-prod'>
          <div className='sell-prod' onClick={SellChangeHandler}>
            Post an Item
          </div>
          <DensityMediumIcon
            onClick={handlenav}
            className={nav ? 'header-navigating-prod' : 'header-navigating-inv-prod'}
          />
        </div>
      </nav>
      <div className={nav ? 'nav-prod' : 'nav-vis-prod'}>
        <div className='navi-prod' onClick={ProfileHandler}>
          Profile
        </div>
        <div className='navi-prod' onClick={LogoutHandler}>
          Signout
        </div>
        <div className='navi-prod' onClick={MyproductsHandler}>
          My Products
        </div>
      </div>
      <div className='filters-prod'>
        <div className='row-filters-prod'>
          <div className='filter-prod' value='allitems' onClick={fetchDatamore.bind(null, 'allitems')}>
            All
          </div>
          <div className='filter-prod' value='mobiles' onClick={fetchData.bind(null, 'mobile')}>
            Mobiles
          </div>
          <div className='filter-prod' value='bikes' onClick={fetchData.bind(null, 'bike')}>
            Bikes
          </div>
          <div className='filter-prod' value='laptops' onClick={fetchData.bind(null, 'laptops')}>
            Laptops
          </div>
          <div className='filter-prod' value='gyms' onClick={fetchData.bind(null, 'gym')}>
            Gym
          </div>
          {/* <div className="filter-prod"  value='sports' onClick={fetchData.bind(null, 'sports')}>Sports</div> */}
          <div className='filter-prod' value='cars' onClick={fetchData.bind(null, 'car')}>
            Car
          </div>
          <div className='filter-prod' value='books' onClick={fetchData.bind(null, 'book')}>
            Books
          </div>
          <div className='filter-prod' value='others' onClick={fetchData.bind(null, 'others')}>
            Others
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <div>
            {isSearching ? (
              filterData.length > 0 ? (
                <div className='grid-card'>
                  {filterData.map((item, index) => (
                    <Card data={item} key={index} />
                  ))}
                </div>
              ) : (
                <p className='no-items'>No items found.</p>
              )
            ) : (
              Object.keys(data).map((category) => (
                <div key={category}>
                  <div className='grid-card'>
                    {data[category].map((item) => (
                      <Card data={item} key={item.id} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
 
  


// //    >
// //     rd.js';

// import React,{useState,useEffect} from 'react'
// import Card from './Card.js'
// import '../Styles/card.css';
// import {Link,useNavigate} from 'react-router-dom';
//  //import jwt_decode from 'jwt-decode';
// import DensityMediumIcon from '@mui/icons-material/DensityMedium';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import Drawing from '../assets/drawing.png'
// function Products() {
//      const navigator=useNavigate();
//     const gmail = localStorage.getItem('gmail');
//     const [nav,setNav]=useState(false);
//     const [data,setData]=useState([]);
//     const [filterData,setFilterData]=useState([]);
//     const [no,setNo]=useState(false);
//     const [searchValue, setSearchValue] = useState('');
   
//     const [isLoading, setIsLoading] = useState(false);
//     function handlenav(e){
//         if(nav===true){
//             setNav(false);
//         }else{
//             setNav(true);
//         }
//     }
//     function handlefull(){
//         if(nav===true){
//             setNav(false);
//         }
//     }
//     const LogoutHandler=event=>{
//         navigator('/login')
//     }
//     const ProfileHandler=event=>{
//          navigator('/products/profile')
//     }
//     const MyproductsHandler=event=>{
//          navigator('/products/myproducts')
//     }
//     const SellChangeHandler=event=>{
//       event.preventDefault();
//       navigator('/products/postitem')
//     }
//     useEffect(() => {
//       const AllfetchData = async () => {
//         try {
//           setIsLoading(true);  
//           const response = await fetch('/api/v1/main');
//           const jsonData = await response.json();
//           const newdata=Object.keys(jsonData);
//           //setFilterData(newdata);
//           setData(jsonData);
//          // console.log(jsonData);
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setIsLoading(false);  
//         }
//       };
    
//       AllfetchData();
//     }, []);
//     const filterDataByName = (name) => {
//       const filteredData = data.filter((item) => item.name === name);
       
//       console.log(filteredData);
//     };
    
      
       
//     const fetchData = async (name) => {
//       setIsLoading(true);  
//     setNo(true);
//       const filtereddata = Object.values(data).flatMap((items) =>
//       items.filter((item) => item.name === name));
//       console.log(filtereddata);
//      // setData(filteredData)
//      setFilterData(filtereddata);
//       setIsLoading(false);  
//       }
//       const fetchDatamore=async(name)=>{
//         setNo(false);
//       }
//       const handleSearch = () => {
//         fetchData(searchValue)
//        // console.log('Search Value:', searchValue);
//       };
      
//   return (
//     <div className='full-prod' onClick={handlefull}>
//         <nav className="header-prod">
//             <img className='header-logo-prod' src={Drawing} alt="" />
//             <div className="header-search-prod">
//             <input
//                 type='text'
//                 className='search-input-prod'
//                 value={searchValue}
//                 placeholder='search in singular form'
//                 onChange={(e) => setSearchValue(e.target.value)}
//           />
//                 <SearchIcon className='header-search-icon-prod' onClick={handleSearch} />
//             </div>
//             <div className="headernav-prod">
                
//                 <div className='sell-prod' onClick={SellChangeHandler}>Sell</div>
//                 <DensityMediumIcon onClick={handlenav}   className={nav?'header-navigating-prod':'header-navigating-inv-prod'}/>
//             </div>
//         </nav>
//         <div className={nav?"nav-prod":"nav-vis-prod"}>
//                     <div className="navi-prod" onClick={ProfileHandler}>
//                         Profile
//                     </div>
//                     <div className="navi-prod" onClick={LogoutHandler}>
//                         Signout
//                     </div>
//                     <div className="navi-prod" onClick={MyproductsHandler}>
//                         My Products
//                     </div>
//                 </div>
//         <div className='filters-prod'>
//             <div className="row-filters-prod">
//                  <div className="filter-prod" value='allitems' onClick={ fetchDatamore.bind(null, 'allitems')}>All</div>
//                 <div className="filter-prod" value='mobiles' onClick={ fetchData.bind(null, 'mobile')}>Mobiles</div>
//                 <div className="filter-prod"  value='bikes' onClick={fetchData.bind(null, 'bike')}>Bikes</div>
//                 <div className="filter-prod"  value='laptops' onClick={ fetchData.bind(null, 'laptops')}>Laptops</div>
//                 <div className="filter-prod"  value='gyms' onClick={ fetchData.bind(null, 'gym')}>Gym</div>
//                 {/* <div className="filter-prod"  value='sports' onClick={fetchData.bind(null, 'sports')}>Sports</div> */}
//                 <div className="filter-prod"  value='cars' onClick={fetchData.bind(null, 'car')}>Car</div>
//                 <div className="filter-prod"  value='books' onClick={fetchData.bind(null, 'book')}>Books</div>
//                 <div className="filter-prod"  value='others' onClick={ fetchData.bind(null, 'others')}>Others</div>     
//             </div>
//         </div>
//         <div>
//     {isLoading ? (
//       <p className='loading'>Loading...</p>
//     ) : (
//       <div>
//         { no && filterData.map((item, index) => (
//           <div key={index}>
//             <div className='grid-card'>
//               <Card data={item} />
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>

//         <div>
//                { isLoading ? (
//                    <p className='loading'>Loading...</p> 
//                 ) : (
//                       <div>
//                             { !no && Object.keys(data).map((category) => (
//                                  <div key={category}>
//                                       <div className="grid-card">
//                                           {data[category].map((item) => (
//                                            <Card   data={item}  />
//                                            ))}
//                                       </div>
//                                    </div>
//                              ))}
//                         </div>
//                )}
               
//         </div>
//         </div>
//   )
// }

// export default Products;


// import React, { useState, useEffect } from 'react';
// import Card from './Card.js';
// import '../Styles/card.css';
// import { Link, useNavigate } from 'react-router-dom';
// import DensityMediumIcon from '@mui/icons-material/DensityMedium';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import Drawing from '../assets/drawing.png';

// function Products() {
//   const navigator = useNavigate();
//   const gmail = localStorage.getItem('gmail');
//   const [nav, setNav] = useState(false);
//   const [data, setData] = useState([]);
//   const [filterData, setFilterData] = useState([]);
//   const [no, setNo] = useState(false);
//   const [searchValue, setSearchValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);

//   function handlenav(e) {
//     if (nav === true) {
//       setNav(false);
//     } else {
//       setNav(true);
//     }
//   }

//   function handlefull() {
//     if (nav === true) {
//       setNav(false);
//     }
//   }

//   const LogoutHandler = (event) => {
//     navigator('/login');
//   };

//   const ProfileHandler = (event) => {
//     navigator('/products/profile');
//   };

//   const MyproductsHandler = (event) => {
//     navigator('/products/myproducts');
//   };

//   const SellChangeHandler = (event) => {
//     event.preventDefault();
//     navigator('/products/postitem');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('/api/v1/main');
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterDataByName = (name) => {
//     const filteredData = data.filter((item) => item.name === name);
//     console.log(filteredData);
//   };
//   const fetchData = async (name) => {
//     setIsLoading(true);
    
//       setNo(true);
//       const filteredData = Object.values(data).flatMap((items) =>
//         items.filter((item) => item.name === name)
//       );
//       setFilterData(filteredData);
//       setIsSearching(true);
    
//     setIsLoading(false);
//   };
//   // const fetchData = async (name) => {
//   //   setIsLoading(true);
//   //   setNo(true);
//   //   const filtereddata = Object.values(data).flatMap((items) =>
//   //     items.filter((item) => item.name === name)
//   //   );
//   //   console.log(filtereddata);
//   //   setFilterData(filtereddata);
//   //   setIsLoading(false);
//   // };

//   const fetchDatamore = async (name) => {
//     setNo(false);
//     setSearchValue('')
//     setIsSearching(false);
//   };

//   // const handleSearch = () => {
//   //   fetchData(searchValue);
//   // };
//   const handleSearch = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       fetchData(searchValue);
//       //setSearchValue(' ')
//     }
//   };

//   return (
//     <div className='full-prod' onClick={handlefull}>
//       <nav className='header-prod'>
//         <img className='header-logo-prod' src={Drawing} alt='' />
//         <div className='header-search-prod'>
//           <input
//             type='text'
//             className='search-input-prod'
//             value={searchValue}
//             placeholder='search in singular form of an item'
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyPress={handleSearch}
//           />
//           <SearchIcon className='header-search-icon-prod' onClick={handleSearch} />
//         </div>
//         <div className='headernav-prod'>
//           <div className='sell-prod' onClick={SellChangeHandler}>
//             Post An Item
//           </div>
//           <DensityMediumIcon
//             onClick={handlenav}
//             className={nav ? 'header-navigating-prod' : 'header-navigating-inv-prod'}
//           />
//         </div>
//       </nav>
//       <div className={nav ? 'nav-prod' : 'nav-vis-prod'}>
//         <div className='navi-prod' onClick={ProfileHandler}>
//           Profile
//         </div>
//         <div className='navi-prod' onClick={LogoutHandler}>
//           Signout
//         </div>
//         <div className='navi-prod' onClick={MyproductsHandler}>
//           My Products
//         </div>
//       </div>
//       <div className='filters-prod'>
//         <div className='row-filters-prod'>
//           <div className='filter-prod' value='allitems' onClick={fetchDatamore.bind(null, 'allitems')}>
//             All
//           </div>
//           <div className='filter-prod' value='mobiles' onClick={fetchData.bind(null, 'mobile')}>
//             Mobiles
//           </div>
//           <div className='filter-prod' value='bikes' onClick={fetchData.bind(null, 'bike')}>
//             Bikes
//           </div>
//           <div className='filter-prod' value='laptops' onClick={fetchData.bind(null, 'laptops')}>
//             Laptops
//           </div>
//           <div className='filter-prod' value='gyms' onClick={fetchData.bind(null, 'gym')}>
//             Gym
//           </div>
//           {/* <div className="filter-prod"  value='sports' onClick={fetchData.bind(null, 'sports')}>Sports</div> */}
//           <div className='filter-prod' value='cars' onClick={fetchData.bind(null, 'car')}>
//             Car
//           </div>
//           <div className='filter-prod' value='books' onClick={fetchData.bind(null, 'book')}>
//             Books
//           </div>
//           <div className='filter-prod' value='others' onClick={fetchData.bind(null, 'others')}>
//             Others
//           </div>
//         </div>
//       </div>
//       <div>
//         {/* {isLoading ? (
//           <p className='loading'>Loading...</p>
//         ) : (
//           <div>
//             {no ? (
//               filterData.map((item, index) => (
//                 <div key={index}>
//                   <div className='grid-card'>
//                     <Card data={item} />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               Object.keys(data).map((category) => (
//                 <div key={category}>
//                   <div className='grid-card'>
//                     {data[category].map((item) => (
//                       <Card data={item} key={item.id} />
//                     ))}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>  
//         )}*/}
//         {isLoading ? (
//   <p className='loading'>Loading...</p>
// ) : (
//   <div>
//     {isSearching ? (
//       filterData.map((item, index) => (
//         <div key={index}>
//           <div className='grid-card'>
//             <Card data={item} />
//           </div>
//         </div>
//       ))
//     ) : (
//       Object.keys(data).map((category) => (
//         <div key={category}>
//           <div className='grid-card'>
//             {data[category].map((item) => (
//               <Card data={item} key={item.id} />
//             ))}
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

// export default Products;
