import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up');
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>
      {/* Background gradient blob */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #5f6FFF 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }} />
      </div>

      <form onSubmit={onSubmitHandler} className='w-full max-w-md animate-fade-in-up'>
        <div className='glass-card rounded-3xl p-8 flex flex-col gap-5'>

          {/* Header */}
          <div className="text-center mb-2">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(135deg, #5f6FFF, #818cf8)" }}>
              {state === 'Sign Up' ? '✨' : '👋'}
            </div>
            <h2 className='font-bold text-2xl text-gray-800'>
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {state === 'Sign Up'
                ? 'Sign up to book your first appointment'
                : 'Login to manage your appointments'}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setState('Sign Up')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                state === 'Sign Up'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setState('Login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                state === 'Login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {state === 'Sign Up' && (
              <div>
                <label htmlFor="fullname" className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>
                  Full Name
                </label>
                <input
                  id="fullname"
                  className='form-input'
                  type='text'
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>
                Email Address
              </label>
              <input
                id="email"
                className='form-input'
                type='email'
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>
                Password
              </label>
              <input
                id="password"
                className='form-input'
                type='password'
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          <button type='submit' className='btn-primary w-full py-3.5 text-base mt-1'>
            {state === 'Sign Up' ? 'Create Account →' : 'Login →'}
          </button>

          <p className="text-center text-xs text-gray-500">
            {state === 'Sign Up'
              ? <>Already have an account?{' '}
                  <span className='text-primary font-semibold cursor-pointer hover:underline' onClick={() => setState('Login')}>Login here</span>
                </>
              : <>Don't have an account?{' '}
                  <span className='text-primary font-semibold cursor-pointer hover:underline' onClick={() => setState('Sign Up')}>Sign up free</span>
                </>
            }
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login