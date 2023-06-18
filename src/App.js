
import './App.css';
import UserProfile from './components/profiledemo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/welcome';
import Signup from './components/signup';
import Signin from './components/signin';
import SendEmail from './components/sendemail';
import Dashboard from './components/dashboard';
import DisplayProfileInfo from './userprofile/profileinfo';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';

function App() {

  return (
    <Router>
      <div className='App'>
    
        <div className='content'>
          <Routes>
            <Route path="/" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/welcome" element={<Home />}></Route>
            <Route path="/updateprofile" element={<UserProfile />} />
            <Route path="/hremail" element={<SendEmail />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/profile" element={<DisplayProfileInfo />}/>
            <Route path='/forgotpassword' element={<ForgotPassword />}/>
            <Routes path="/resetpassword" element={<ResetPassword />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
