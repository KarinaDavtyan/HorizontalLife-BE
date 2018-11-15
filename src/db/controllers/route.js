require('dotenv').config()

import { idToString } from '../../helpers';
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGO_DB_LOCAL;
const dbName = process.env.DB_NAME;

const createRoute = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');
    const gyms = db.collection('gyms');

    const { name, grade_routesetter, img_url, svg_color, svg_type, svg, tags, gym_id } = data;

    const route = await routes.insertOne({
      name,
      grade_routesetter,
      img_url,
      svg_color,
      svg_type,
      svg,
      tags,
      gym_id: new ObjectId(gym_id)
    })
    if (route.insertedId) {
      const targetGym = await gyms.updateOne(
        { _id: new ObjectId(gym_id) },
        { $push: { routes: new ObjectId(route.insertedId) } }
      )
      if (targetGym.modifiedCount > 0) {
        const res = {
          ...data,
          _id: route.insertedId.toString()
        };
        return res;
      } else {
        console.error('route wasnt appended to gym');
      }
    } else {
      return;
    }
  } catch (err) {
    console.error(err.stack);
  }
  client.close();
}

const getRoute = async (data) => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const route = await routes.findOne({
      _id: new ObjectId(data._id)
    })
    if (route) {
      route._id = route._id.toString();
      return route
    } else {
      return;
    }
  } catch (err) {
    //eslint-disable-next-line
      console.log(err.stack);
  }
  client.close();
}

const getAllRoutes = async () => {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const routesArray = await routes.find().toArray();
    const routesWithStrID = routesArray.map(idToString);
    return routesWithStrID;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

module.exports = {
  createRoute,
  getRoute,
  getAllRoutes
}
