import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import UserModel from '../../../models/User';
import { userMock, userMockWithId } from '../../mocks/userMocks';

const { expect } = chai;

describe('User Model', () => {
  const userModel = new UserModel()

  before(async () => {
    sinon.stub(Model, 'create').resolves([userMockWithId]);
  })

  after(() => {
    sinon.restore();
  })

  describe('creating an user', () => {
    it('successfully created', async () => {
      const newUser = await userModel.create(userMock);

      expect(newUser).to.be.deep.equal(userMockWithId);
    })
  })
})