import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const { userData, setUserData, backendUrl, token, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  // ✅ Prevent crash
  if (!userData) {
    return <p className='text-center mt-10'>Loading...</p>
  }

  const safeAddress = userData.address || { line1: '', line2: '' }

  // ✅ SAVE FUNCTION
  const handleSave = async () => {
    try {
      const formData = new FormData()

      formData.append("name", userData.name || '')
      formData.append("phone", userData.phone || '')
      formData.append("gender", userData.gender || '')
      formData.append("dob", userData.dob || '')
      formData.append("address", JSON.stringify(userData.address || {}))

      // ✅ image upload
      if (image) {
        formData.append("image", image)
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success("Profile Updated ✅")
        setIsEdit(false)
        setImage(false)
        await loadUserProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>

      <div className='w-full max-w-2xl bg-white border rounded-2xl shadow-lg p-8'>

        {/* ================= IMAGE ================= */}
        <div className='flex flex-col items-center gap-3'>

          {
            isEdit ? (
              <label htmlFor="image" className='cursor-pointer'>

                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  className='w-32 h-32 rounded-full object-cover'
                />

                <img
                  src={assets.upload_icon}
                  className='w-6 mt-2 mx-auto'
                />

                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />

              </label>
            ) : (
              <img
                src={userData.image}
                className='w-32 h-32 rounded-full object-cover'
              />
            )
          }

          {/* ================= NAME ================= */}
          {
            isEdit ? (
              <input
                type="text"
                value={userData.name || ''}
                onChange={e =>
                  setUserData(prev => ({ ...prev, name: e.target.value }))
                }
                className='border p-2 rounded text-center'
              />
            ) : (
              <p className='text-xl font-semibold'>{userData.name}</p>
            )
          }

        </div>

        <hr className='my-6' />

        {/* ================= INFO ================= */}
        <div className='flex flex-col gap-4 text-sm'>

          <p className='text-lg font-semibold'>Contact Information</p>

          {/* Email */}
          <div className='flex justify-between'>
            <p>Email:</p>
            <p>{userData.email}</p>
          </div>

          {/* Phone */}
          <div className='flex justify-between'>
            <p>Phone:</p>

            {
              isEdit ? (
                <input
                  type="text"
                  value={userData.phone || ''}
                  onChange={e =>
                    setUserData(prev => ({ ...prev, phone: e.target.value }))
                  }
                  className='border p-1 rounded'
                />
              ) : (
                <p>{userData.phone}</p>
              )
            }
          </div>

          {/* Address */}
          <div className='flex justify-between gap-4'>
            <p>Address:</p>

            {
              isEdit ? (
                <div className='flex flex-col gap-1'>
                  <input
                    type="text"
                    placeholder="Line 1"
                    value={safeAddress.line1}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: {
                          ...safeAddress,
                          line1: e.target.value
                        }
                      }))
                    }
                    className='border p-1 rounded'
                  />

                  <input
                    type="text"
                    placeholder="Line 2"
                    value={safeAddress.line2}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: {
                          ...safeAddress,
                          line2: e.target.value
                        }
                      }))
                    }
                    className='border p-1 rounded'
                  />
                </div>
              ) : (
                <p>
                  {safeAddress.line1}, {safeAddress.line2}
                </p>
              )
            }
          </div>

          {/* Gender */}
          <div className='flex justify-between'>
            <p>Gender:</p>

            {
              isEdit ? (
                <select
                  value={userData.gender || ''}
                  onChange={e =>
                    setUserData(prev => ({ ...prev, gender: e.target.value }))
                  }
                  className='border p-1 rounded'
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )
            }
          </div>

          {/* DOB */}
          <div className='flex justify-between'>
            <p>Date of Birth:</p>

            {
              isEdit ? (
                <input
                  type="date"
                  value={userData.dob || ''}
                  onChange={e =>
                    setUserData(prev => ({ ...prev, dob: e.target.value }))
                  }
                  className='border p-1 rounded'
                />
              ) : (
                <p>{userData.dob}</p>
              )
            }
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        <div className='flex justify-center mt-6'>

          <button
            onClick={isEdit ? handleSave : () => setIsEdit(true)}
            className='px-6 py-2 bg-primary text-white rounded-full'
          >
            {isEdit ? "Save" : "Edit"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default MyProfile