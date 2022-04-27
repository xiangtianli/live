const Koa = require('koa');
const router = require('koa-router')();
const axios = require('axios');
const json = require('koa-json');
// const Douyu = require('./douyu');
const Douyu = require('./huya');

//创建koa实例
const app = new Koa();


router.get('/getVideo', async(ctx, next) => {
  const res =  await Douyu.getVideostrame('21113006')
  ctx.body = res;
})

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8082,()=>{
  console.log('接口已启动')
});