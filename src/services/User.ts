import { IService } from '../interfaces/IService';
import UserZodSchema, { IUser } from '../interfaces/IUser';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class UserService implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async create(obj: unknown): Promise<IUser> {
    const parsed = UserZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const users = await this._user.read();

    const isRepeatEmail = users?.some(({ email }) => email === parsed.data.email);

    if (isRepeatEmail) throw new Error(ErrorTypes.RepeatedEmail);

    return this._user.create(parsed.data);
  }

  public async readOne(_id: string): Promise<IUser> {
    const user = await this._user.readOne(_id);

    if (!user) throw new Error(ErrorTypes.EntityNotFound);

    return user;
  }
}

export default UserService;
