import bcrypt from 'bcrypt';
import { IUser } from '../../interfaces/user.interface';
import User from '../../models/user.model';

const password = 'test1245678';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
    email: "test1@gmail.com",
    username: "Test1test",
    password
};

const userTwo = {
    email: "test2@gmail.com",
    username: "Test2test",
    password
};

const testUser = {
    email: "testuser@gmail.com",
    username: "testuserss",
    password
};

const insertUsers = async (users: IUser[]) => {
    await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })))
};

const insertUser = async (user: IUser) => {
    const result = await User.create(user);
    return result;
};

export default {
  userOne,
  testUser,
  userTwo,
  insertUser,
  insertUsers,
};