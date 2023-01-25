import { model, Schema, Types } from "mongoose";
export interface IUser {
    _id: Types.ObjectId,
    firstName?: string,
    familyName?: string,
    email?: string,
    password?: string,
    subscriptionDate?: Date
};
const UserModel = model('user',new Schema<IUser>({
    firstName: {type: String},
    familyName: {type: String},
    email: {type: String},
    password: {type: String},
    subscriptionDate: {type: Date, default: new Date(Date.now())}
}));

export default UserModel;