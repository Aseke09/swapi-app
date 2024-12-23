import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Resources } from '../types/types';

export const Dashboard = () => {
    const [resources, setResources] = useState<Resources>();
    const navigate = useNavigate();

    const getResourceIcon = (key: string): string => {
        const icons: Record<string, string> = {
          people: "bi bi-person",
          planets: "bi bi-globe",
          species: "bi bi-robot",
          starships: "bi bi-star",
        };
        return icons[key] || "bi bi-star";
      };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.swapi.tech/api');

                const filteredResources: Resources = {};
                const desiredResources = ['people', 'planets', 'species', 'starships'];
                
                Object.entries(response.data.result).forEach(([key, value]) => {
                  if (desiredResources.includes(key)) {
                    filteredResources[key as keyof Resources] = value as string;
                  }
                });
                    setResources(filteredResources);
                
                
            } catch (error) {
                console.error('Error fetching resources:', error)
            }
        }
        fetchData();
    }, [])

    if(!resources) {
        return (
            <div className='container mt-5 text-center'>
               <div className='spinner-border' role="status">
                  <span className='visually-hidden'>Loading...</span>
               </div>
            </div>
        );
    }

    return (
        <div className='container mt-4'>
          <h1 className='text-center mb-4'>
            Star Wars Universe Explorer click to further explore 
          </h1>
          <div className='row g-4'>
            {Object.keys(resources).map((key, i) => (
                <div key={i} className='col-md-4'>
                  <div className='card h-100 shadow-sm'
                       style={{cursor: 'pointer'}}
                       onClick={() => navigate(`/${key}`)}
                  >
                   <div className='card'>
                     <div className='d-flex align-items-center mb-3 ms-3'>
                       <i className={`${getResourceIcon(key)} fs-2 me-2`}></i>
                       
                     </div>
                     <div className='card-body'>
                       <h5 className='card-title text-capitalize text-center'>{key}</h5>
                       <p className='card-text text-center'>Click to explore</p>
                     </div>
                     
                   </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    )
}