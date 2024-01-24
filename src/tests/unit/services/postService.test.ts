import * as sinon from 'sinon';
import UserModel from '../../../models/User';
import PostModel from '../../../models/Post';
import PostService from '../../../services/Post';
import { userMockWithId } from '../../mocks/userMocks';
import {
  allPostMock,
  postChangeMock,
  postChangeMockWithId,
  postDeletedMockWithId,
  postMock,
  postMockWithId,
} from '../../mocks/postMocks';
import { ErrorTypes } from '../../../errors/catalog';
import { ZodError } from 'zod';

describe('Post Service', () => {
  const userModel = new UserModel();
  const postModel = new PostModel();
  const postService = new PostService(postModel, userModel);

  beforeAll(async () => {
    sinon.stub(postModel, 'create').resolves(postMockWithId);
    sinon.stub(userModel, 'readOne').onCall(0).resolves(userMockWithId).onCall(1).resolves(null).onCall(2).resolves(userMockWithId).onCall(3).resolves(null).onCall(4).resolves(userMockWithId);
    sinon.stub(postModel, 'read').onCall(0).resolves(allPostMock).onCall(1).resolves([])
    sinon.stub(postModel, 'readOne').onCall(0).resolves(postMockWithId).onCall(1).resolves(null);
    sinon.stub(postModel, 'update').onCall(0).resolves(postChangeMockWithId).onCall(1).resolves(null);
    sinon.stub(postModel, 'delete').onCall(0).resolves(postDeletedMockWithId).onCall(1).resolves(null);
  });

  afterAll(() => {
    sinon.restore();
  });

  describe('creating a post', () => {
    it('successfully created', async () => {
      const postCreated = await postService.create(postMock);

      expect(postCreated).toEqual(postMockWithId);
    });

    it('User not found', async () => {
      let error;
      try {
        await postService.create(postMock);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.UserNotFound);
    });

    it('Failure', async () => {
      let error;
      try {
        await postService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(ZodError);
    });
  });

  describe('searching all posts', () => {
    it('successfully found', async () => {
      const allPostsFound = await postService.read();

      expect(allPostsFound).toBe(allPostMock);
    });

    it('if dont have posts, returns an empty list', async () => {
      const allPostsFound = await postService.read();

      expect(allPostsFound).toEqual([]);
    });
  });

  describe('searching a post', () => {
    it('successfully found', async () => {
      const postFound = await postService.readOne(postMockWithId._id);

      expect(postFound).toBe(postMockWithId);
    });

    it('_id not found', async () => {

      let error;
      try {
        await postService.readOne(postMockWithId._id);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.PostNotFound);
    });
  });

  describe('changing a post', () => {
    it('successfully changed', async () => {
      const postChanged = await postService.update(postChangeMockWithId._id, postChangeMock);

      expect(postChanged).toBe(postChangeMockWithId);
    });

    it('User not found', async () => {
      let error;
      try {
        await postService.update(postChangeMockWithId._id, postChangeMock);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.UserNotFound);
    });

    it('_id not found', async () => {
      let error;
      try {
        await postService.update(postChangeMockWithId._id, postChangeMock);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.PostNotFound);
    });

    it('Failure', async () => {
      let error;
      try {
        await postService.update(postChangeMockWithId._id, {});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(ZodError);
    });
  });

  describe('delete a post', () => {
    it('successfully delete', async () => {
      const postDeleted = await postService.delete(postDeletedMockWithId._id);

      expect(postDeleted).toBe(postDeletedMockWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await postService.delete(postDeletedMockWithId._id);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.PostNotFound);
    });
  });
});
