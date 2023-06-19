import React,{useState,useEffect} from 'react'
import '../Styles/Login.css';
import Check from './Check';
import { Link,useNavigate } from 'react-router-dom';
import UserInput from "../hooks/UserInput";
const isEmail = (value) => value.includes('@');
const isNotEmpty = (value) => value.trim() !== '';
function Login() {
	const navigate=useNavigate();
	 const [showpassword,setShowPassword]=useState(false);
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');
	const [isLoading, setIsLoading] = useState(false);
    let formIsValid = false;
	const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
      } = UserInput(isEmail);
      const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
      } = UserInput(isNotEmpty);
	  if ( email&& password) {
		formIsValid = true;
	  }

	  const submitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) {
		  return;
		}
		const start = async (event) =>
		 {
			setIsLoading(true);
			const response = await fetch('/api/v1/login', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			  });
			  const data = await response.json();

			  if (response.status === 401) {
				console.log(data.message);
				setErrorMessage(data.message);
				setError(true);
				Check(false);
			  } else if (response.status === 200) {
				setError(false);
				 
                 Check(true);
				 console.log(data.user);
				 localStorage.setItem('token', data.user);
				 localStorage.setItem('gmail',data.user.gmail);
				 localStorage.setItem('name',data.user.name)
               // localStorage.setItem('token', data.user);
                 const timer = setTimeout(() => {
					navigate('/products');
                }, 2000);

                return () => clearTimeout(timer);
			  
			  } else if (response.status === 402) {
				setErrorMessage(data.message);
				setError(true);
				Check(false);
			  } else {
				setErrorMessage(data.message);
				Check(false);
			  }
			   setIsLoading(false);
	  }
		start();
		resetEmail();
		resetPassword();
	  };
	  const emailClasses = emailHasError ? 'input' : 'login-input';
      const passwordClasses = passwordHasError ? 'input' : 'login-input';
	   

  return (
    <div> 
        <div className="parent clearfix">
		 
		<div className="bg-illustration">
		</div>
		 
		<div className="login">
		 
		  <div className="container">
		
			<div className="login-form">
			<h1 className='login-h1'>Login</h1>
			  <form action="">
			  {error &&<p className="error-respnose">{errorMessage}</p>}
			  <input 
               className={emailClasses}
               type="email" 
               placeholder="username"
               id='email'
               value={email}
               onChange={emailChangeHandler}
               onBlur={emailBlurHandler}
			   required
			   />
			    {emailHasError && <h3 className="error-text">Please enter a valid email address.</h3>}
				{/* <div class="forget-pass">
				  <div className="forg" >Forgot Password ?</div>
				</div> */}
                <input 
               className={passwordClasses} 
               type={showpassword? 'text':'password'} 
               placeholder='password'
                id='password'
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
				required
				/>
                
				 
				{passwordHasError && <h3 className="error-text">Please enter a password.</h3>}
				 
				<button disabled={!formIsValid||isLoading} onClick={submitHandler} type="submit">  {isLoading ? 'Loading...' : 'LOG-IN'}</button>
				 
 
				<p className='logo-register'>Don't have account <Link className='forg' to='/register'>register</Link> here? </p>
				<p className='logo-register'><Link className='forg' to='/forgot'>Forgot Password ?</Link></p>
	
			  </form>
			</div>
		
		  </div>
		  </div>
	  </div>
    </div>
  )
}

export default Login