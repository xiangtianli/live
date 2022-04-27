import React from 'react';
import {Link} from 'umi';

export default function Menu() {
  return (
    <div>
      <Link to={'/list/huya'} >虎牙</Link>
      <Link to={'/list/douyu'}>斗鱼</Link>
    </div>
  )
}
