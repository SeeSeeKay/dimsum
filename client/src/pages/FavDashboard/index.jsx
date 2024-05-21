import React, { useState, useEffect } from 'react';
import Layout from "../../Layout/DashLayout";
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import PropertyCard from '../../components/PropertyCard';

const FavDashboard = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const getSavedProperties = async () => {
      try {
        console.log("FavDashboard userId : "+userInfo.data._id);
        const savedres = await api.get(`properties/save/${userInfo.data._id}`);
        console.log("FavDashboard savedProperties : "+savedres.data);
        setSavedProperties(savedres.data);
        const propertiesData = await Promise.all(
          savedres.data.map(async (p) => {
            console.log("FavDashboard propertyId : "+p.propertyId);
            const res = await api.get(`/properties/${p.propertyId}`);
            console.log("FavDashboard Properties : "+res.data);
            return res.data;
          })
        )
        console.log("FavDashBoard propertiesData : "+propertiesData);
        setProperties(propertiesData);
        console.log("Retrieved savedProperties successfully.");
      }catch(error){
        toast.error(error.message);
        console.log(error.message);
      }
    }
    getSavedProperties();
  }, [userInfo.data._id]);

  useEffect(() => {
    console.log("FavDashBoard properties : "+properties);
  }, [properties]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto h-[79vh]">
        <div className="flex flex-col text-center w-full mb-16">
          <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
            Favourite Properties
          </strong>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to your favourtite dashboard!</p>
        </div>
          { savedProperties.length === 0 || properties === null? 
            <div className='w-full h-32 m-auto '>
              <p className='text-3xl text-gray-400 font-samibold mb-7'>No favorite properties</p>
            </div> :        
            properties.map((p, index) => {
              return <PropertyCard propsCard={p} key={index} />
            })
          }
        </div>
      </section>
    </Layout>
  );
};

export default FavDashboard;
