import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import PostZodSchema, { IPost } from '../interfaces/IPost';
import { IUser } from '../interfaces/IUser';

class PostService implements IService<IPost> {
  private _post: IModel<IPost>;

  private _user: IModel<IUser>;

  constructor(model: IModel<IPost>, userModel: IModel<IUser>) {
    this._post = model;
    this._user = userModel;
  }

  public async create(obj: unknown): Promise<IPost> {
    const parsed = PostZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const user = await this._user.readOne(parsed.data.userId);

    if (!user) throw new Error(ErrorTypes.UserNotFound);

    return this._post.create(parsed.data);
  }

  public async read(): Promise<IPost[]> {
    const posts = await this._post.read();

    return posts;
  }

  public async readOne(_id: string): Promise<IPost> {
    const post = await this._post.readOne(_id);

    if (!post) throw new Error(ErrorTypes.PostNotFound);

    return post;
  }

  public async update(_id: string, obj: unknown): Promise<IPost> {
    const parsed = PostZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const user = await this._user.readOne(parsed.data.userId);

    if (!user) throw new Error(ErrorTypes.UserNotFound);

    const postUpdated = await this._post.update(_id, parsed.data);

    if (!postUpdated) throw new Error(ErrorTypes.PostNotFound);

    return postUpdated;
  }

  public async delete(_id: string): Promise<IPost> {
    const postDeleted = await this._post.delete(_id);

    if (!postDeleted) throw new Error(ErrorTypes.PostNotFound);

    return postDeleted;
  }
}

export default PostService;
