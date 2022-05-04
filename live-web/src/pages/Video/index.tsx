import React,{ useEffect } from 'react';
import FlvVideo from '@/components/FlvVideo';


export default function Video(props) {
  console.log(props)
  const { location:{state:{url='',imgSrc,avatar,name,describe},state} } = props;
  return (
    <div>
      <FlvVideo url={url}/>
      <div>
        <div>
            <div>
                <img src={avatar}/>
                <p>{name}</p>
            </div>
             <div>{describe}</div>
        </div>
      </div>
    </div>
  )
}
