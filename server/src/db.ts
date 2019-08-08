import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { User } from './models/user';
import { resolve } from 'url';
import { Entry } from './models/entry';

export default async function startDB(app: Express) {
  // const url = 'mongodb://stu-fb09-546:27017/';
  const url = 'mongodb://mongodb:27017/myDB';
  // const options = {
  //   useNewUrlParser: true,
  //   auth: { user: 'Marius', password: 'Marius' },
  //   authSource: 'myDB'
  // };
  try {
    const client = await MongoClient.connect(url);
    const db = client.db('myDB');
    app.locals.entryDAO = new MongoGenericDAO<Entry>(db, 'entries');
  }catch(err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }

}
