import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
       navigate('/')
       aToken && setAToken('')
       aToken && localStorage.removeItem('aToken')
       dToken && setDToken('')
       dToken && localStorage.removeItem('dToken')
    }

  

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-10 bg-white border-b">

      {/* Left Side */}
      <div className="flex items-center gap-2 text-xs">
        <img 
          src={assets.admin_logo} 
          alt="logo" 
          className="w-36 sm:w-40 cursor-pointer"
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right Side */}
      <button 
        onClick={logout}
        className='bg-primary text-white text-sm px-10 py-2 rounded-full'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar