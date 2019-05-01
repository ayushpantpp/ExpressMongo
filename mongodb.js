// //insert update delete
// const { MongoClient, ObjectId } = require('mongodb')
// const connectionUrl = 'mongodb://127.0.0.1:27017'
// const databaseName = "task-manager"

// const id = new ObjectId();
// console.log(id)
// MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
//   if(error ){
//     return console.log('Not connected')
//   }

//   console.log('connected')
//   const db = client.db(databaseName)
//   // db.collection('users').insertOne({
//   //   name: 'Ayush One',
//   //   age: 29
//   // },(error , results) => {
//   //   if(error){
//   //     return console.log('not inserted')
//   //   }
//   //   console.log(results.ops)
//   // })
//   // db.collection('tasks').insertMany([
//   //     {
//   //       description: 'Ayush One',
//   //       completed: true
//   //     },
//   //     {
//   //       description: 'Ayush Two',
//   //       completed: false
//   //     }
//   //   ],(error , results) => {
//   //   if(error){
//   //     return console.log('not inserted')
//   //   }
//    //   console.log(results.ops)
//   // })

//   // db.collection('tasks').findOne({
//   //   _id: new ObjectId("5cc84abd453f9027d0d901c8")
//   // },(error, task) => {
//   //   console.log(task)
//   // })

//   db.collection('users').updateOne({
//     _id: new ObjectId("5cc812c4b7d0777c4e569afc")
//   }, {
//     $set: {
//       name: "Pant"
//     }
//   }).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })
  
// })
