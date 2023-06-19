import React from 'react'
import '../Styles/Profile.css';
import { FaUser } from 'react-icons/fa';
function Profile() {
    const gmail = localStorage.getItem('gmail');
    const name=localStorage.getItem('name');
  return (
    <div className='full-prof'>

        <div className="grid-prof">

                <div className="left-prof">
                    

                    <div className="lefts-prof">
                     <h1 className='prof-prof'>Profile</h1>
                    <div className="userprof">
                        <FaUser className='user-img-prof'/>
                    </div>
                    </div>
                    <div className="rights-prof"> 
                    <p className='text-prof'> {name}</p>
                    <p className='text-prof'> {gmail}</p>
                    {/* <p className='text-prof'>Mohan Krishna</p> */}
                </div>  
                </div>  
        </div>
    </div>
  )
}

export default Profile