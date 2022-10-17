import mongoose from 'mongoose';
import configs from '../../config/constant';

const setupTestDB = () => {
  before(async () => {
    await mongoose.connect(configs.db.test);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})));
  });

  after(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;