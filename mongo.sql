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

-- UPDATE
db.my_collections.updateOne({ name: 'Student' }, { ... $set: { name: 'Student one' } })


-- DELETE
db.students.aggregate(
  { $filter: { name : { $eq : "alex" } } }
);