import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = await MongoMemoryServer.create();
export default {
    connect: async () => {
        await mongoose.connect(mongoServer.getUri(), { dbName: "MASTER" });
    },
    disconnect: async () => {
        await mongoose.disconnect();
    }
}