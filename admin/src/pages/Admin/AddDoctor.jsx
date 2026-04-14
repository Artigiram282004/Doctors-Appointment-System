import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')

    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()


        try{
             
            if(!docImg) {

                return toast.error('Image Not Selected')

            }

            const formData = new FormData()


            formData.append('image',docImg)
            formData.append('email',email)
            formData.append('name',name)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            //console log formdata

            formData.forEach((value,key)=>{

                console.log(`${key} : ${value}`);

            })

            const { data } = await axios.post( backendUrl + '/api/admin/add-doctor',formData,{ headers: {aToken} })

            if (data.success) {
               toast.success(data.message)
               setDocImg(false)
               setName('')
               setPassword('')
               setEmail('')
               setAddress1('')
               setAddress2('')
               setDegree('')
               setAbout('')
               setFees('')
            } else {
               toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)
            console.log(error)

        }
    }



    
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">

      {/* Title */}
      <p className="mb-6 text-xl font-semibold text-gray-700">
        Add Doctor
      </p>

      <div className="bg-white px-8 py-8 border rounded-xl shadow-sm">

        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img 
              className="w-16 h-16 bg-gray-100 rounded-full object-cover hover:opacity-80 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
              alt="" 
            />
          </label>

          <input  onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4">

            <div>
              <p className="text-sm text-gray-600">Doctor Name</p>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600">Doctor Email</p>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600">Doctor Password</p>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <select value={experience} onChange={(e)=>setExperience(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none">
                {[...Array(10)].map((_, i) => (
                  <option key={i}>{i + 1} Year</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-600">Fees</p>
              <input value={fees} onChange={(e)=>setFees(e.target.value)} type="number" placeholder="Fees" required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4">

            <div>
              <p className="text-sm text-gray-600">Speciality</p>
              <select value={speciality} onChange={(e)=>setSpeciality(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none">
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-600">Education</p>
              <input value={degree} onChange={(e)=>setDegree(e.target.value)} type="text" placeholder="Education" required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600">Address</p>
              <input value={address1} onChange={(e)=>setAddress1(e.target.value)} type="text" placeholder="Address Line 1" required
                className="w-full px-3 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input value={address2} onChange={(e)=>setAddress2(e.target.value)} type="text" placeholder="Address Line 2" required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="text-sm text-gray-600">About Doctor</p>
          <textarea value={about} onChange={(e)=>setAbout(e.target.value)} rows={5} placeholder="Write about doctor" required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Button */}
        <button 
          type="submit"
          className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Doctor
        </button>

      </div>
    </form>
  )
}

export default AddDoctor