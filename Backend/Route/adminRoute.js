import express from 'express' ; 
import { loginAdmin , fetchUsers, updateUser , addUser , deleteUser } from '../controllers/adminController.js';
import { verifyToken } from '../Middleware/auth.js';

const adminRoute = express.Router();

adminRoute.post('/login',loginAdmin);
adminRoute.get('/usersData',verifyToken,fetchUsers);
adminRoute.patch('/updateUsers/:id',verifyToken,updateUser);
adminRoute.post('/addUser',verifyToken,addUser) ;
adminRoute.get('/deleteUser/:id',verifyToken,deleteUser) ;

export default adminRoute ; 