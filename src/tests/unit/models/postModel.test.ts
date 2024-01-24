import PostModel from '../../../models/Post';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { postMock, postMockWithId, allPostMock, postChangeMock, postChangeMockWithId, postDeletedMockWithId } from '../../mocks/postMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Post Model', () => {
  const postModel = new PostModel();

  beforeAll(async () => {
    sinon.stub(Model, 'create').resolves([postMockWithId]);
    sinon.stub(Model, 'find').onCall(0).resolves(allPostMock).onCall(1).resolves([]);
    sinon.stub(Model, 'findOne').resolves(postMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(postChangeMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(postDeletedMockWithId);
  });

  afterAll(()=>{
    sinon.restore();
  })

  describe('creating a post', () => {
    test('successfully created', async () => {
      const newPost = await postModel.create(postMock);
      expect(newPost).toEqual([postMockWithId]);
    });
  });

  describe('searching all posts', () => {
    test('successfully found', async () => {
      const allPostsFound = await postModel.read();
      expect(allPostsFound).toStrictEqual(allPostMock);
    });

    test('if dont have posts, returns an empty list', async () => {
      const allPostsFound = await postModel.read();
      expect(allPostsFound).toEqual([]);
    });
  });

  describe('searching a post', () => {
    test('successfuly found', async () => {
      const postFound = await postModel.readOne(postMockWithId._id);
      expect(postFound).toBe(postMockWithId);
    });

    test('_id invalid', async () => {
      let error;

      try {
        await postModel.readOne('123ERRADO')
      } catch (err: any) {
        error = err.message
      }
      expect(error).toBe(ErrorTypes.InvalidMongoId)
    });
  });

  describe('changing a post', () => {
    it('successfully changed', async () => {
      const userChanged = await postModel.update(postChangeMockWithId._id, postChangeMock);

      expect(userChanged).toBe(postChangeMockWithId);
    })

    it('_id invalid', async () => {
      let error;

      try {
        await postModel.update('123ERRADO', postChangeMock);
      } catch (err: any) {
        error = err.message
      }

      expect(error).toBe(ErrorTypes.InvalidMongoId);
    })
  })

  describe('delete a post', () => {
    it('successfully delete', async () => {
      const userDeleted = await postModel.delete(postDeletedMockWithId._id);

      expect(userDeleted).toBe(postDeletedMockWithId);
    })

    it('_id invalid', async () => {
      let error;

      try {
        await postModel.delete('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).toBe(ErrorTypes.InvalidMongoId);
    })
  })

});
