import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IUser } from '../interfaces/IUser';

class UserController {
  private _service: IService<IUser>;

  constructor(service: IService<IUser>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<IUser>) {
    const result = await this._service.create(req.body);

    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<IUser[]>) {
    const results = await this._service.read();

    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IUser>) {
    const result = await this._service.readOne(req.params.id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IUser>) {
    const result = await this._service.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IUser>) {
    await this._service.delete(req.params.id);

    return res.status(204).end();
  }
}

export default UserController;
