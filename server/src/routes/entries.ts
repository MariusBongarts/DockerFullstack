
import { Entry } from './../models/entry';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import uuid = require('uuid');

const router = express.Router();

let mockEntries: Entry[] = [
  { id: uuid(),createdAt: new Date().getMilliseconds(), title: 'Termin1', startDate: new Date(2019, 6, 22), endDate: new Date(2019, 6, 31) },
  { id: uuid(),createdAt:new Date().getMilliseconds(), title: 'Termin2', startDate: new Date(2019, 6, 2), endDate: new Date(2019, 6, 4) },
  { id: uuid(),createdAt: new Date().getMilliseconds(), title: 'Termin3', startDate: new Date(2019, 6, 2), endDate: new Date(2019, 6, 8) },
  { id: uuid(),createdAt: new Date().getMilliseconds(), title: 'Termin4', startDate: new Date(2019, 6, 2), endDate: new Date(2019, 6, 8) },
  { id: uuid(),createdAt: new Date().getMilliseconds(), title: 'Termin5', startDate: new Date(2019, 7, 2), endDate: new Date(2019, 7, 9) }
]

router.get('/', async (req, res) => {
  const entryDAO: MongoGenericDAO<Entry> = req.app.locals.entryDAO;

  const entries = await entryDAO.findAll();

  if (!entries.length) {
    mockEntries.forEach(async (entry) => {
      await entryDAO.create(entry);
    })
  }
  res.send(entries);
});

export default router;