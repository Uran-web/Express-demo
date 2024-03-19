import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  author: string;
  comment: string;
  createdAt: Date;
  avatar: {
    url: string;
  };
}

export interface IPost {
  author: string;
  description: string;
  likes: number;
  comments: IComment[];
  createdAt: Date;
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    maxLength: [100, 'Max length is 100'],
    validate: {
      validator: function (name: string) {
        return /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]$/.test(name);
      },
      message: (props) => `'${props.path}' field should contain only letters`,
    },
  },
  description: {
    type: String,
    required: [true, 'The field should have at least one word'],
    maxLength: [1000, 'Max length is 1000 characters'],
  },
  likes: {
    type: Number,
  },
  comments: {
    author: String,
    comment: String,
    createdAt: Date,
    avatar: {
      url: String,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.set('validateBeforeSave', true);

export default mongoose.models.Post ||
  mongoose.model<IPost>('Post', postSchema);
