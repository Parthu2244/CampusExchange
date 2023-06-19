import React,{useState,useEffect} from 'react'
import '../Styles/Register.css';
import { Link,useNavigate } from 'react-router-dom';
import UserInput from "../hooks/UserInput";
const isEmail = (value) => value.includes('@');
const isNotEmpty = (value) => value.trim() !== '';
function Register() {
	const navigate=useNavigate();
    const [error,setError]=useState(false);
	const [errormsg,setErrormsg]=useState(' ');
	const [succ,setSucc]=useState(' ');
	const [isLoading, setIsLoading] = useState(false);
    
	const {
		value: fullname ,
		isValid: FullnameIsValid,
		hasError: FullnameHasError,
		valueChangeHandler: FullnameChangeHandler,
		inputBlurHandler: FullnameBlurHandler,
		reset: resetFullname,
	  } = UserInput(isNotEmpty);
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

  let formIsValid = false;
  if ( FullnameIsValid&& emailIsValid &&passwordIsValid  ) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
     
     
    const start = async (event) => {
		setIsLoading(true);
      const response = await fetch( '/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname ,email,  password }),
      });
      const error = await response.json();
      if (response.status === 403) {
        setErrormsg(error.message);
		setError(true);
        resetEmail();
        return; 
      }
      else if(response.status===200){
		setSucc(error.message)
		setError(false);
		setTimeout(() => {
			navigate('/login');
		}, 3500);
      }
	  else{
		setErrormsg(error.message);
        setError(true);
	  }
      setIsLoading(false);
    }
    start();
	resetFullname();
	resetEmail();
	resetPassword();
	 

  };
   
  const FirstNameClasses =FullnameHasError ? 'inputs' : 'inputs';
  
  
  
  const emailClasses = emailHasError ? 'inputs' : 'inputs';
  const passwordClasses = passwordHasError ? 'inputs' : 'inputs';
   
	return (
		<div>
			<div class="parent clearfix">
			<div class="bg-illustration">
			</div>
			<div class="login">
			<div class="container">
				<div class="login-form">
					<h1 className='regist-head'>Register</h1>
				<form action="">
				{error &&<p className="error-respnose">{errormsg}</p>}
				{!error&&<p className='error-true'>{succ}</p>}
				<input className={  FirstNameClasses} 
                   type="text" 
                   id='FirstName'
                   value={fullname}
                    onChange={FullnameChangeHandler}
                    onBlur={FullnameBlurHandler}
                   placeholder='Full Name' 
                   />
                { FullnameHasError && <p className="error-text">Please enter the First name.</p>}
				<input className={emailClasses } 
                    type="email" 
                    id='email'
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder='Email' 
                    />
                {emailHasError && <p className="error-text">Please enter the email.</p>}
				<input className={passwordClasses } 
                   type="password"
                   placeholder='Password' 
                   name="pswd" 
                   id="password"
                   value={password}
                   onChange={passwordChangeHandler}
                   onBlur={passwordBlurHandler} />
				    {  passwordHasError &&  <p className="error-textre">Please enter the password.</p>}
					<button type="submit" onClick={submitHandler} disabled={ isLoading}> {isLoading ? 'Loading...' : 'Register'}</button>
					<p className='logo-register'>Already have an account?<Link className='link-toregister' to='/login'>login</Link> here</p>
				</form>
				</div>
			</div>
			</div>
		</div>
		</div>
	)
	}

	export default Register