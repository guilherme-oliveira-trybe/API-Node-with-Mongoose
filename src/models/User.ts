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

// solução retirada de: https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu
// user => Ikbel
userMongooseSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const modifiedRet = { ...ret };
    delete modifiedRet.password;

    return modifiedRet;
  },
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }
}

export default User;
