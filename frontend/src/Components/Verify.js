 
import React, { useState, useEffect } from 'react';
import { useLocation, Link,useNavigate } from 'react-router-dom';

 
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const  Verify= () => {
    const navigate=useNavigate();
    const query = useQuery();
    const verificationToken = query.get('token');
     const gmail=query.get('gmail')
     const [error, setError] = useState(false);
  const [errormsg,setErrormsg]=useState('');

  const successContainerStyle = {
    backgroundColor: '#e6f7e0',
    border: '1px solid #b3e3a3',
    padding: '20px',
    borderRadius: '4px',
  };

  const successHeadingStyle = {
    color: '#155724',
    fontSize: '24px',
    padding: '10px',
    marginBottom: '10px',
    
  };

  const successMessageStyle = {
    color: '#155724',
    fontSize: '16px',
    padding: '10px',
  };
  const errorstyle={
    color:'red',
    fontSize:'1.2rem'
  };
  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch('/api/v1/verifygmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ verificationToken, gmail }),
        });

        if (response.status === 403) {
          const error = await response.json();
          setErrormsg(error.message);
          setError(true);
        } else if (response.status === 200) {
          const data = await response.json();
          setError(false);
          setTimeout(() => {
            navigate('/login');
          }, 3500);
        }
      } catch (error) {
        console.error('An error occurred:', error);
         
      }
    };

    start();
  }, []);  
  const successContent = (
    <div style={successContainerStyle}>
      <h2 style={successHeadingStyle}>Account Verification Successful!</h2>
      <p style={successMessageStyle}>
        Congratulations! Your Gmail account has been successfully verified.
      </p>
      <h2>
        <Link to="/login">Login</Link>
      </h2>
    </div>
  );

  return (
     <div>
        {!error && successContent}
        {/* {!error && errormsg } */}
     </div>
  );
};

export default Verify;
