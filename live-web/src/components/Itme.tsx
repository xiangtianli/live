import React from 'react';
import styles from './Item.module.less'

interface ItemProps{
    imgSrc:string;
    avatar:string;
    name:string;
    describe:string;
    roomId:string|number;
}
export default function Itme(props:ItemProps) {
    const { imgSrc,avatar,name='主播名称', describe="描述",roomId } = props
  return (
    <div className={styles.itemWarp}>
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
