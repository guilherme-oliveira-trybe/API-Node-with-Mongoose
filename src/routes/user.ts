import { Router } from 'express';
import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';

const route = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

route.post('/users', (req, res) => userController.create(req, res));

export default route;
