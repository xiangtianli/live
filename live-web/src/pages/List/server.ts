import axios from 'axios';

//获取分区
export const getArea = async (data)=>{
  return await axios.post('/api/getArea',data)
}
//获取推荐
export const getCache = async (data)=>{
  return await axios.post('/api/getCache',data)
}
//获取分区下房间
export const getRoomList = async (data)=>{
  return await axios.post('/api/getRoomList',data)
}
// 获取直播源地址
export const getVideo = async (data)=>{
  return await axios.post('/api/getVideo',data)
}