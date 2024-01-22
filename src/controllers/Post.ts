import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IPost } from '@src/interfaces/IPost';

class PostController {
  private _service: IService<IPost>;

  constructor(service: IService<IPost>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<IPost>) {
    const result = await this._service.create(req.body);

    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<IPost[]>) {
    const results = await this._service.read();

    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IPost>) {
    const result = await this._service.readOne(req.params.id);

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IPost>) {
    const result = await this._service.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IPost>) {
    await this._service.delete(req.params.id);

    return res.status(204).end();
  }
}

export default PostController;
