import { useEffect, useRef } from 'react';
import {getArea, getCache } from './server';
import Huya from './components/Huya';
export default function IndexPage(props) {
  const { match:{params:{type}}}= props;
  console.log(props)
  const vidoRef = useRef();
  useEffect(()=>{
    getCache(1).then(res=>{
      console.log(res)
    })
  },[])
  return (
    <div>
     {/* <Huya/> */}
    </div>
  );
}
