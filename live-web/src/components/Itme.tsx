import React from 'react';
import styles from './Item.module.less'
import { getVideo } from '@/pages/List/server';
import {useHistory} from 'react-router-dom';

interface ItemProps{
    imgSrc:string;
    avatar:string;
    name:string;
    describe:string;
    roomId:string|number;
    type:string;
}
export default function Itme(props:ItemProps) {
  const { imgSrc,avatar,name='主播名称', describe="描述",roomId, type} = props;
  const history = useHistory()
  const goVideo =()=>{
    getVideo({
      type,
      roomid:roomId,
    }).then(res=>{
      history.push({pathname: '/video', state:{url:res.data.data,...props}})
    })
  }
  return (
    <div className={styles.itemWarp} onClick={goVideo}>
        <img src={imgSrc} className={styles.img} />
        <div className={styles.info}>
            <div>
                <img src={avatar}/>
                <p>{name}</p>
            </div>
             <div>{describe}</div>
        </div>
    </div>
  )
}
