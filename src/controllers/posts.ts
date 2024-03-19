import { Request, Response } from 'express';
import mongoose from 'mongoose';
import postModel, { IPost } from '../models/post.model.ts';
import { errorHandler } from '../helpers/errorHandler.ts';

const getPostsHandler = async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(req);
  }
  try {
    const posts = await postModel.find({}).limit(50);

    res.send(posts).status(200);
  } catch (err) {
    res.send('Server error').status(500);
  }
};

const postSinglePostHandler = async (req: Request, res: Response) => {
  try {
    const body: IPost = await req.body;
    const post = await postModel.create(body);
    res.send(post).status(204);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const simplifyErrorObject = errorHandler(err.errors);
      res
        .status(400)
        .send({ error: 'Validation failed', details: simplifyErrorObject });
    } else {
      res.status(500).send('Server error occur');
    }
  }
};

const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const { postId } = await req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      res.status(404).send('Post not found');
    }

    await post.deleteOne();
    res.json({ message: 'Post was successfully deleted' }).status(202);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const simplifyErrorObject = errorHandler(err.errors);
      res
        .status(400)
        .send({ error: 'Validation failed', details: simplifyErrorObject });
    } else {
      res.send('Something went wrong...').status(500);
    }
  }
};

export { getPostsHandler, postSinglePostHandler, deletePostHandler };
