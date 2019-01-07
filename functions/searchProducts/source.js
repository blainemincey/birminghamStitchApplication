/**
*  To test, use exports('productNameArgument') in console
*/
exports = function(arg){
  var inventoryCollection = context.services.get("mongodb-atlas").db("myInventoryDatabase").collection("inventory");
  var searchProductArg = arg;
  
  console.log("searchProductFunction with arg: " + searchProductArg);
  
  return inventoryCollection.find({"productName":searchProductArg}).toArray();
};