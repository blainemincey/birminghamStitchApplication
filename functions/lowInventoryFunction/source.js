exports = function(changeEvent) {
  console.log("Low Inventory Function Trigger Invoked.");
  
  // grab vars from the trigger document.
  var docId = changeEvent.documentKey._id.toString(); // convert object id to string as an example
  var fullDocument = changeEvent.fullDocument;
  
  // Example logic.
  if(changeEvent.operationType == "insert") {
    console.log("Insert operation.");
  }
  
  // Replace happens when updating thru MongoDB Compass
  if(changeEvent.operationType == "replace") {
    console.log("Replace operation - possibly from MongoDB Compass.");
  }
  
  if(fullDocument.available === 0){
    console.log("Zero of product available. Reorder.");
    var timeStamp = new Date().toString();
    
    // Access the MongoDB Atlas service
    var collection = context.services.get("mongodb-atlas").db("myInventoryDatabase").collection("orderNewInventory");
    
    var query = {"productId":docId, "productName":fullDocument.productName, "currentAvailable":0,"date":timeStamp};
    return collection
        .insertOne(query)
        .then(result => {
          const {insertedId} = result;
          return 'Inserted product to be re-ordered with _id: ${inserted}';
        });
  }
};
