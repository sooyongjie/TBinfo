const mongodb = require('mongodb');
const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient } = require('mongodb');
const uri =
  "mongodb+srv://admin:poopandpee@cluster.iwap9.gcp.mongodb.net/db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  client.close();
});
