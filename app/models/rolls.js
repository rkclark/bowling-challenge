function Rolls() {
}

Rolls.prototype.getCollection = function(req){
  var getCollectionPromise = new Promise(function(resolve,reject){
    var collection = req.db.get('rolls');
    if (collection) {
      resolve(collection);
    } else {
      reject(Error("Cannot find collection"))
    }
  });
  return getCollectionPromise;
}

// Rolls.prototype.getRolls = function(req, sessionID){
//   var that = this;
//
//   this.getCollection(req).then(function(result){
//     result.find({'sessionID' : sessionID}, function(err,result){
//       var rolls = []
//       if (err) {
//         console.log("Error on find rolls:");
//         console.log(err);
//       } else {
//         console.log("Succesfully found rolls collection")
//         if (result[0].rolls){
//           rolls = result[0].rolls
//         }
//       }
//       console.log('Rolls in rolls model is');
//       console.log(rolls);
//       return rolls;
//     });
//   });
// };

Rolls.prototype.updateRolls = function(req, sessionID){
  var that = this;
  var roll = req.body.roll;

  this.getCollection(req).then(function(result){
    result.update({'sessionID' : sessionID},
                           { $push: { rolls: roll }},
                           {upsert:true},
                            function(err, doc){
                              if (err) {
                                console.log("POST /rolls Error on update rolls collection:");
                                console.log(err);
                              } else {
                                console.log("POST /rolls Succesfully updated rolls collection")
                                console.log(doc);
                              }
                            });
  });
};

module.exports = Rolls;
