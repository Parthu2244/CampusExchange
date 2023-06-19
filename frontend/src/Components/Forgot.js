import React,{useState} from 'react'
import UserInput from '../hooks/UserInput';
import '../Styles/Forgot.css'
const isEmail = (value) => value.includes('@');
function Forgot() {
    const [errormsg,setErrormsg]=useState(' ');
    const [error,setError]=useState(false);
    const [succ,setSucc]=useState(' ');
	const [isLoading, setIsLoading] = useState(false);
    const {
		value: email,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	  } = UserInput(isEmail);
       
      const submitHandler=e=>{
        e.preventDefault();
        const start=async()=>{
            setIsLoading(true);
            const response=await fetch('/api/v1/forgot-password',{
              method:'POST',
              headers:{
                'content-Type':'application/json'
              },
              body: JSON.stringify({ email}),
            })
            const msg=await response.json()
            if(response.status===300){
                setErrormsg(msg.message);
                setError(true);   
                
            }
            else if(response. status===200){
                setSucc(msg.message)
                setError(false);
            }
            else{
                setErrormsg(msg.message);
                setError(true); 
                
            }
            setIsLoading(false);
          }
          start();
          
          resetEmail();
          console.log(email);
    }
    const emailClasses = emailHasError ? 'inputs-error' : 'inputs';
  return (
    <div className='full'>
        <form className='forms' action="">
            <h1 className='forg'>Forgot Password</h1>
                {error &&<p className="error-respnose">{errormsg}</p>}
				{!error&&<p className='error-true'>{succ}</p>}
            {/* <input className='inputs' type="email" placeholder='please enter your email' /> */}
            <input className={emailClasses } 
                    type="email" 
                    id='email'
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder='please enter your email' 
                    />
                {emailHasError && <h3 className="error-text">Please enter the email.</h3>}
            <button className='btn' disabled={isLoading} onClick={submitHandler} type="submit"> {isLoading ? 'Loading...' : 'send verication code'}</button>
            
        </form>
    </div>
  )
}

export default Forgot