import React, { createContext, useState, ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwt from 'jsonwebtoken';
import usersData from '../mockdata/mock.json';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  subTasks: Todo[];
}

interface User {
  username: string | undefined;
  password: string | undefined;
  name: string;
  todos: Todo[];
  token?: string | null;
}
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
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

  const checkUserCredentials = (username: string, password: string): User | undefined => {
    const user = usersData.users.find((user) => user.username === username && user.password === password);
    return user;
  };

  const login = (username: string, password: string) => {
    // Perform authentication logic here
    // Validate username and password from mock data or API
    // Set user information if authentication is successful

    const userData = checkUserCredentials(username, password);

    if(userData){
      const token = jwt.sign({ username }, 'your-secret-key');

      const updatedUser: User = { ...userData, token };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    else{

    }
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
