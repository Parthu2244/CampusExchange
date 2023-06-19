
const express=require('express');
const router=express.Router();
const {Login,Register,Reset,verifyEmail,Forgotpassword}=require('../Controllers/main')
 

const {Products,Sendproducts,GetProductDetails,ProductDeleteitem,MyproductsItems}=require('../main/Itemroutes')



router.post('/main',Products);
router.get('/main',Sendproducts);
router.post('/main/getproduct',GetProductDetails);
router.delete('/main/delete/:id',ProductDeleteitem);
router.post('/main/products',MyproductsItems)

router.post('/login',Login);
router.post('/register',Register)
router.post('/reset-password',Reset);
router.post('/verifygmail', verifyEmail);
router.post('/forgot-password',Forgotpassword);




 
 
module.exports = router;