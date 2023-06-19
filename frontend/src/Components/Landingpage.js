import React,{useEffect} from 'react'
import '../Styles/Landing.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/drawing.jpg'
import Left from '../assets/left.jpg'
import Right from '../assets/right.jpeg'
import { FaArrowDown, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


function Landing() {
    useEffect(() => {
        AOS.init();
      }, [])
  return (
    <div className="full-land">
        <div className="nav-land">
            <img className='nav-land-logo' src={Logo} alt="" />
            <div className="button-land">
                <Link to='/login'> Login</Link>
            </div>
        </div>
        <div className="full-land-1"  >
            <div className='land-desc' data-aos="fade-up" data-aos-duration="2000">

      
            <div className="land-text">
                Find Your Products and Sell Your Products

            </div>
            <p className='land-down-text'>When you buy, use your eyes and your mind, not your ears.</p>
            <div className="button-land button-land-2">
                 <Link to='/register'> Get Started</Link>
            </div>
            </div>
        <FaArrowDown className='land-down-arrow'/>

        </div>
        <div className="details1">
            <div className="float-left-land" data-aos="fade-up" data-aos-duration="2000">
                <div className="sell-your-product">
                    Sell Your Product
                </div>
                <div className="button-land">
                  <Link to='/login'>   Signin</Link>
            </div>
            </div>
            
                <img className='float-right-land-img' src={Left} alt="" data-aos="fade-down" data-aos-duration="2000"/>
            
        </div>
        <div className="details2">

            <img className='float-left-land-img' data-aos="fade-down" src={Right} alt="" data-aos-duration="2000"/>
          
            <div className="float-right-land" data-aos="fade-up" data-aos-duration="2000">
                <div className='sell-your-product'>
                    Find Your Product
                </div>
                <div className="button-land">
                <Link to='/login'>   Login</Link>
                </div>
                
            </div>
            
        </div>
        <div className="bottom-land">
            <div className="follow-land">
                <h4>Follow us on</h4>
                
            </div>
            <div className="follow-land-icons">
                <FaWhatsapp className='follow-land-icon'/>
                <FaTwitter className='follow-land-icon' />
                <FaInstagram className='follow-land-icon'/>
                <FaFacebook className='follow-land-icon'/>
            </div>
            <div className="copy-land">
            &#169; Copyright Regenerate(2023). All Rights Reserved
            </div>
        </div>  
    </div>
  )
}

export default Landing