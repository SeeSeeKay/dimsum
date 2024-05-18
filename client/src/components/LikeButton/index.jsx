import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import { toast } from 'react-toastify';

const LikeButton = (props) => {
  // const {userInfo} = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    setSaved(!saved);

    console.log("LikeButton userId : "+props.userId);
    console.log("LikeButton propertyId : "+props.propertyId);

    const buyerSavedProperty = {
      userId: props.userId,
      propertyId: props.propertyId
    }

    if(saved){
      try{
        const res = api.post(`properties/save/add`, 
          buyerSavedProperty
          // ,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // }
        );
        toast.success("Property added into favourite list.");
      } catch(err){
        toast.error(err.message);
        console.log(err.message);
      }
    }
    else{
      try{
        const res = api.delete(`properties/save/remove/${props.userId}/${props.propertyId}`
        // ,
        //   {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   }
        );
        toast.success("Saved property removed successfully.");
      }
      catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  return (
    <button
      className={`heart-button ${saved ? 'saved' : ''}`}
      onClick={toggleLike}
    >
      ❤️
    </button>
  );
};

export default LikeButton;