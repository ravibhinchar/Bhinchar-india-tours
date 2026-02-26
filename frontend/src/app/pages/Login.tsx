import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "motion/react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, signInWithPopup } from "../../lib/firebase";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
      const response = await axios.post(`${backendUrl}/api/auth/login`, formData);

      if (response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        navigate("/profile"); // Redirect to dashboard after login
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
      const response = await axios.post(`${backendUrl}/api/auth/google`, {
        name: user.displayName,
        email: user.email,
        googleId: user.uid
      });

      if (response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        navigate("/profile");
      } else {
        setError("Google Login failed regarding server response.");
      }
    } catch (err: any) {
      console.error("Google Login error:", err);
      setError(err.message || "Google Sign-In Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white py-6 text-lg rounded-xl flex justify-center items-center"
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full bg-white text-gray-700 py-6 text-lg rounded-xl flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 mr-3" />
              Sign in with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
