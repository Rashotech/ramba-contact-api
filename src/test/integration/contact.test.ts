import request from "supertest";
import App from "../../app";
import setupTestDB from "../utils/setupDB.test";
import httpStatus from 'http-status';
import { IUserDocument } from '../../interfaces/user.interface';
import { insertContacts, insertContact, testContact, contactOne , contactTwo } from '../fixtures/contact.fixture';
import User from '../fixtures/user.fixture';
import { expect } from "chai";
import getAcessToken from '../fixtures/token.fixture';
import { IContact, } from '../../interfaces/contact.interface';

// Initiate Server
const app = new App().app;

// Set up Test Database
setupTestDB();

describe('Contact routes', () => {
    let newContact: IContact;
    let token: string;
    let user: IUserDocument;
    
    beforeEach(async() => {
        newContact = testContact;
        user = await User.insertUser(User.userOne);
        token = await getAcessToken(user._id);
    });

    describe('POST /api/contact', () => {
      it('should return 201 and successfully create a contact for a user if token is valid', async () => {
          const res = await request(app)
              .post('/api/contact')
              .set('Authorization', `Bearer ${token}`)
              .send(newContact)
              .expect(httpStatus.CREATED);
  
          expect(res.body).to.contains({ "success": true, "message": "Contact Created Successfully" });
      });
    });
  
    describe('GET /api/contact', () => { 
      it('should return 200 after getting all contacts created by a user', async () => {
          await insertContacts([contactOne, contactTwo], user._id);
          const res = await request(app)
              .get('/api/contact')
              .set('Authorization', `Bearer ${token}`)
              .expect(httpStatus.OK);
    
            expect(res.body).to.contains({ "success": true, "message": "Contacts fetched" });
            expect(res.body.data).to.an('array').that.is.not.empty;
      });
    });
  
    describe('GET /api/contact/:id', () => { 
        it('should return 200 after getting a single contact created by a user', async () => {
              await insertContacts([contactOne, contactTwo], user._id);
              const searchTerm = "Ola";
              const res = await request(app)
                  .get(`/api/contact/search?searchTerm=${searchTerm}`)
                  .set('Authorization', `Bearer ${token}`)
                  .expect(httpStatus.OK);
        
                  expect(res.body).to.contains({ "success": true, "message": "Contact fetched" });
                  expect(res.body.data).to.an('array').that.is.not.empty;
          });
    });

     describe('GET /api/contact/:id', () => { 
        it('should return 200 after searching for contact created by a user', async () => {
              const contact = await insertContact(contactOne, user._id);
              const res = await request(app)
                  .get(`/api/contact/${contact._id}`)
                  .set('Authorization', `Bearer ${token}`)
                  .expect(httpStatus.OK);
        
                  expect(res.body).to.contains({ "success": true, "message": "Contact fetched" });
                  expect(res.body.data).to.include(contactOne);
          });
    });
  
    describe('PATCH /api/contact/:id', () => { 
      it('should return 200 after editing a single contact created by a user', async () => {
        const contact = await insertContact(contactOne, user._id);  
        const res = await request(app)
            .patch(`/api/contact/${contact._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(contactTwo)
            .expect(httpStatus.OK);
    
            expect(res.body).to.contains({ "success": true, "message": "Contact Updated Successfully" });
            expect(res.body.data).to.include(contactTwo);
      });
    });

    describe('DELETE /api/contact/:id', () => { 
        it('should return 200 after deleting a single contact created by a user', async () => {
          const contact = await insertContact(contactOne, user._id);  
          const res = await request(app)
              .delete(`/api/contact/${contact._id}`)
              .set('Authorization', `Bearer ${token}`)
              .expect(httpStatus.OK);
      
              expect(res.body).to.contains({ "success": true, "message": "Contact Deleted Successfully", data: null });
        });
    });
  });