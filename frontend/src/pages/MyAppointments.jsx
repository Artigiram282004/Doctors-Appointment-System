import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = [ " ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()     // refresh list
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initpay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            {
             razorpay_order_id: response.razorpay_order_id
            },// ✅ FIXED (send full response)
            { headers: { token } }
          )

          if (data.success) {
            toast.success("Payment Successful")
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          console.log(error)
          toast.error("Payment Verification Failed")
        }
      }
    }  // ✅ IMPORTANT: close options object

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function (response) {
      console.log("FAILED:", response)
      toast.error("Payment Failed ❌")
    })
    rzp.open()
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post( backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if(data.success) {
        initpay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect (() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])


  return (
    <div className='px-6 md:px-16 py-10'>

      {/* Heading */}
      <p className='text-2xl font-semibold text-gray-800 mb-6'>
        My Appointments
      </p>


      <div className='flex flex-col gap-6'>

        {appointments.filter(item => !item.cancelled).map((item, index) => (

          <div
            key={index}
            className='flex flex-col md:flex-row gap-6 
                       border rounded-xl p-4 shadow-sm
                       transition hover:shadow-lg'
          >

            {/* Image */}
            <div>
              <img
                src={item.docData.image}
                alt=""
                className='w-32 h-32 object-cover rounded-lg bg-blue-50'
              />
            </div>


            {/* Doctor Info */}
            <div className='flex-1 text-sm text-gray-600'>

              <p className='text-lg font-semibold text-gray-800'>
                {item.docData.name}
              </p>

              <p>{item.docData.speciality}</p>

              <p className='mt-2'>
                {item.docData.address?.line1} <br />
                {item.docData.address?.line2}
              </p>

              <p className='mt-2'>
                <span className='font-medium text-gray-700'>
                  Date & Time:
                </span>
                 {slotDateFormat(item.slotDate)} | {item.slotTime}
                
               
              </p>

            </div>


            {/* Buttons */}
            <div className='flex flex-col gap-3 justify-center'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500  bg-indigo-50'>Paid</button>}

              { !item.cancelled && !item.isCompleted && <button
                onClick={() => cancelAppointment(item._id)}
                className='px-4 py-2 border rounded-md 
                           hover:bg-red-500 hover:text-white
                           transition'
              >
                Cancel Appointment
              </button>}

              { !item.cancelled && !item.payment && !item.isCompleted && <button
                onClick={() => appointmentRazorpay(item._id)}
                className='px-4 py-2 border rounded-md 
                           hover:bg-primary hover:text-white
                           transition'
              >
                Pay Online
              </button>}

              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
              {
                item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>completed</button>
              }
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default MyAppointments