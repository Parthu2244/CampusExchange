// import React, { useState } from 'react';
// import '../Styles/UploadForm.css';

// const Form = () => {
//   const gmail = localStorage.getItem('gmail');
//   const username = localStorage.getItem('name');

//   const [image, setImage] = useState('');
//   function convertToBase64(e) {
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//   }

//   const [name, setName] = useState('');
//   const [company, setCompany] = useState('');
//   const [reason, setReason] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [number, setNumber] = useState('');
   
//   function handleNumber(e) {
//     setNumber(e.target.value);
//   }
   
   
//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleCompanyChange = (e) => {
//     setCompany(e.target.value);
//   };

//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const start = async () => {
//       const response = await fetch('/api/v1/main', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           gmail,
//           name,
//           company,
//           price,
//           reason,
//           number,
//           image,
//         }),
//       });
//       const data=await response.json();
//       if(response.status===200){

//       }
//       else{
        
//       }
//     }
     
//     start();
//     setName('');
//   setCompany('');
//   setReason('');
//   setPrice('');
//   setCategory('');
//   setNumber('');
//   setImage('');
//   };

//   return (
//     <div className="main-upload">
//       <form className="upload-form" onSubmit={handleSubmit}>
//         <div>
//           <p className='upload-sell'>Sell Your Item</p>

//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={handleNameChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="company">Company:</label>
//           <input
//             type="text"
//             id="company"
//             value={company}
//             onChange={handleCompanyChange}
//             required
//           />
//         </div>
        
//         <div>
//           <label htmlFor="number">Mobile Number</label>
//           <input value={number} onChange={handleNumber} type="number" name="number" id="" />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input
//             type="file"
//             id="image"
//             onChange={convertToBase64}
//             accept="image/*"
//             required
//           />
//         </div>
        
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             value={price}
//             onChange={handlePriceChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="reason">Reason for Selling:</label>
//           <textarea
//             id="reason"
//             value={reason}
//             onChange={handleReasonChange}
//             required
//           ></textarea>
//         </div>
        
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default Form;
import React, { useState } from 'react';
import '../Styles/UploadForm.css';

const Form = () => {
  const gmail = localStorage.getItem('gmail');
  const username = localStorage.getItem('name');

  const [image, setImage] = useState('');
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [reason, setReason] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [number, setNumber] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  function handleNumber(e) {
    setNumber(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail,
          name,
          company,
          price,
          reason,
          number,
          image,
        }),
      });

      if (response.status === 200) {
        setUploadStatus('Item posted successfully.');
      } else {
        setUploadStatus('Failed to post item. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to post item. Please try again.');
    }

    // Reset form values
    setName('');
    setCompany('');
    setReason('');
    setPrice('');
    setCategory('');
    setNumber('');
    setImage('');
  };

  return (
    <div className="main-upload">
          {uploadStatus && <p>{uploadStatus}</p>}
      <form className="upload-form" onSubmit={handleSubmit}>
        <div>
          <p className="upload-sell">Sell Your Item</p>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={handleCompanyChange}
            required
          />
        </div>

        <div>
          <label htmlFor="number">Mobile Number</label>
          <input value={number} onChange={handleNumber} type="number" name="number" id="" />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={convertToBase64}
            accept="image/*"
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Selling:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            required
          ></textarea>
        </div>

        <button type="submit">Upload</button>
      </form>
     
    </div>
  );
};

export default Form;

