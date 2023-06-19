import React,{useState} from 'react'
import '../Styles/Reset.css';
import UserInput from "../hooks/UserInput";
import {useNavigate, useLocation, Link } from 'react-router-dom';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const isNotEmpty = (value) => value.trim() !== '';
function Reset() {
  const navigate=useNavigate();
    const query = useQuery();
    const verificationToken = query.get('token');
    const gmail=query.get('email')
    const [error, setError] = useState(false);
    const [errormsg,setErrormsg]=useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [succ,setSucc]=useState(' ');
    const navigator=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
      } = UserInput(isNotEmpty);
      const {
        value: confpassword,
        isValid: confpasswordIsValid,
        hasError: confpasswordHasError,
        valueChangeHandler: confpasswordChangeHandler,
        inputBlurHandler: confpasswordBlurHandler,
        reset: resetconfPassword,
      } = UserInput(isNotEmpty);

      const submitHandler = event => {
        event.preventDefault();
        if(password!==confpassword){
            setPasswordsMatch(false);
            resetPassword();
            resetconfPassword();
            return;
          }
        const start = async (event) => {
           // setIsLoading(true);
          const response = await fetch( '/api/v1/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  verificationToken, gmail,password }),
          });
          const error = await response.json();
           console.log(error);
          if (response.status === 400) {
            setErrormsg(error.message);
            setError(true);
          } 
          else if(response.status===200){
            setSucc(error.message)
            console.log(error.message);
            setError(false);
            setTimeout(() => {
              navigate('/login');
            }, 3500);

          }
          else{
            setErrormsg(error.message);
            setError(true);
          }
          //setIsLoading(false);
        }
        start(); 
        resetPassword();
        resetconfPassword();
      };


      const passwordClasses = passwordHasError ? ' inputs-reset-err' : ' inputs-reset';
      const confpasswordClasses = confpasswordHasError ? ' inputs-reset-err' : ' inputs-reset';
  return (
    <div className='full-reset'>
        <form className='forms-reset' action="">
            <p className='reset-reset'>Reset Password</p>
            {error &&<p className="error-text-reset">{errormsg}hi</p>}
			{!error&&<p className='error-true-reset'>{succ}</p>}
            <input className='inputs-reset' type="email" value={gmail} name="" id="" placeholder='Email' readOnly/>
            <input
            className={passwordClasses}
            type='password'
            id='password'
            placeholder='Enter-password'
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            />
          { passwordHasError && <p className="error-text-reset">Please enter the password.</p>}
          <input
          className={confpasswordClasses}
            type='password'
            id='Conform Password'
            placeholder='Re-enter password'
            value={confpassword}
            onChange={confpasswordChangeHandler}
            onBlur={confpasswordBlurHandler}
          />
          {confpasswordHasError && <p className="error-text-reset">Please re-enter the password.</p>}
            
        {!passwordsMatch && <p className='error-text-pas-reset'>Passwords do not match</p>} 
            <button className='btn-reset' disabled={isLoading} onClick={submitHandler} type="submit"> {isLoading ? 'Loading...' : 'Reset Password'}</button>

        </form>
    </div>
  )
}

export default Reset