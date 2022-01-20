import React, { useState, useRef, useEffect } from 'react';
import CardList from './pages/CardList';
import CreateCard from './pages/CreateCard';
import CompleteCard from './pages/CompleteCard';
import './styles/index.css';

const App = () => {
  const [nowPage, setNowPage] = useState(1);

  const [completedCards, setCompletedCards] = useState([]);

  const goToPage = (num) => setNowPage(num);
  
  return (
		<div className='root'>
      {nowPage === 0 && <CardList goToPage={goToPage} />}
      {nowPage === 1 && <CreateCard goToPage={goToPage} />}
      {nowPage === 2 && <CompleteCard goToPage={goToPage} />}
    </div>
  );
};

export default App;
