import * as sinon from 'sinon';
import UserModel from '../../../models/User';
import UserService from '../../../services/User';
import UserController from '../../../controllers/User';
import { Request, Response } from 'express';
import {
  userMock,
  userMockWithId,
  allUsersMock,
  userChangeMock,
  userChangeMockWithId,
  userDeletedMockWithId,
} from '../../mocks/userMocks';

describe('User Controller', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    sinon.stub(userService, 'create').resolves(userMock);
    sinon.stub(userService, 'read').onCall(0).resolves(allUsersMock).onCall(1).resolves([]);
    sinon.stub(userService, 'readOne').resolves(userMockWithId);
    sinon.stub(userService, 'update').resolves(userChangeMock);
    sinon.stub(userService, 'delete').resolves(userDeletedMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('creating a user', () => {
    it('successfully created', async () => {
      req.body = userMock;
      await userController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(userMock)).toBeTruthy;
    });
  });

  describe('searching all users', () => {
    it('successfully found', async () => {
      await userController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(allUsersMock)).toBeTruthy;
    });

    it('if dont have users, returns an empty list', async () => {
      await userController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith([])).toBeTruthy;
    });
  });

  describe('searching a user', () => {
    it('successfully found', async () => {
      req.params = { id: userMockWithId._id };
      await userController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(userMockWithId)).toBeTruthy;
    });
  });

  describe('changing a user', () => {
    it('successfully changed', async () => {
      req.body = userChangeMock;
      req.params = { id: userChangeMockWithId._id };
      await userController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy;
      expect((res.json as sinon.SinonStub).calledWith(userChangeMockWithId)).toBeTruthy;
    });
  });

  describe('delete a user', () => {
    it('successfully delete', async () => {
      req.params = { id: userDeletedMockWithId._id };
      await userController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).toBeTruthy;
      expect((res.end as sinon.SinonStub).calledWith()).toBeTruthy;
    });
  });
});
