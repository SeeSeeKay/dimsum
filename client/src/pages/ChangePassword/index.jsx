import React from 'react'
import { useState, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../store/user/apiSlice';
import { setUserInfo } from '../../store/user/authSlice';

export default function ChangePassword() {
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: userInfo.data.username });
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  const togglePassword = () => setPasswordShown(!passwordShown);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  if (!userInfo) return toast.error('Not logged in!');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
                      Change Password
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleUpdate}>
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
                        readOnly
                      />
                    </div>
                    {/* Current Password */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Current Password
                      </label>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Current Password"
                        style={{ transition: "all .15s ease" }}
                        id='currentPassword'
                        name="currentPassword"
                        onChange={handleChange}
                        autoComplete='current-password'
                      />
                      <span onClick={togglePassword} className='text-gray-700 text-2xl absolute right-3 top-[53%]'>
                        {passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </span>
                    </div>
                    {/* The new Password */}
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        New Password
                      </label>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="New Password"
                        style={{ transition: "all .15s ease" }}
                        id='newPassword'
                        name="newPassword"
                        onChange={handleChange}
                        autoComplete='new-password'
                      />
                    </div>
                    {/* Submit button */}
                    <div className="text-center mt-10">
                      <button
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }} >
                        {isLoading ? 'Loading...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
