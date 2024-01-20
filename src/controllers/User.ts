import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IUser } from '../interfaces/IUser';

class UserController {
  private _service: IService<IUser>;

  constructor(service: IService<IUser>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<IUser>) {
    const results = await this._service.create(req.body);

    return res.status(201).json(results);
  }
}

export default UserController;
