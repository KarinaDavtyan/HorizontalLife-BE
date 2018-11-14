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

        const { name, grade_routesetter, img_url, svg_color, svg_type, svg, tags } = data;

        const route = await routes.insertOne({
            name,
            grade_routesetter,
            img_url,
            svg_color,
            svg_type,
            svg,
            tags
        })

        if (route.insertedId) {
            const res = Object.assign({ _id: route.insertedId.toString() }, data)
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

const deleteRoute = async (_id) => {
    let client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbName);
        const routes = db.collection('routes');

        const deletedRoute = await routes.deleteOne({
            _id: new ObjectId(_id)
        })
        if (deletedRoute.deletedCount > 0) {
            return _id
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
