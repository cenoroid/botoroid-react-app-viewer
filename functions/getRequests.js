"use strict"
const MongoClient = require("mongodb").MongoClient
const MONGODB_URI = process.env.MONGODB_URI // or Atlas connection string
let cachedDb = null
function connectToDatabase(uri) {
  console.log("=> connect to database")
  if (cachedDb) {
    console.log("=> using cached database instance")
    return Promise.resolve(cachedDb)
  }
  return MongoClient.connect(uri).then((db) => {
    cachedDb = db
    return cachedDb
  })
}
function getRequests(db) {
  console.log("=> get requests")
  return db
    .collection("requests")
    .find(
      {},
      {
        projection: { _id: 0 },
      }
    )
    .toArray()
    .then((result) => {
      return { statusCode: 200, body: result }
    })
    .catch((err) => {
      console.log("=> an error occurred: ", err)
      return { statusCode: 500, body: "error" }
    })
}
module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log("event: ", event)
  connectToDatabase(MONGODB_URI)
    .then((db) => getRequests(db))
    .then((result) => {
      console.log("=> returning result: ", result)
      callback(null, result)
    })
    .catch((err) => {
      console.log("=> an error occurred: ", err)
      callback(err)
    })
}