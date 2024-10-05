import './App.css'
import {useSelector,useDispatch} from 'react-redux';
import { handleInitialData } from './actions/shared';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authedUser == null);

  useEffect(()=>{
    dispatch(handleInitialData());
  },[dispatch]);

  return (
    <div className='container'>
    {
      loading === true ? null: <div> Redux Polls </div>
    }
    </div>
  )
}

export default App
