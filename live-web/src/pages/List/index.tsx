import Huya from './components/Huya';
import Douyu from './components/Douyu';
export default function IndexPage(props) {
  const { match:{params:{type}}}= props;
  return (
    <div>
      {
        (()=>{
          switch(type){
            case 'huya':
              return(<Huya></Huya>)
            case 'douyu':
              return(<Douyu></Douyu>)
          }
        })()
      }
    </div>
  );
}
