import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {ResultSummary} from "./ResultSummary";
import {MessagePoster} from "./MessagePoster";

export const ResultView = ({validateNumber, queryNumber, postMessage, raiseAlertPop, getCookie, setCookie}) => {

  let {searchedNum} = useParams();
  const [searchResult, setSearchResult] = useState(undefined);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        window.scrollTo({top: 0, behavior: 'smooth'});
        document.getElementById('jumbo').classList.add('hide');
        document.getElementById('search-panel').classList.add('narrow-panel');
        const alertPop = document.getElementById('invalidNumber');
        const validatedNum = validateNumber(searchedNum);
        if (validatedNum === 'invalid') {
          alertPop.classList.add('active');
          setSearchResult(undefined);
        } else {
          alertPop.classList.remove('active');
          const response = await queryNumber(validatedNum);
          setSearchResult(response.data);
        }
      } catch(err) {
        raiseAlertPop(err, 'serviceError');
      }
    };
    fetchSearchResult();
  }, [searchedNum, validateNumber, queryNumber, raiseAlertPop]);







  return (
    <>
      {searchResult && (<ResultSummary searchResult={searchResult} />)}
      {searchResult && (<MessagePoster searchResult={searchResult} setSearchResult={setSearchResult} getCookie={getCookie} setCookie={setCookie} postMessage={postMessage} raiseAlertPop={raiseAlertPop} />)}
    </>
  );




};