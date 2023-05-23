db.students.insertMany( [
   { sID: 22001, name: "Alex", year: 1, score: 4.0 },
   { sID: 21001, name: "bernie", year: 2, score: 3.7 },
   { sID: 20010, name: "Chris", year: 3, score: 2.5 },
   { sID: 22021, name: "Drew", year: 1, score: 3.2 },
   { sID: 17301, name: "harley", year: 6, score: 3.1 },
   { sID: 21022, name: "Farmer", year: 1, score: 2.2 },
   { sID: 20020, name: "george", year: 3, score: 2.8 },
   { sID: 18020, name: "Harley", year: 5, score: 2.8 },
] )


db.inventory.insertMany( [
   { prodId: 100, price: 20, quantity: 125 },
   { prodId: 101, price: 10, quantity: 234 },
   { prodId: 102, price: 15, quantity: 432 },
   { prodId: 103, price: 17, quantity: 320 }
] )


db.orders.insertMany( [
   { orderId: 201, custid: 301, prodId: 100, numPurchased: 20 },
   { orderId: 202, custid: 302, prodId: 101, numPurchased: 10 },
   { orderId: 203, custid: 303, prodId: 102, numPurchased: 5 },
   { orderId: 204, custid: 303, prodId: 103, numPurchased: 15 },
   { orderId: 205, custid: 303, prodId: 103, numPurchased: 20 },
   { orderId: 206, custid: 302, prodId: 102, numPurchased: 1 },
   { orderId: 207, custid: 302, prodId: 101, numPurchased: 5 },
   { orderId: 208, custid: 301, prodId: 100, numPurchased: 10 },
   { orderId: 209, custid: 303, prodId: 103, numPurchased: 30 }
] )

db.students.aggregate(
  { $filter: { name : { $eq : "alex" } } }
);