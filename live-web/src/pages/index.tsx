import styles from './index.less';
import flvjs from 'flv.js';
import { useEffect, useRef } from 'react';
import axios from 'axios';
export default function IndexPage() {
  const vidoRef = useRef();
  useEffect(()=>{
    axios.get('/api/getVideo').then(res=>{
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: res.data
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    })
  },[])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <video style={{width:'100px'}} ref={vidoRef} id="videoElement"></video>
    </div>
  );
}
