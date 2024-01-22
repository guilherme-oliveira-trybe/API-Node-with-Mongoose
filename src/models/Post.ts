import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { IPost } from '@src/interfaces/IPost';

const postMongooseSchema = new Schema<IPost>(
  {
    title: String,
    content: String,
    userId: String,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'published',
      updatedAt: 'updated',
    },
  }
);

class Post extends MongoModel<IPost> {
  constructor(model = mongooseCreateModel('Post', postMongooseSchema)) {
    super(model);
  }
}

export default Post;
