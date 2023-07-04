import './App.css';
import Signin from './pages/SignIn'
import Profile from './pages/Profile';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Signin />;
  }

  return (
    <div className='wrapper'>
      <Router>
        <Routes>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/' element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
