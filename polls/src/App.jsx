/* eslint-disable no-unused-vars */
import './App.css'
import {useSelector,useDispatch} from 'react-redux';
import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import { useEffect } from 'react';
import Leaderboard from "./components/Leaderboard";
import Dashboard from './components/Dashboard';
import AddPoll from './components/AddPoll';
import Nav from './components/Nav';
import Poll from './components/Poll';
function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authedUser == null);

  useEffect(()=>{
    dispatch(handleInitialData());
  },[dispatch]);

  return (
    <Router>
    <div className='container'>
      <Nav/>
      {loading? null : 
      <div> 
        <Routes>
          <Route path='/'  element={<Dashboard/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>} exact/>
          <Route path="/polls/:id" element={<Poll/>}/>
          <Route path='/add'element={<AddPoll/>}/>
          </Routes>
      </div> }
    </div>
    </Router>
  )
}

export default App
