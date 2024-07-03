import React from 'react'
import { CiCirclePlus } from "react-icons/ci";

const Profile = () => {
  return (
    <div className='p-10 bg-[#F4F4F4] w-fit flex flex-col items-center gap-10 m-auto mt-24 shadow'>
      <div className='w-24 h-24 relative rounded-full overflow-hidden group'>
        <img src="/friend.png" className='w-full' alt="" />
        <div className='w-full h-full scale-0 group-hover:scale-100 transition-all cursor-pointer absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
            <CiCirclePlus className='text-3xl text-white'/>
        </div>
      </div>
      <h2 className='title'>User Name</h2>
    </div>
  )
}

export default Profile
