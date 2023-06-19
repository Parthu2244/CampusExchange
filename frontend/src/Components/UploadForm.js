import React, { useState } from 'react';
import '../Styles/UploadForm.css';

const UploadForm = () => {
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
  const [otherCategory, setOtherCategory] = useState('');

  function handleNumber(e) {
    setNumber(e.target.value);
  }
  function handleCategory(e) {
    setCategory(e.target.value);
  }
  function handleOtherCategory(e) {
    setOtherCategory(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = async () => {
      const response = await fetch(`/api/v1/item/${category}`, {
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
          category,
          otherCategory,
          image,
        }),
      });
    }
    const start2 = async () => {
      const response = await fetch('/api/v1/item', {
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
          category,
          otherCategory,
          image,
        }),
      });
    }
    start();
    start2();
  };

  return (
    <div className="main-upload">
      <form className="upload-form" onSubmit={handleSubmit}>
        <div>
          <p className='upload-sell'>Sell Your Item</p>

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
          <label htmlFor="category">Category</label>
          <select value={category} onChange={handleCategory} name="category" id="category">
            <option></option>
            <option value="laptop">Laptop</option>
            <option value="mobiles">Mobiles</option>
            <option value="bike">Bikes</option>
            <option value="car">Cars</option>
            <option value="gym">Gym</option>
            {/* <option value="sports">Sports</option> */}
            <option value="books">Books</option>
            <option value="others">Others</option>
          </select>
        </div>
        {/* {category === 'others' && (
          <div>
            <label htmlFor="otherCategory">Other Category:</label>
            <input
              type="text"
              id="otherCategory"
              value={category}
              onChange={handleOtherCategory}
              required
            />
          </div>
        )} */}
        <div>
          <label htmlFor="number">Mobile Number</label>
          <input value={number} onChange={handleNumber} type="number" name="number" id="" />
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
          <label htmlFor="reason">Reason for Selling:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            required
          ></textarea>
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
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
