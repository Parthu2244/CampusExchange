import React, { useState, useEffect } from 'react';
import '../Styles/card.css';
import {useNavigate} from "react-router-dom"
export default function Listproducts() {
  const navigator=useNavigate();
  const [data, setData] = useState({});
  const gmail = localStorage.getItem('gmail');
  const [isLoading, setIsLoading] = useState(false);
  const deleteItem = async (id) => {
     
    try {
      setIsLoading(true);
      const response = await fetch(`/api/v1/main/delete/${id}`, {
        method: 'DELETE',
      });
      
      if (response.status === 200) {
        console.log('Item deleted successfully');
        setIsLoading(false);
        setData((prevState) => {
          const newData = { ...prevState };
          for (const category in newData) {
            newData[category] = newData[category].filter(
              (item) => item._id !== id
            );
          }
          return newData;
          setIsLoading(false);
        });
      } else {
        console.log('Failed to delete item');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const start = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/v1/main/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gmail }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    start();
  }, []);

  // Calculate the total number of products
  const totalProducts = Object.values(data).reduce(
    (total, category) => total + category.length,
    0
  );

   const handleSellItems=()=>{
    navigator('/products/postitem')
    console.log("products")
   }
  return (
    <div className='your-prod-back'>
      <header className='prodcuts-header-list'>
        <h1 className='your-products-list'>
          Your Products
        </h1>
        <h2>Total Items :{totalProducts}</h2>
        <button className='sell-items' onClick={handleSellItems}>
          Post Item
        </button>
      </header>
      <div>
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <div>
            {Object.keys(data).map((category) => (
              <div key={category}>
                <div className='grid-card gridcard-list'>
                  {data[category].map((item) => (
                    <div className='tiffins-card' key={item.id}>
                      <div className='itm-card'>
                        <img
                          className='tiffin-img-card'
                          description='add to cart'
                          src={item.image}
                          alt='product -image'
                        />
                        <p>{item.name}</p>
                        <div className='desc-card'>
                          <h3>₹{item.price}</h3>
                          <p>{item.reason}</p>
                        </div>

                        <button
                          className='btn-card'
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete Item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
