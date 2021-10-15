// import {useState} from 'react';
import {Jumbo} from '../components/Jumbo';
import {SearchBox} from '../components/SearchBox';
import {Info} from '../components/Info';
import './Home.css'

export const Home = () => {

  // const [searchResult, setSearchResult] = useState({});
  
  return (
    <div id='home'>
      <Jumbo />
      <SearchBox />
      <Info />
    </div>
  );
}