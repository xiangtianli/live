const Douyu = require('./douyu');
const axios = require('axios');
const CryptoJS = require("crypto-js");
const base64js = require('base64-js')




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
    return await axios.get(`https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=${bussType}`)
  }
  /**
   * @description 获取分类下直播间
   * @param {*} page 页数
   * @param {*} type 类型
   * @returns 
  */
  static async getRoomList(page,type){
    return await axios.get(`https://live.cdn.huya.com/liveHttpUI/getLiveList?iGid=${type}&iPageNo=${page}&iPageSize=20`)
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
    return await axios.get(`https://www.huya.com/cache.php?m=LiveList&do=getLiveListByPage&tagAll=0&page=${page}`)
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
    const url12 = CryptoJS.enc.Base64.parse('Ly9ody5obHMuaHV5YS5jb20vaHV5YWxpdmUvMjUyODcyNjk2OS0yNTI4NzI2OTY5LTEwODYwNzk5NjMyMzY4MjA1ODI0LTUwNTc1NzczOTQtMTAwNTctQS0wLTEubTN1OD9yYXRpbz0yMDAwJndzU2VjcmV0PWY0N2RkNDFkMjBkYTg5ZDY0YTNiMmM5ZTRhNDk2ZWZjJndzVGltZT02MjY5MGUyZiZmbT1SRmR4T0VKalNqTm9Oa1JLZERaVVdWOGtNRjhrTVY4a01sOGtNdyUzRCUzRCZjdHlwZT10YXJzX21vYmlsZSZmcz1iZ2N0JnQ9MTAz').toString(CryptoJS.enc.Utf8)
    const [i, b] = url12.split('?'),
        r= i.split('/'),
        // s= re.sub(r'.(flv|m3u8)', '', r[-1]), // 待修改
        c=b.split('&',3),
        n=queryString(b);
        fm= n.fm,
        u=CryptoJS.enc.Base64.parse(fm).toString(),
        p=u.split('_')[0],
        f= new Date().getDate()+'0000000',
        l=n['wsTime'],
        t='0',
        h=`_${p}${t}${s}${f}${l}`,
        m= CryptoJS.MD5(h),
        y=c[c.length-1],
        url1=`${i}?wsSecret=${m}&wsTime=${l}&u=${t}&seqid=${f}&${y}`;
        console.log(url1)
  //取出 fm wsTime  fm base64解码 给到 p
// https://hw.hls.huya.com/huyalive/2528726969-2528726969-10860799632368205824-5057577394-10057-A-0-1.m3u8

    return {data:1}
    // try:
//     response = requests.get(url=room_url, headers=header).text
//     liveLineUrl = re.findall(r'"liveLineUrl":"([\s\S]*?)",', response)[0]
//     liveline = base64.b64decode(liveLineUrl).decode('utf-8')
//     if liveline:
//         if 'replay' in liveline:
//             return '直播录像：' + liveline
//         else:
//             liveline = live(liveline)
//             real_url = ("https:" + liveline).replace("hls", "flv").replace("m3u8", "flv")
//     else:
//         real_url = '未开播或直播间不存在'
// except:
//     real_url = '未开播或直播间不存在'
// return real_url


  }
}
module.exports =Huya