import { AuthProvider } from "../features/auth/context/authContext";

export const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
