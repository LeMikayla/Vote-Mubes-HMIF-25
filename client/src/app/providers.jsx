import { AuthProvider } from "../features/auth/context/authContext";
import { Toaster } from "sonner";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-center" richColors />
    </AuthProvider>
  );
};
