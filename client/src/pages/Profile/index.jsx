import React from 'react'
import { useEffect, useState, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../store/user/apiSlice';
import { setUserInfo } from '../../store/user/authSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(userInfo ? {username: userInfo.data.username, email: userInfo.data.email, phone: userInfo.data.phone} : {});
  const [passwordShown, setPasswordShown] = useState(false);
  const [imageForDisplay, setImageForDisplay] = useState(null);

  const dispatch = useDispatch();

  const togglePassword = () => setPasswordShown(!passwordShown);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  if (!userInfo) return toast.error('Not logged in!');

  

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatarBase64') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({
          ...formData,
          [name]: base64String
        });
        setImageForDisplay(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(formData).unwrap();
      dispatch(setUserInfo(res));
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error?.message);
    }
  };

  const getImageSrc = () => {
    if (imageForDisplay) return imageForDisplay;
    if (userInfo?.data?.avatarBase64) return `${userInfo.data.avatarBase64}`;
    return `${userInfo.data.avatarBase64}`;
  };

  return (
    <Layout>
      <section className="w-full h-full">
        <div className="container mx-auto px-4 my-12 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-2/3 md:max-w-96 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
                      Update profile
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleUpdate}>
                    {/* Image */}
                    <div className="relative w-full mb-6">
                      <input 
                        type="file" 
                        hidden 
                        ref={fileRef} 
                        accept='image/*'
                        name='avatarBase64'
                        onChange={handleChange}
                      />
                      <img 
                        src={getImageSrc()}
                        alt="avatarBase64" 
                        onClick={() => fileRef.current.click()}
                        className='w-1/3 mx-auto cursor-pointer rounded-full hover:shadow-lg shadow-md hover:border-2 border-gray-300'
                      />
                    </div>
                    {/* Username */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Username"
                        style={{ transition: "all .15s ease" }}
                        defaultValue={userInfo?.data?.username}
                        id="username"
                        name="username"
                        onChange={handleChange}
                        autoComplete='username'
                      />
                    </div>
                    {/* Email */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Email"
                        defaultValue={userInfo?.data?.email}
                        id="email"
                        name="email"
                        onChange={handleChange}
                        autoComplete='email'
                        readOnly
                      />
                    </div>
                    {/* Phone number */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Phone number"
                        defaultValue={userInfo?.data?.phone}
                        id='phone'
                        name="phone"
                        onChange={handleChange}
                        autoComplete='number'
                      />
                    </div>
                    {/* Submit button */}
                    <div className="text-center mt-10">
                      <button
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }} >
                        {isLoading ? 'Loading...' : 'Update'}
                      </button>
                    </div>
                  </form>
                  {/* Change Password Button */}
                  <div className="relative w-full mb-3">
                      <Link to="/change-password" className="text-secondary text-sm font-bold">
                        Change Password
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
