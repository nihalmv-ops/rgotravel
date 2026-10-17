import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default logged in admin for instant developer preview
    return {
      name: "Nihal MV",
      email: "admin@gotravel.com",
      role: "Super Admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };
  });

  const login = (email, password) => {
    // Demo verification
    if (email && password) {
      const user = {
        name: email.split("@")[0].toUpperCase(),
        email,
        role: "Super Admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      };
      setAdminUser(user);
      localStorage.setItem("gotravel_admin_user", JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: "Please provide both email and password." };
  };

  const logout = () => {
    localStorage.removeItem("gotravel_admin_user");
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

