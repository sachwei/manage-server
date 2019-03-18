var Mongodb = require('../../database/mongodb');

function update(key, len, value, callback){
  var where = {
    'sequence_key': key
  };
  var tbName = 'counters';
  let nextValue = Number(value) + Number(len);

  var fields = {
    sequence_value: nextValue
  }
  Mongodb.update(tbName, where, fields, (err, docs) => {
    if(!err){
      callback(nextValue);
    }
  });
}


function insert(key, len, callback) {
  var tbName = 'counters';
  let nextValue = len;
  var fields = {
    'sequence_key': key,
    sequence_value: nextValue
  }

  Mongodb.save(tbName, fields, (err, docs) => {
    if(!err){
      callback(nextValue);
    }
  });
}

module.exports = {
  getNextSequenceValue(key, callback) {
    let tbName = 'counters';
    let conditions = {
      'sequence_key': key
    }
    Mongodb.findOne(tbName, conditions, (err, docs) => {
      if(!err){
        if(docs) {
          let curValue = docs.sequence_value;        
          update(key, 1, curValue, callback);
        } else {
          insert(key, 1, callback);
        }        
      }
    });
  },

  getLenSequenceValue(key, len, callback) {
    let tbName = 'counters';
    let conditions = {
      'sequence_key': key
    }
    Mongodb.findOne(tbName, conditions, (err, docs) => {
      if(!err){
        if(docs) {
          let curValue = docs.sequence_value;        
          update(key, len, curValue, callback);
        } else {
          insert(key, len, callback);
        }
        
      }
    });
  }
}
