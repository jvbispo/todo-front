import React, { createContext, useCallback, useState, useContext } from 'react';
import  api  from '../service/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user?: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}


// hook utilizando createContext para passar dados do usuário, sigIn e signOut
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(
    (): AuthState => {
      const token = localStorage.getItem('@tasksapp:token');
      const user = localStorage.getItem('@tasksapp:user');
      if (token && user) {
        return {
          token,
          user: JSON.parse(user),
        };
      }

      return {} as AuthState;
    },
  );

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@tasksapp:token', token);
    localStorage.setItem('@tasksapp:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@tasksapp:token');
    localStorage.removeItem('@tasksapp:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}
