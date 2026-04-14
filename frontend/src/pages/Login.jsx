import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl,setToken, token} = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const {data} = await axios.post(backendUrl + '/api/user/register', {name,email,password})
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('token',data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {email,password})
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('token',data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {

      toast.error(error.message)
    }



  }
  useEffect(() => {
    if (token) {

      navigate('/')

    }
  },[ token])


  return (
    <form
      onSubmit={onSubmitHandler}
      className='min-h-[80vh] flex items-center justify-center px-4'
    >

      {/* Card */}
      <div
        className='flex flex-col gap-4 w-full max-w-md p-8 
                   border rounded-2xl shadow-lg 
                   text-gray-600 text-sm
                   transition-all duration-500
                   hover:shadow-2xl'
      >

        {/* Heading */}
        <p className='text-2xl font-semibold text-center text-gray-800'>
          {state === 'Sign Up' ? "Create an account" : "Login"}
        </p>

        <p className='text-center'>
          Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment
        </p>


        {/* Name */}
        {state === 'Sign Up' && (
          <div>
            <p>Full Name</p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded mt-1 focus:outline-primary'
            />
          </div>
        )}


        {/* Email */}
        <div>
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded mt-1 focus:outline-primary'
          />
        </div>


        {/* Password */}
        <div>
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded mt-1 focus:outline-primary'
          />
        </div>


        {/* Button */}
        <button
          type='submit'
          className='bg-primary text-white py-2 rounded-md 
                     transition-all duration-300
                     hover:bg-blue-600 hover:scale-105'
        >
          {state === 'Sign Up' ? "Create account" : "Login"}
        </button>


        {/* Switch */}
        {
          state === "Sign Up"
            ? (
              <p className='text-center'>
                Already have account ?
                <span
                  onClick={() => setState('Login')}
                  className='text-primary cursor-pointer ml-1'
                >
                  Login here
                </span>
              </p>
            )
            : (
              <p className='text-center'>
                Create new account ?
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-primary cursor-pointer ml-1'
                >
                  Click here
                </span>
              </p>
            )
        }

      </div>

    </form>
  )
}

export default Login