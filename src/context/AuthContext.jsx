import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // User State
  const [user, setUser] = useState(
    localStorage.getItem("user")
  );

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Apply Dark Mode
  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark-theme");

    } else {

      document.body.classList.remove("dark-theme");

    }

  }, [darkMode]);

  // Login
  const login = () => {

    localStorage.setItem("user", "loggedin");

    setUser("loggedin");

  };

  // Logout
  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";

  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        darkMode,
        toggleDarkMode,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}