import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center py-16 px-6 bg-gray-50'>
      
      {/* Heading */}
      <h1 className='text-3xl font-semibold text-gray-800 mb-3'>
        Top Doctors to Book
      </h1>
      <p className='text-gray-500 text-center max-w-xl mb-12'>
        Simply browse through our extensive list of trusted doctors and book your appointment easily.
      </p>

      {/* Doctors Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl'>
        
        {doctors.slice(0,10).map((item,index) => (
          
          <div 
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index}
            className='bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer 
                       transform transition-all duration-500 
                       hover:-translate-y-3 hover:shadow-2xl'
          >

            {/* Image */}
            <div className='overflow-hidden'>
              <img 
                src={item.image} 
                alt={item.name}
                className='w-full h-56 object-cover transition-transform duration-500 hover:scale-110 bg-blue-50'
              />
            </div>

            {/* Content */}
            <div className='p-4'>

              {/* Availability */}
              <div className={`flex items-center gap-2 mb-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}>
                
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}>
                  {item.available ? 'Available' :'Not Available'}
                </p>

              </div>

              {/* Name */}
              <p className='text-lg font-semibold text-gray-900'>
                {item.name}
              </p>

              {/* Speciality */}
              <p className='text-gray-600 text-sm'>
                {item.speciality}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <button 
        onClick={() => {navigate('/doctors'); scrollTo(0,0)}} 
        className='mt-12 px-8 py-3 bg-blue-600 text-white rounded-full 
                   shadow-lg transition-all duration-300 
                   hover:bg-blue-700 hover:shadow-2xl hover:scale-105'
      >
        View More
      </button>

    </div>
  )
}

export default TopDoctors