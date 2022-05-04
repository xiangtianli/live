const Douyu = require('./douyu');
const axios = require('axios');
const CryptoJS = require("crypto-js");




function queryString(str) {
  let param = str.split('&'); // 通过&符号进行分割即["name=itclanCoder", "study=css"]
  let obj = {}; // 用一个对象存储目标值
  for (let i = 0; i < param.length; i++) {
    // 循环遍历截取出来的param数组
    let paramsA = param[i].split('='); // 通过split,=继续对数组params每一项进行分割,生成数组["name", "itclanCoder"]
    let key = paramsA[0]; // 取数组项["name", "itclanCoder"]中第0位,即name
    let value = paramsA[1]; // 取数组项["name", "itclanCoder"]中第1位,即itclanCoder
    obj[key] = value;
  }
  return obj;
}


class Huya extends Douyu{
  static did = '10000000000000000000000000001501';
  static async getArea(bussType){
    const res =  await axios.get(`https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=${bussType}`)
    return res.data.data
  }
  /**
   * @description 获取分类下直播间
   * @param {*} page 页数
   * @param {*} type 类型
   * @returns 
  */
  static async getRoomList(page,type){
    const res = await axios.get(`https://live.cdn.huya.com/liveHttpUI/getLiveList?iGid=${type}&iPageNo=${page}&iPageSize=20`)
    return res.data
  }
  /**
   * @description 查询
   * @param {*} q 查询名称
   * @param {*} page  
   * @param {*} type 
   * @returns 
  */
  static async getSearch(q){
    return await axios.get(`https://search.cdn.huya.com/?m=Search&do=getSearchContent&q=${q}&typ=-5&rows=${120}`)
  }
  /**
   * @description 获取推荐列表
   * @param {*} page  页数
   * @returns 
   */
  static async getCache(page){
    return await axios.get(`https://www.huya.com/cache.php?m=LiveList&do=getLiveListByPage&tagAll=0&page=${page||1}`)
  }
  /**
   * 
   * @param {*} roomId 房间Id
   */
  static async getVideostrame(roomId){
    const url = `https://m.huya.com/${roomId}`;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
    }
    const res = await axios({
      url,
      method:'get',
      headers,
    })
    const liveLineUrl=res.data.match(/"liveLineUrl":"([\s\S]*?)"/)[0].split(':')[1]
    const url12 = CryptoJS.enc.Base64.parse(liveLineUrl.split('"')[1]).toString(CryptoJS.enc.Utf8)
    const [i, b] = url12.split('?'),
        r= i.split('/'),
        s=r[r.length-1].split('.')[0],
        c=b.split('&fm'),
        n=queryString(b),
        fm=decodeURIComponent(n.fm),
        u=CryptoJS.enc.Base64.parse(fm).toString(CryptoJS.enc.Utf8),
        p=u.split('_')[0],
        f= new Date().getDate()+'0000000',
        l=n['wsTime'],
        t='0',
        h=`${p}_${t}_${s}_${f}_${l}`,
        m= CryptoJS.MD5(h),
        y=c[c.length-1],
        url1=`https:${i}?wsSecret=${m}&wsTime=${l}&u=${t}&seqid=${f}&fm=${c[1]}`;
        let str = url1.replace('m3u8','flv');
       str =str.replace('hls','flv')
    return str
  }
}
module.exports =Huya