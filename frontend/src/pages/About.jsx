import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-6 md:px-16'>

      {/* Heading */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          ABOUT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>


      {/* About Section */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image */}
        <div className='overflow-hidden rounded-xl shadow-lg'>
          <img
            className='w-full md:max-w-[360px] transition duration-500 hover:scale-110'
            src={assets.about_image}
            alt=""
          />
        </div>


        {/* Text */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>

          <p className='leading-6'>
            Welcome to our Doctor Appointment Booking System. Our platform helps
            patients easily find trusted doctors and book appointments without
            any hassle.
          </p>

          <p className='leading-6'>
            We aim to make healthcare accessible and simple by providing a smooth
            online experience for booking consultations with experienced medical
            professionals.
          </p>

          <b className='text-gray-800 text-lg'>
            Our Vision
          </b>

          <p className='leading-6'>
            Our vision is to build a reliable healthcare platform where patients
            can quickly connect with doctors, save time, and get the best medical
            support whenever needed.
          </p>

        </div>

      </div>



      {/* WHY CHOOSE US */}
      <div className='text-xl my-6 text-center'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>



      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>

        {/* Card 1 */}
        <div
          className='border rounded-xl p-6 shadow-md transition-all duration-500 
                     hover:shadow-2xl hover:-translate-y-2 hover:bg-primary hover:text-white'
        >
          <b className='text-lg'>Efficiency</b>
          <p className='mt-2 text-sm'>
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>


        {/* Card 2 */}
        <div
          className='border rounded-xl p-6 shadow-md transition-all duration-500 
                     hover:shadow-2xl hover:-translate-y-2 hover:bg-primary hover:text-white'
        >
          <b className='text-lg'>Convenience</b>
          <p className='mt-2 text-sm'>
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>


        {/* Card 3 */}
        <div
          className='border rounded-xl p-6 shadow-md transition-all duration-500 
                     hover:shadow-2xl hover:-translate-y-2 hover:bg-primary hover:text-white'
        >
          <b className='text-lg'>Personalization</b>
          <p className='mt-2 text-sm'>
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About