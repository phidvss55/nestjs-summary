-- Dataset
-- INSET 
db.students.insertOne({ sID: 22001, name: "Alex", year: 1, score: 4.0 })
db.students.insertMany( [
   { sID: 22001, name: "Alex", year: 1, score: 4.0 },
   { sID: 21001, name: "bernie", year: 2, score: 3.7 },
   { sID: 20010, name: "Chris", year: 3, score: 2.5 },
   { sID: 22021, name: "Drew", year: 1, score: 3.2 },
   { sID: 17301, name: "harley", year: 6, score: 3.1 },
] )

db.inventory.insertMany( [
   { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
   { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
   { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
   { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);

-- QUERY DOCUMENT
db.students.find()
db.students.find({ score: { $lt: 3  }})
db.students.find({ $or: [{ year: 1 }, { score: { $gt: 3 } }]})

db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )
db.inventory.find( { item: null } ) -- either item is null or not exist item field 
db.inventory.find( { item : { $exists: false } } ) -- not contain item field


-- UPDATE
db.students.updateOne({ name: 'Student' }, { $set: { name: 'Student one' } })
db.students.updateOne( { _id: 3 }, [ { $set: { "test3": 98, modified: "$$NOW"} } ] )
db.students2.updateMany( {},
  [
    { $replaceRoot: { newRoot:
       { $mergeObjects: [ { quiz1: 0, quiz2: 0, test1: 0, test2: 0 }, "$$ROOT" ] }
    } },
    { $set: { modified: "$$NOW"}  }
  ]
)
--
db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)


-- DELETE
db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } )

db.inventory.deleteMany({}) -- Delete all the document
db.inventory.deleteMany({ status : "A" })
-- db.students.aggregate(
--   { $filter: { name : { $eq : "alex" } } }
-- );