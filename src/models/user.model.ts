import mongoose, { Model } from "mongoose";

enum UserKind {
  ADMIN = "Admin",
  USER = "User",
}

interface IUser {
  username: string;
  email: string;
  password: string;
  kind: UserKind;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    kind: {
      type: String,
      enum: Object.values(UserKind),
      default: UserKind.USER,
    },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
