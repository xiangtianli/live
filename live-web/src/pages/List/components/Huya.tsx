import React, { useEffect, useState} from 'react'
import {getArea, getCache } from '../server';
export default function Huya() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getCache(1).then(res=>{
      setData(res.data.data.datas)
    })
  })
  return (
    <div>
      {data.map(item=>(
        <img src={item.screenshot}></img>
      ))}
    </div>
  )
}
