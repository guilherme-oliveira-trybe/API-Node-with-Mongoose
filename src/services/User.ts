import { IService } from '../interfaces/IService';
import UserZodSchema, { IUser } from '../interfaces/IUser';
import { IModel } from '../interfaces/IModel';

class UserService implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async create(obj: unknown): Promise<IUser> {
    const parsed = UserZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._user.create(parsed.data);
  }
}

export default UserService;
