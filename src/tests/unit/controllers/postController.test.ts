import * as sinon from 'sinon';
import UserModel from '../../../models/User';
import PostModel from '../../../models/Post';
import PostService from '../../../services/Post';
import PostController from '../../../controllers/Post';
import { Request, Response } from 'express';
import {
  allPostMock,
  postChangeMock,
  postChangeMockWithId,
  postDeletedMockWithId,
  postMock,
  postMockWithId,
} from '../../mocks/postMocks';

describe('Post Controller', () => {
  const userModel = new UserModel();
  const postModel = new PostModel();
  const postService = new PostService(postModel, userModel);
  const postController = new PostController(postService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    sinon.stub(postService, 'create').resolves(postMock);
    sinon.stub(postService, 'read').onCall(0).resolves(allPostMock).onCall(1).resolves([]);
    sinon.stub(postService, 'readOne').resolves(postMockWithId);
    sinon.stub(postService, 'update').resolves(postChangeMock);
    sinon.stub(postService, 'delete').resolves(postDeletedMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('creating a post', () => {
    it('successfully created', async () => {
      req.body = postMock;
      await postController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(postMock)).toBeTruthy;
    });
  });

  describe('searching all posts', () => {
    it('successfully found', async () => {
      await postController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(allPostMock)).toBeTruthy;
    });

    it('if dont have pots, returns an empty list', async () => {
      await postController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith([])).toBeTruthy;
    });
  });

  describe('searching a post', () => {
    it('successfully found', async () => {
      req.params = { id: postMockWithId._id };
      await postController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(postMockWithId)).toBeTruthy;
    });
  });

  describe('changing a post', () => {
    it('successfully changed', async () => {
      req.body = postChangeMock;
      req.params = { id: postChangeMockWithId._id };
      await postController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(postChangeMockWithId)).toBeTruthy;
    });
  });

  describe('delete a post', () => {
    it('successfully delete', async () => {
      req.params = { id: postDeletedMockWithId._id };
      await postController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).toBeTruthy;
      expect((res.end as sinon.SinonStub).calledWith()).toBeTruthy;
    });
  });
});
