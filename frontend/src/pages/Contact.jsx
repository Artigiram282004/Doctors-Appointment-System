import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-6 md:px-16'>

      {/* Heading */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>


      {/* Contact Section */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image */}
        <div className='overflow-hidden rounded-xl shadow-lg'>
          <img
            className='w-full md:max-w-[400px] transition duration-500 hover:scale-110'
            src={assets.contact_image}
            alt=""
          />
        </div>


        {/* Info Card */}
        <div
          className='flex flex-col gap-4 text-sm text-gray-600 
                     border rounded-xl p-6 shadow-md 
                     transition-all duration-500 
                     hover:shadow-2xl hover:-translate-y-1'
        >

          <p className='text-lg font-semibold text-gray-800'>
            Our Office
          </p>

          <p>
            Thergaon, Dange Chowk <br />
            Pune - 411014
          </p>

          <p>
            Phone: +91 8799887843 <br />
            Email: artigiram3@gmail.com
          </p>

          <p className='text-lg font-semibold text-gray-800 mt-2'>
            Careers at Doctors Appointment
          </p>

          <p>
            Learn more about our teams and job openings.
          </p>


          {/* Button */}
          <button
            className='w-fit px-6 py-2 border border-primary text-primary rounded-full 
                       transition-all duration-300 
                       hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg'
          >
            Explore Jobs
          </button>

        </div>

      </div>

    </div>
  )
}

export default Contact