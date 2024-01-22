import { Router } from 'express';
import UserModel from '../models/User';
import PostModel from '../models/Post';
import PostService from '../services/Post';
import PostController from '../controllers/Post';

const route = Router();

const postModel = new PostModel();
const userModel = new UserModel();
const postService = new PostService(postModel, userModel);
const postController = new PostController(postService);

const routePostById = '/posts/:id';

route.post('/posts', (req, res) => postController.create(req, res));
route.get('/posts', (req, res) => postController.read(req, res));
route.get(routePostById, (req, res) => postController.readOne(req, res));
route.put(routePostById, (req, res) => postController.update(req, res));
route.delete(routePostById, (req, res) => postController.delete(req, res));

export default route;
