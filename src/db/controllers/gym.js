require('dotenv').config()
const { idToString } = require('../../helpers');
const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_DB_LOCAL;
const dbName = process.env.DB_NAME;

const createGym = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const gyms = db.collection('gyms');

    const {
      name,
      img_url,
      lat,
      lon,
      grade_min,
      grade_max,
      menu,
      timetable, 
      facilities
    } = data;
    const routes = data.routes || [];

    const gym = await gyms.insertOne({
      name,
      img_url,
      lat,
      lon,
      grade_min,
      grade_max,
      routes,
      menu,
      timetable,
      facilities,
    })

    if (gym.insertedId) {
      const res = {
        ...data,
        _id: gym.insertedId.toString()
      };

      return res;
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
      console.log(err.stack);
  }
  client.close();
}

const getGym = async (data) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const gyms = db.collection('gyms');

    try {
      //populate route references
      const gym = await gyms.aggregate([
        { $match: { _id: new ObjectId(data._id) } },
        {
          $lookup: {
            from: 'routes',
            localField: 'routes',
            foreignField: '_id',
            as: 'routes'
          }
        }
      ]).toArray();
      return gym[0];

    } catch (e) {
      console.error(e);
    }
  } catch (err) {
    console.error(err.stack);
  }
  client.close();
}

const getAllGyms = async () => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const gyms = db.collection('gyms');

    const gymsArray = await gyms.find().toArray();
    const gymWithStrID = gymsArray.map(idToString);
    return gymWithStrID;
  } catch (err) {
    console.error(err.stack);
  }
  client.close();
}

module.exports = {
  createGym,
  getGym,
  getAllGyms
}
