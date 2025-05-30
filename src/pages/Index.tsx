import React, { useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/Auth/LoginForm';

// Define the type for login form values, mirroring the structure of
// LoginFormValues inferred from loginFormSchema in LoginForm.tsx.
// This ensures strong typing for the data received in the onLoginSuccess callback.
interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleLoginSuccess = useCallback((data: LoginCredentials) => {
    console.log('Login successful:', data);
    // In a real application, you would typically handle tokens, user state, and navigation.
    // For this example, we'll show an alert.
    alert(`Login Successful!\nUsername: ${data.username}\n(Check console for full data object submitted to LoginForm)`);
    // Example: navigate('/dashboard'); // (if using react-router-dom and a router was set up)
  }, []);

  const handleNavigateToSignUp = useCallback(() => {
    console.log('Navigate to Sign Up page action triggered.');
    // In a real application, you would navigate to the sign-up route.
    // For this example, we'll show an alert.
    alert('User clicked Sign Up.\n(Navigation to a sign-up page is not implemented in this isolated example)');
    // Example: navigate('/signup'); // (if using react-router-dom and a router was set up)
  }, []);

  return (
    <MainLayout>
      {/* 
        The MainLayout component provides the centered page structure with the correct background.
        The LoginForm component is responsible for its own internal layout and styling,
        including width, padding, and element spacing, as detailed in its definition.
      */}
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
      />
    </MainLayout>
  );
};

export default LoginPage;
