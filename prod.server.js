var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req,res,next){
  req.url = '/index.html';
  next();
});

app.use(router);

// 设置路由配置
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRoutes = express.Router()

apiRoutes.get('/seller',(req,res)=>{
  res.json({
    errno: 0,
    data: seller
  })
})

apiRoutes.get('/goods',(req,res)=>{
  res.json({
    errno: 0,
    data: goods
  })
})


apiRoutes.get('/ratings',(req,res)=>{
  res.json({
    errno: 0,
    data: ratings
  })
})

// 路由组件化
app.use('/api',apiRoutes)

app.use(express.static('./dist'));


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
