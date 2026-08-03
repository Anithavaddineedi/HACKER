import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const normalizeEmail = (email) => email?.trim().toLowerCase();

const DEMO_USERS = [
  {
    id: 'student-demo',
    name: 'Alex Student',
    email: 'student@edusphere.com',
    password: 'student123',
    role: 'student',
    department: 'Computer Science & Engineering'
  },
  {
    id: 'teacher-demo',
    name: 'Dr. Sarah Vance',
    email: 'teacher@edusphere.com',
    password: 'teacher123',
    role: 'teacher',
    department: 'Computer Science & Engineering'
  },
  {
    id: 'admin-demo',
    name: 'Prof. Marcus Wright',
    email: 'admin@edusphere.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration'
  }
];

const getStoredUsers = () => {
  const savedUsers = localStorage.getItem('users');
  if (!savedUsers) return [];

  try {
    const parsed = JSON.parse(savedUsers);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const getSavedUser = () => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = getStoredUsers();
    const savedUser = getSavedUser();

    const normalizedStoredUsers = storedUsers.map((user) => ({
      ...user,
      email: normalizeEmail(user.email)
    }));

    if (normalizedStoredUsers.length > 0) {
      if (savedUser && !normalizedStoredUsers.some((u) => u.email === normalizeEmail(savedUser.email))) {
        const mergedUsers = [...normalizedStoredUsers, { ...savedUser, email: normalizeEmail(savedUser.email) }];
        saveUsers(mergedUsers);
        return mergedUsers;
      }

      saveUsers(normalizedStoredUsers);
      return normalizedStoredUsers;
    }

    if (savedUser) {
      const seededUsers = [{ ...savedUser, email: normalizeEmail(savedUser.email) }];
      saveUsers(seededUsers);
      return seededUsers;
    }

    const seededUsers = DEMO_USERS.map((user) => ({ ...user, email: normalizeEmail(user.email) }));
    saveUsers(seededUsers);
    return seededUsers;
  });

  const [user, setUser] = useState(() => getSavedUser());
  const [token, setToken] = useState(() => localStorage.getItem('edusphere_token') || null);

  const login = (email, password) => {
    const normalizedEmail = normalizeEmail(email);
    const matchedUser = users.find((u) => normalizeEmail(u.email) === normalizedEmail);

    if (!matchedUser) {
      throw new Error('No account found for this email. Please register first or use one of the demo credentials.');
    }

    if (matchedUser.password !== password) {
      throw new Error('Incorrect password. Please check your password and try again.');
    }

    const authenticatedUser = { ...matchedUser, email: normalizeEmail(matchedUser.email) };
    setUser(authenticatedUser);
    setToken('demo_jwt_token');

    localStorage.setItem('user', JSON.stringify(authenticatedUser));
    localStorage.setItem('edusphere_token', 'demo_jwt_token');

    return matchedUser;
  };

  const register = (name, email, password, role, department) => {
    const normalizedEmail = normalizeEmail(email);

    if (users.some((u) => normalizeEmail(u.email) === normalizedEmail)) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const userData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      department: department.trim() || 'General'
    };

    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    setUser(userData);
    setToken('demo_jwt_token');

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('edusphere_token', 'demo_jwt_token');

    return userData;
  };

  const switchRole = (role) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, role };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });

    localStorage.setItem('edusphere_role', role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('edusphere_token');
    localStorage.removeItem('edusphere_role');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
