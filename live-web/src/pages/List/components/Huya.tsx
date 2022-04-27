import React, { useEffect, useState} from 'react'
import Itme from '@/components/Itme';
import {getArea, getCache } from '../server';


export default function Huya() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getCache(1).then(res=>{
      setData(res.data.data.datas)
    })
  },[])
  return (
    <div>
      {data.map(item=>(
        <Itme
          name={item.nick}
          avatar={item.avatar180}
          describe={item.roomName}
          roomId={item.profileRoom}
          imgSrc={item.screenshot}
        />
      ))}
    </div>
  )
}
