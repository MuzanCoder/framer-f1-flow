import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'email' | 'otp' | 'reset';

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('otp');
      toast({
        title: "OTP sent!",
        description: `We've sent a verification code to ${email}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === '123456') { // Mock OTP for demo
        setCurrentStep('reset');
        toast({
          title: "OTP verified!",
          description: "You can now reset your password.",
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check the code and try again.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password reset successful!",
        description: "Your password has been updated. You can now sign in.",
      });
    }, 1500);
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSendOTP} className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-rajdhani font-semibold mb-2">
          Reset Your Password
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a verification code
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="btn-racing w-full py-6 text-lg"
        disabled={isLoading}
      >
        {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
      </Button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-rajdhani font-semibold mb-2">
          Check Your Email
        </h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to<br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input
          id="otp"
          type="text"
          required
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="text-center text-2xl font-mono tracking-widest"
        />
        <p className="text-xs text-muted-foreground text-center">
          Demo code: 123456
        </p>
      </div>

      <Button
        type="submit"
        className="btn-racing w-full py-6 text-lg"
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleSendOTP({ preventDefault: () => {} } as React.FormEvent)}
          className="text-sm text-primary hover:text-primary/80"
        >
          Didn't receive the code? Resend
        </button>
      </div>
    </form>
  );

  const renderResetStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-rajdhani font-semibold mb-2">
          Create New Password
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose a strong password for your account
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="btn-racing w-full py-6 text-lg"
        disabled={isLoading}
      >
        {isLoading ? 'Updating Password...' : 'Update Password'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="w-8 h-8 bg-racing-gradient rounded-md flex items-center justify-center glow-racing group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-rajdhani font-bold text-lg">F1</span>
            </div>
            <span className="text-racing text-xl">SPEED</span>
          </Link>
          <h2 className="text-3xl font-rajdhani font-bold">
            Forgot Password
          </h2>
          <p className="text-muted-foreground mt-2">
            Don't worry, we'll help you get back on track
          </p>
        </div>

        {/* Form Card */}
        <Card className="card-racing">
          <CardHeader>
            <CardTitle className="text-2xl font-rajdhani font-semibold text-center">
              Password Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 'email' && renderEmailStep()}
            {currentStep === 'otp' && renderOTPStep()}
            {currentStep === 'reset' && renderResetStep()}

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;