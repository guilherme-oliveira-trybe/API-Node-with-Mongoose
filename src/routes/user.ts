import { Router } from 'express';
import UserController from '../controllers/User';
import UserService from '../services/User';
import UserModel from '../models/User';

const route = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

const routeUserById = '/users/:id';

route.post('/users', (req, res) => userController.create(req, res));
route.get(routeUserById, (req, res) => userController.readOne(req, res));
route.put(routeUserById, (req, res) => userController.update(req, res));
route.delete(routeUserById, (req, res) => userController.delete(req, res));

export default route;
