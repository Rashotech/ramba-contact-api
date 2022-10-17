import request from "supertest";
import App from "../../app";
import setupTestDB from "../utils/setupDB.test";
import httpStatus from 'http-status';
import { IUser } from '../../interfaces/user.interface';
import User from '../fixtures/user.fixture';
import { expect } from "chai";

// Initiate Server
const app = new App().app;

// Set up Test Database
setupTestDB();

describe('Auth routes', () => {
  describe('POST /api/user/signup', () => {
    let newUser: IUser;
    beforeEach(() => {
      newUser = User.testUser
    });

    it('should return 201 and successfully sign up a user if request data is ok', async () => {
      const res = await request(app).post('/api/user/signup').send(newUser).expect(httpStatus.CREATED);
      expect(res.body.message).to.equal("Registration successful");
    });

    it('should return 400 error if email or username is already used', async () => {
      await User.insertUsers([User.userOne]);
      newUser.email = User.userOne.email;

      await request(app).post('/api/user/signup').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    it('should return 422 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app).post('/api/user/signup').send(newUser).expect(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return 422 error if password length is less than 6 characters', async () => {
      newUser.password = 'pas1';

      await request(app).post('/api/user/signup').send(newUser).expect(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe('POST /api/user/signin', () => {
    it('should return 200 and login user if username and password match', async () => {
      await User.insertUsers([User.userOne]);
      const loginCredentials = {
        username: User.userOne.username,
        password: User.userOne.password,
      };

      const res = await request(app).post('/api/user/signin').send(loginCredentials).expect(httpStatus.OK);
      expect(res.body).to.contains({ success: true, message: 'Login successful' });
    });

    it('should return 401 error if password is wrong', async () => {
      await User.insertUsers([User.userOne]);
      const loginCredentials = {
        username: User.userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app).post('/api/user/signin').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);
      expect(res.body).to.contains({ success: false, message: 'Incorrect credentials' });
    });
  });
});