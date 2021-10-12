import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import './Home.css'

export const Home = () => {






  return (
    <div id='home'>
      <Jumbo />
      <div id='placeholder'>
        <SearchBox />
        <Info />
      </div>
    </div>
  );
}