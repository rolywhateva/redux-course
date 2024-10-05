import './App.css'
import {useSelector} from 'react-redux';
function App() {

  const store = useSelector((store)=>store);
  console.log(store);

  return (
    <>
      <p>  Polls </p>
    </>
  )
}

export default App
