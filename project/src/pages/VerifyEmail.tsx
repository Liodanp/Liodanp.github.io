import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, CheckCircle, RefreshCw, LogOut } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { authState, verifyEmail, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is verified or not logged in
  React.useEffect(() => {
    if (!authState.user) {
      navigate('/login');
    } else if (authState.user.isEmailVerified) {
      navigate('/');
    }
  }, [authState.user, navigate]);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handleSendVerificationEmail = () => {
    // In a real app, this would send an actual email
    setIsEmailSent(true);
    startCountdown();
  };

  const handleVerifyForDemo = () => {
    // This is just for the demo to simulate email verification
    verifyEmail();
    navigate('/');
  };

  if (!authState.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your email address
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification link to {authState.user.email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Verification Required</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Please check your email and click on the verification link to complete the 
                      registration process. If you don't see the email, check your spam folder.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleSendVerificationEmail}
                disabled={countdown > 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {countdown > 0 ? `Resend email (${countdown}s)` : 'Resend verification email'}
              </button>

              {isEmailSent && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="mr-1.5 h-4 w-4" />
                  Verification email sent!
                </div>
              )}

              {/* For demo purposes only */}
              <button
                onClick={handleVerifyForDemo}
                className="mt-4 inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Now (Demo)
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={logout}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;