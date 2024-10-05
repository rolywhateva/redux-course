/* eslint-disable no-unused-vars */
import './App.css'
import {useSelector,useDispatch} from 'react-redux';
import { BrowserRouter as Router  } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import { useEffect } from 'react';
import Leaderboard from "./components/Leaderboard";
import Dashboard from './components/Dashboard';
import AddPoll from './components/AddPoll';
function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authedUser == null);

  useEffect(()=>{
    dispatch(handleInitialData());
  },[dispatch]);

  return (
    <Router>
    <div className='container'>
    {
      loading === true ? null: <div> Redux Polls <AddPoll/> </div>
    }
    </div>
    </Router>
  )
}

export default App
