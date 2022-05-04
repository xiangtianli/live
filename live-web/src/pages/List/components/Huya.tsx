import React, { useEffect, useState} from 'react'
import { Menu } from 'antd';
import Itme from '@/components/Itme';
import { useLocalStorageState } from 'ahooks';
import {getArea, getCache, getRoomList } from '../server';
const area1=[
  { name:'网游', code :'1'},
  { name:'单机', code :'2'},
  { name:'手游', code :'3'},
  { name:'娱乐', code :'8'},
]

export default function Huya() {
  const [data,setData] = useState([]);// 推荐列表
  const [classData,setClassData] = useState([]);
  const [roomList,setRoomList] = useState([]);// 分区下列表
  const [showCatch,setShowCatch] = useState(true) // 判断是否展示推荐列表
  const [] = useLocalStorageState()
  useEffect(()=>{
    getCache({type:'huya'}).then(res=>{
      let catchL = {};
      res.data.data.datas.forEach((item)=>{
        if(catchL[item.gameFullName]){
          catchL[item.gameFullName].push(item)
        }else{
          catchL[item.gameFullName]=[item]
        }
      })
      setData(catchL)
    })
    getClass()
  },[])
  const getClass =()=>{
    Promise.all([
      getArea({type:'huya',bussType:1}),
      getArea({type:'huya',bussType:2}),
      getArea({type:'huya',bussType:3}),
      getArea({type:'huya',bussType:8})
    ]).then(res=>{
     const areaL = area1.map((item,idx)=>(
        {
          ...item,
          children:res[idx]['data'].splice(0,51)
        }
      ))
      setClassData(areaL)
    })
  }
  const onSelectGid = (e)=>{
    if(e.key==='0'){
      setShowCatch(true)
    }else{
      setShowCatch(false)
      getRoomList({type:'huya',page:1,classtype:e.key}).then(res=>{
        console.log(res)
        setRoomList(res.data.vList?? [])
      })
    }
  }
  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={"0"}
        onClick={onSelectGid}
      >
          <Menu.Item key="0">推荐列表</Menu.Item>
          {
            classData.map(item=>{
              if(item.children.length){
                return (
                  <Menu.SubMenu title={item.name}>
                    {
                      item.children.map(chil=>(
                        <Menu.Item key={chil.gid}Item>{chil.gameFullName}</Menu.Item>
                      ))
                    }
                  </Menu.SubMenu>
                  
                )
              }
            })
          }
      </Menu>
      {showCatch?<div>
        {Object.values(data).map((val1,key)=>(
          <>
          <div>{Object.keys(data)[key]}</div>
            {val1.map(item=>(
              <Itme
                name={item.nick}
                avatar={item.avatar180}
                describe={item.roomName}
                roomId={item.profileRoom}
                imgSrc={item.screenshot}
                type="huya"
              />
            ))}
          </>
        ))}
      </div>:
      <div>
        {
          roomList.map(item=>(
            <Itme
              name={item.sNick}
              avatar={item.sAvatar180}
              describe={item.sRoomName}
              roomId={item.lProfileRoom}
              imgSrc={item.sScreenshot}
              type="huya"
            />
          ))
        }
      </div>}
    </>
  )
}
