import { Router } from "express";
import { createUser, getAllUsers,updateUserByEmail,deleteUserByEmail,findUserById } from "../controllers/userController";

const router = Router();

router.post('/users',createUser);
router.get('/users',getAllUsers);
router.put('/users/:email', updateUserByEmail); // Route for updating user by email
router.delete('/users/:email', deleteUserByEmail); // Route for deleting user by email
router.get('/users/:id', findUserById); // Route for finding user by ID

export default router;