const Koa = require('koa');
const router = require('koa-router')();
const axios = require('axios');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser')
const Douyu = require('./douyu');
const Huya = require('./huya');

//创建koa实例
const app = new Koa();

router.get('/', async(ctx,next)=>{
  const res = await Douyu.getVideostrame('522423')
  ctx.body=res
})
router.post('/getVideo', async(ctx, next) => {
  const { type,roomid }  =ctx.request.body;
  switch(type){
    case 'huya':
      ctx.body = {data: await Huya.getVideostrame(roomid)}
      break;
    case 'douyu':
      ctx.body = {data: await Douyu.getVideostrame(roomid)}
      break;
    default :
      ctx.body={data:'null'}
  }
})
router.post('/getArea', async(ctx, next) => {
  const { type,bussType }  =ctx.request.body;
  switch(type){
    case 'huya':
      ctx.body = await Huya.getArea(bussType)
      break;
    case 'douyu':
      ctx.body = await Douyu.getArea()
      break;
    default :
      ctx.body={data:'null'}
  }
})
router.post('/getRoomList', async(ctx, next) => {
  const { type,page,classtype }  =ctx.request.body;

  switch(type){
    case 'huya':
      ctx.body = await Huya.getRoomList(page,classtype)
      break;
    case 'douyu':
      ctx.body = await Douyu.getRoomList(page,classtype )
      break;
    default :
      ctx.body={data:'null'}
  }
})
router.post('/getCache', async(ctx, next) => {
  const { type }  =ctx.request.body;
  let res ={data:null};
  switch(type){
    case 'huya':
      res =  await Huya.getCache()
      break;
    case 'douyu':
      res =  await Douyu.getCache()
      break;
    default :
     break;
  }
  ctx.body = res.data;
})

app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8082,()=>{
  console.log('接口已启动')
});