import './App.css';
import './components/Auth/Auth.css';
import './components/Chatbot/Chatbot.css';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import FitnessChatbot from './components/Chatbot/FitnessChatbot';


import { AuthProvider } from './components/Auth/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/chat" element={<FitnessChatbot />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
