import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import './Home.css'

export const Home = () => {






  return (
    <>
      <Jumbo />
      <div id='placeholder'>
        <SearchBox />
        <Info />
      </div>
    </>
  );
}