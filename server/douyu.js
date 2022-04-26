const axios = require('axios');
const CryptoJS = require("crypto-js");
class Douyu {
  static did='10000000000000000000000000001501';
  static t10 = new Date().getTime() +''
  static t13 = new Date().getTime()+'000'
  static md5(str){
    str = CryptoJS.enc.Utf8.parse(str);
    console.log(str)
    str =CryptoJS.MD5(str);
    str=CryptoJS.enc.Utf16.stringify(str)
    console.log(str)
    return str.toString()
  }
  static async getArea(){
    return await axios.get('https://m.douyu.com/api/cate/list')
  }
  /**
   * @description 获取分类下直播间
   * @param {*} page 页数
   * @param {*} type 类型
   * @returns 
   */
  static async getRoomList(page,type){
    return await axios.get(`https://m.douyu.com/api/room/list?page=${page}&type=${type}`)
  }
  /**
   * @description 查询
   * @param {*} q 查询名称
   * @param {*} page  
   * @param {*} type 
   * @returns 
   */
  static async getSearch(q,page,type){
    return await axios.get(` https://www.douyu.com/japi/search/api/searchAnchor?kw=${q}&page=${page}&pageSize=5&filterType=isLive`)
  }
  /**
   * @description 获取推荐列表
   * @param {*} page  页数
   * @returns 
   */
  static async getCache(page){
    return await axios.get(`https://m.douyu.com/api/cate/recList?cid=&ct=`)
  }
  /**
   * 
   * @param {*} roomId 房间Id
   */
   static async getVideostrame(roomId){
    const url = 'https://playweb.douyucdn.cn/lapi/live/hlsH5Preview/' + roomId;
    console.log(url)
    const data = {
      'rid':roomId,
      'did': this.did
    }
    const auth = this.md5(roomId + this.t13)
    const headers = {
      'rid': roomId,
      'time': this.t13,
      'auth': auth
    }
    console.log(data,headers)
    const res = await axios({
      url,
      data,
      method:'post',
      headers,
    })
   return res
  }
}
module.exports =Douyu