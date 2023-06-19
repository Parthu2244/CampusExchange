import React from 'react'

function PostForm() {
  return (
    <div>
        <h1>hi</h1>
        <form> 
            <h2>Post An Item</h2>
            <div className='item-pst-fm'>
                <input type="text" placeholder='enter name of the Product' />
               <input type="text" placeholder='enter Company Name of the Product' />
            </div>
            <div className='item-pst-fm'>
                 <input    type="number" name="number" id=""  placeholder='please enter mobile Number'/>
                <input type="file" id="image"   accept="image/*" required  placeholder='please upload image'/>
            </div>
            <div className='item-pst-fm'>
                <textarea id="reason"    required  placeholder='please enter reason for selling'></textarea>
                 <input type="number" id="price"     required placeholder='enter price of the Product'/>
            </div>
            <button type="submit">Submit </button>
            </form>
    </div>
  )
}

export default PostForm