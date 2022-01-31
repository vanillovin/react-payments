import React, { useState, useRef, useEffect } from 'react';
import CardList from './pages/CardList';
import CreateCard from './pages/CreateCard';
import CompleteCard from './pages/CompleteCard';
import './styles/index.css';
import { MyProvider } from './context';

// 하드코딩
// 자바스크립트로 만들었을 땐 constant 파일을 만드는 것이 도움이 될
// confit/constant -> 근본적인 해결방법은 typescript
// 이사람이 해놓은 방식의 장단점을 의견교환
// 이런 문제가 있을 것 같다. 이런 방식이 더 좋을 것 같다.
const App = () => {
  const [nowPage, setNowPage] = useState(0);

  // const [completedCards, setCompletedCards] = useState([]);

  const goToPage = num => setNowPage(num);

  return (
    <MyProvider>
      <div className="root">
        {nowPage === 0 && <CardList goToPage={goToPage} />}
        {nowPage === 1 && <CreateCard goToPage={goToPage} />}
        {nowPage === 2 && <CompleteCard goToPage={goToPage} />}
      </div>
    </MyProvider>
  );
};

export default App;
