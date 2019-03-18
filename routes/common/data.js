var express = require('express');
var router = express.Router();
var Mongodb = require('../../database/mongodb');
var counters = require('../../routes/common/counter');

//通用数据操作服务.

/**
 * 获取自增序号
 */
router.get('/counter/:key', function (req, res, next) {
  var key = req.params.key;
  counters.getNextSequenceValue(key, (value) => {
    res.json({
      'value': value
    });
  });
});

/**
 * 保存
 */
router.post('/save/:name', function (req, res, next) {
  var obj = req.body;
  var tbName = req.params.name;
  Mongodb.save(tbName, obj, function (err, docs) {
    if (err) {
      res.send("保存失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 批量保存
 */
router.post('/saveDocs/:name', function (req, res, next) {
  var docs = req.body;
  var tbName = req.params.name;
  Mongodb.saveDocs(tbName, docs, function (err, docs) {
    if (err) {
      res.send("保存失败");
    } else {
      res.json(docs);
    }
  });
});



/**
 * 批量删除
 */
router.post('/deleteDocs/:name', function (req, res, next) {
  var where = req.body;
  var tbName = req.params.name;
  Mongodb.remove(tbName, where, function (err, docs) {
    if (err) {
      res.send("删除失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 删除
 */
router.get('/delete/:name/:id', function (req, res, next) {
  var where = {
    _id: req.params.id
  };
  var tbName = req.params.name;
  Mongodb.remove(tbName, where, function (err, docs) {
    if (err) {
      res.send("删除失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 更新项目
 */
router.post('/update/:name/:id', function (req, res, next) {
  var where = {
    _id: req.params.id
  };
  var tbName = req.params.name;

  var fields = req.body;
  Mongodb.update(tbName, where, fields, function (err, docs) {
    if (err) {
      res.send("更新失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 批量更新项目
 */
router.post('/updateDocs/:name', function (req, res, next) {
  var tbName = req.params.name;
  var fields = req.body.fields;
  var where = {
    _id: req.body.idList
  };

  Mongodb.update(tbName, where, fields, function (err, docs) {
    if (err) {
      res.send("更新失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 查询所有数据
 */
router.get('/findAll/:name', function (req, res, next) {
  var tbName = req.params.name;
  Mongodb.find(tbName, {}, {}, {}, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});


/**
 * 分页查询
 */
router.post('/findPage/:name', function (req, res, next) {
  let tbName = req.params.name;  
  let queryParam = req.body;
  let result = {}
  Mongodb.findPage(tbName, queryParam.conditions, queryParam.options, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      Mongodb.count(tbName, queryParam.conditions, function (err, count) {
        if (err) {
          res.send("查询失败");
        } else {
          result.total = count;
          result.content = docs;
          res.json(result);
        }
      });
    }
  });
});

/**
 * 查询结果总数.
 */
router.post('/findCount/:name', function (req, res, next) {
  let tbName = req.params.name;  
  let conditions = req.body;
  Mongodb.count(tbName, conditions, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

// 按排序规则获取最近一条记录
router.post('/findTopOne/:name', function (req, res, next) {
  var tbName = req.params.name;
  let conditions = req.body;
  Mongodb.find(tbName, conditions.query, null, conditions.sort, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs || []);
    }
  });
})

/**
 * 按条件查询
 */
router.post('/find/:name', function (req, res, next) {
  var tbName = req.params.name;
  let query = req.body;
  let conditions = {}
  if (query.like) {
    for (name in query.like) {
      conditions[name] = new RegExp(query.like[name], 'i')
    }
  } else {
    conditions = query
  }
  Mongodb.find(tbName, conditions, null, null, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});


/**
 * 按条件查询
 */
router.post('/find/:name', function (req, res, next) {
  var tbName = req.params.name;
  let conditions = req.body;
  RegExp
  Mongodb.find(tbName, conditions, null, null, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 获取图片
 */
router.get('/find/imgs/:id', function (req, res, next) {
  let conditions = {
    '_id': req.params.id
  }
  Mongodb.findOne('imgs', conditions, function (err, docs) {
   if (docs && docs.type) {
      let base64Data
      if (docs.type.indexOf('image') !== -1) {
        base64Data = docs.content.replace(/^data:image\/\w+;base64,/, "");
      } else {
        base64Data = docs.content.replace(/^data:video\/\w+;base64,/, "");
      }
      let binaryData = new Buffer(base64Data, 'base64');
      res.writeHead('200', {'Content-Type': docs.type || 'image/jpeg'});
      res.end(binaryData, 'binary');
    } else {
      res.send(err);
    }
  });
})

/**
 * 查询单条记录.
 */
router.post('/findOne/:name', function (req, res, next) {
  var tbName = req.params.name;
  let conditions = req.body;
  Mongodb.findOne(tbName, conditions, function (err, docs) {
    if (err) {
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 分组查询
 */
router.post('/group/:name', function (req, res, next) {
  var tbName = req.params.name;
  let conditions = req.body;
  let model = Mongodb.getConnection(tbName);
  model.aggregate(conditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err)
    }
  });
});

module.exports = router;