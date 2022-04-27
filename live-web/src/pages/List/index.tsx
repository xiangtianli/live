import { useEffect, useRef } from 'react';
import {getArea, getCache } from './server';
import Huya from './components/Huya';
export default function IndexPage(props) {
  const { match:{params:{type}}}= props;
  console.log(props)
  const vidoRef = useRef();

  return (
    <div>
     <Huya/>
    </div>
  );
}
