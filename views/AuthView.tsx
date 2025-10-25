import React, { useState, FormEvent } from 'react';

type Stage = 'LOGIN_PHONE' | 'LOGIN_OTP' | 'FORGOT_PHONE' | 'FORGOT_OTP' | 'FORGOT_NEW_PASSWORD';
type UserType = 'admin' | 'staff' | 'customer';

const API_URL = '/api'; // Using proxy

interface AuthViewProps {
  onLoginSuccess: (data: any) => void;
  userType: UserType;
  addToast: (message: string, type: 'success' | 'error') => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess, userType, addToast }) => {
  const [stage, setStage] = useState<Stage>('LOGIN_PHONE');
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const clearFormState = () => {
    setError('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccessMessage('');
  };
  
  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    clearFormState();
    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      console.log(`OTP for ${phone} is 123456 (simulation)`);
      setIsLoading(false);
      setStage(stage === 'LOGIN_PHONE' ? 'LOGIN_OTP' : 'FORGOT_OTP');
    }, 1000);
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') { // OTP is simulated
      setError('Invalid OTP. Please try again.');
      return;
    }
    clearFormState();
    setIsLoading(true);
    
    try {
        if (stage === 'LOGIN_OTP') {
            const res = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, role: userType }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            onLoginSuccess(data);
        } else {
            setStage('FORGOT_NEW_PASSWORD');
        }
    } catch (err: any) {
        setError(err.message);
        addToast(err.message, 'error');
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleNewPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }
    clearFormState();
    setIsLoading(true);

    // Simulate API call to update password
    setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage('Password updated successfully! Please login again.');
        setTimeout(() => {
            setPhone('');
            clearFormState();
            setStage('LOGIN_PHONE');
        }, 2000);
    }, 1500);
  };

  const getTitle = () => {
      switch(stage) {
          case 'LOGIN_PHONE':
          case 'LOGIN_OTP':
            switch(userType) {
                case 'admin': return 'Admin Login';
                case 'staff': return 'Staff Login';
                case 'customer': return 'Customer Login / Sign Up';
                default: return 'Login';
            }
          case 'FORGOT_PHONE':
          case 'FORGOT_OTP':
          case 'FORGOT_NEW_PASSWORD':
            return 'Reset Password';
          default: return 'Login';
      }
  }

  const renderContent = () => {
    if (successMessage) {
        return (
            <div className="text-center">
                <p className="text-green-500 dark:text-green-400">{successMessage}</p>
            </div>
        );
    }
    
    switch (stage) {
      case 'LOGIN_PHONE':
      case 'FORGOT_PHONE':
        return (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            {stage === 'FORGOT_PHONE' && <p className="text-center text-sm text-gray-600 dark:text-gray-400">Enter your phone number to receive a reset code.</p>}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="Enter your 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-brand-dark bg-brand-gold hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-500"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
                {stage === 'LOGIN_PHONE' ? (
                     <button type="button" onClick={() => { clearFormState(); setStage('FORGOT_PHONE'); }} className="font-medium text-brand-gold hover:text-amber-400">
                        Forgot password?
                     </button>
                ) : (
                     <button type="button" onClick={() => { clearFormState(); setStage('LOGIN_PHONE'); }} className="font-medium text-brand-gold hover:text-amber-400">
                        &larr; Back to Login
                     </button>
                )}
            </div>
          </form>
        );
      
      case 'LOGIN_OTP':
      case 'FORGOT_OTP':
        return (
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                An OTP has been sent to <span className="font-medium text-gray-800 dark:text-white">{phone}</span>. (Hint: 123456)
             </p>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-brand-dark bg-brand-gold hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-500"
              >
                {isLoading ? 'Verifying...' : (stage === 'LOGIN_OTP' ? 'Verify & Login' : 'Verify Code')}
              </button>
            </div>
            <div className="text-center">
                <button type="button" onClick={() => setStage(stage === 'LOGIN_OTP' ? 'LOGIN_PHONE' : 'FORGOT_PHONE')} className="font-medium text-sm text-brand-gold hover:text-amber-400">
                    Change phone number
                </button>
            </div>
          </form>
        );

      case 'FORGOT_NEW_PASSWORD':
        return (
          <form className="mt-8 space-y-6" onSubmit={handleNewPasswordSubmit}>
             <p className="text-center text-sm text-gray-600 dark:text-gray-400">Create a new password for your account.</p>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="new-password_" className="sr-only">New Password</label>
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password_" className="sr-only">Confirm New Password</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-dark placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-brand-dark bg-brand-gold hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-500"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        );
      default:
          return null;
    }
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-brand-dark-secondary p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">{getTitle()}</h2>
           {!successMessage && 
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Secure access to your panel
            </p>
           }
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthView;
