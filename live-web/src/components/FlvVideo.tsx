import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';
import Artplayer from 'artplayer';

interface FlvVideoProp{
  url:string;
}
export default function FlvVideo(props:FlvVideoProp) {
  const {url} = props;
  const videoDomRef = useRef();
  const videoRef =useRef<any>();
  useEffect(()=>{
    const video =document.getElementById('#video');
    var art = new Artplayer({
      container: '#video-warp',
      autoplay: true,
      url,
      isLive:true,
      autoMini: true,
      aspectRatio: true,
      fullscreen: true,
      autoOrientation: true,
      setting: true,
      autoSize: true,
      customType: {
          flv: function (video, url) {
              const flvPlayer = flvjs.createPlayer({
                  type: 'flv',
                  url: url,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
          },
      },
    },()=>{});
    return ()=>{
      console.log('ciaohui ')
      art.destroy()
    }
  },[url])
  const qqq =()=>{
    videoRef.current.play()
  }
  return (
    <div id="video-warp"style={{width:'100%',height:'600px'}} >
      <video id="video" ref={videoDomRef}></video>
      <button onClick={qqq}>查看</button>
    </div>
  )
}
