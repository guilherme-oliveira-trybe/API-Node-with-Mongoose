import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>(
  {
    displayName: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }
}

export default User;
