/**
 * Function to insert new Product
 **/
exports = function(payload) {
  
  console.log("Inserting product.");
  
  var payloadObject = EJSON.parse(payload.body.text());
  
  // connect to the atlas service    
  var mongodb = context.services.get("mongodb-atlas");
  var inventoryCollection = mongodb.db("myInventoryDatabase").collection("inventory");
  
  var priceAsNumber = Number(payloadObject.price);
  var availAsNumber = Number(payloadObject.available);
  
  
  var query =
  {
    "color"       : payloadObject.color,
    "department"  : payloadObject.department,
    "productName" : payloadObject.productName,
    "price"       : BSON.Double(priceAsNumber),
    "available"   : BSON.Int32(availAsNumber),
    "sku"         : payloadObject.sku
  };
  
  
  return inventoryCollection
    .insertOne(query)
    .then(result => {
      const { insertedId } = result;
      // Do something with the insertedId
      return `Inserted product with _id: ${insertedId}`;
   });
};