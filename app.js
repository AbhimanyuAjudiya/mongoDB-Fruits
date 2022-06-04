const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url);

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

// For mongoose

// const mongoose = require('mongoose');
 
// main().catch(err => console.log(err));
 
// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/fruitsDB');
// }
 
// const fruitSchema = new mongoose.Schema ({
// 	name: String,
// 	rating: Number,
// 	review: String
// })
 
// const Fruit = new mongoose.model ("Fruit", fruitSchema)
 
// const kivi = new Fruit ({
// 	name: "Kivi",
// 	rating: 10,
// 	review: "Best fruit!"
// })
// const orange = new Fruit ({
// 	name: "Orange",
// 	rating: 4,
// 	review: "Too sour for me"
// })
// const banana = new Fruit ({
// 	name: "Banana",
// 	rating: 3,
// 	review: "Not bad"
// })
 
// Fruit.insertMany([kivi, orange, banana], function(err){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Done!!");
// 	}
// });

// Fruit.find(function(err,fruits){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close(); // forEach is used as for loop 
// 		fruits.forEach(fruit => {
// 			console.log(fruit.name);
// 		});
// 	}
// })
