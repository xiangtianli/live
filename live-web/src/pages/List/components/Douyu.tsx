import React, { useEffect, useState} from 'react'
import Itme from '@/components/Itme';
import {getArea, getCache } from '../server';


export default function Huya() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getCache({type:'douyu'}).then(res=>{
      setData(res.data.data)
    })
  },[])
  return (
    <div>
      {data.map(item=>(
        <>
          <p>
            {item.tabName}
          </p>
          {
            item.list.map(item=>(
              <Itme
                name={item.nickname}
                avatar={item.avatar}
                describe={item.roomName}
                roomId={item.rid}
                imgSrc={item.roomSrc}
                type="douyu"
              />
            ))
          }
        </>
      ))}
    </div>
  )
}
