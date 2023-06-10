import React, { createContext, useState, ReactNode } from 'react';
const jwt = require('jsonwebtoken');


interface User {
  username: string;
  name: string;
  todos: Todo[];
  token: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  subTasks: Todo[];
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // Perform authentication logic here
    // Validate username and password from mock data or API
    // Set user information if authentication is successful

    const token = jwt.sign({ username }, 'your-secret-key');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
