const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function(){
      client.close();
    });
});

const insertDocuments = function (db, callback) {
  const collection = db.collection("fruits");

  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great Fruit",
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour",
      }
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3,result.insertedCount);
      assert.equal(3,Object.keys(result.insertedIds).length);
      console.log("Done!!");
      callback(result);
    }
  );
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}