import React, { createRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { GiCrossMark } from "react-icons/gi";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getDatabase,ref as dataref, child, push, update } from "firebase/database";
import { loggedUserData } from "../reducer/userSlice";
import { toast, ToastContainer } from "react-toastify";
const Profile = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  const storage = getStorage();
  const dispatch = useDispatch();
  const cropperRef = createRef();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();

  const handelChange = (e) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const handelClose = ()=>{
    setImage("")
    setCropData("")
  }

  const handelUpload = ()=>{
  
    uploadString(ref(storage, loggedUser.uid), cropData, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        update(dataref(db, 'users/' + loggedUser.uid),{
          photoURL: downloadURL,
        }).then(()=>{
          dispatch(loggedUserData({...loggedUser, photoURL: downloadURL}))
          setImage("")
          setCropData("")
          toast.success(
            "Profile picture uploaded successfully!"
          );
        })
      });
    });
  }
  console.log();
  return (
    <div className="p-10 bg-[#F4F4F4] w-fit flex flex-col items-center gap-10 m-auto mt-24 shadow">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="light"
        ></ToastContainer>
      {
        image &&
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-fit bg-brand z-50">
          <div className="p-2 flex items-center justify-between">
            <p className="text-xl text-white">Customize your image</p>
             <GiCrossMark className="text-2xl text-red-600 cursor-pointer" onClick={handelClose}/>
          </div>
        <Cropper
            // ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <div className="flex justify-center py-4 gap-3">
            <button onClick={getCropData} className="text-brand py-3 px-5 bg-white rounded-xl font-semibold">
                Crop Image
            </button>
            {
              cropData &&
            <button onClick={handelUpload} className="text-white py-3 px-5 bg-green-600 rounded-xl font-semibold">
              Upload
            </button>
            }
          </div>
          {
            cropData &&
            <div className="w-24 h-24 relative rounded-full overflow-hidden m-auto border-2 border-white mb-4">
              <img src={cropData} alt="" className="w-full h-full"/>
            </div>
          }
      </div>
      }
      <div className="w-24 h-24 relative rounded-full overflow-hidden group">
        <img src={loggedUser?.photoURL} className="w-full h-full" alt="profile" />
        <label htmlFor="img" className="w-full h-full scale-0 group-hover:scale-100 transition-all cursor-pointer absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <CiCirclePlus className="text-3xl text-white" />
          <input id="img" type="file" onChange={handelChange} className="hidden"/>
        </label>
      </div>
      <h2 className="title">{loggedUser?.displayName}</h2>
    </div>
  );
};

export default Profile;
