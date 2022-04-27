import axios from 'axios';

//获取分区
export const getArea = async (type)=>{
  return await axios.post('/api/getArea',{type})
}
//获取推荐
export const getCache = async (type)=>{
  return await axios.post('/api/getCache',{type})
}