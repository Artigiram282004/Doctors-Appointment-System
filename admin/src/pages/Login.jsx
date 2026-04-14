import { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {setAToken,backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {
        if (state === 'Admin') {

            const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
            console.log("FULL RESPONSE:", data)   // 👈 ADD THIS
            console.log("TOKEN:", data.token)
            if (data.success) {
              localStorage.setItem('aToken',data.token)
              setAToken(data.token)
            }  else {
              toast.error(data.message)
            }
            

        } else {
          const {data} = await axios.post(backendUrl+'/api/doctor/login',{email, password})
          if (data.success) {
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)
            console.log(data.token);
          }  else {
            toast.error(data.message)
          } 


        }


    } catch (error) {

    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      {/* Card */}
      <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-xl p-8 w-80 border border-gray-200 transition duration-300 hover:shadow-xl">

        {/* Title */}
        <p className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {state}
        </p>

        {/* Email */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        {
            state === 'Admin'
            ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }

      </form>
    </div>
  )
}

export default Login