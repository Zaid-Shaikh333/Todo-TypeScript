import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/RouteComponent'
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} path="/dashboard"/>} />
          <Route path="/add" element={<PrivateRoute element={<AddTodo />} path="/add"/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
