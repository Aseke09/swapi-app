import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { PlanetDetail, PlanetFormInputs  } from "../../types/types";

const validationSchema = yup.object().shape({
    climate: yup
      .string()
      .required(),
    diameter: yup
      .string()
      .required(),
    gravity: yup
      .string()
      .required(),
    name: yup
      .string()
      .required(),
    orbital_period: yup
      .string()
      .required(),
    population: yup
      .string()
      .required(),
    rotation_period: yup
      .string()
      .required(),
    surface_water: yup
      .string()
      .required(),
    terrain: yup
      .string()
      .required(),
  });

export const PlanetDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [planets, setPlanets] = useState<PlanetDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset} = useForm<PlanetFormInputs>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    })
    

    useEffect(() => {
        const fetchData = async () => {
           setIsLoading(true)
           try {
            const response = await axios.get<{result: PlanetDetail}>(
                `https://swapi.tech/api/planets/${id}`
            );
            setPlanets(response.data.result)
            reset({
                climate: response.data.result.properties.climate,
                diameter: response.data.result.properties.diameter,
                gravity: response.data.result.properties.gravity,
                name: response.data.result.properties.name,
                orbital_period: response.data.result.properties.orbital_period,
                population: response.data.result.properties.population,
                rotation_period: response.data.result.properties.rotation_period,
                surface_water: response.data.result.properties.surface_water, 
                terrain: response.data.result.properties.terrain,
              });
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           } catch(error) {
              console.error("Error occured while fetching data:", error)
           }
           setIsLoading(false)
        }
        fetchData();
    }, [id, reset]);


    const onSubmit = (data: PlanetFormInputs) => {
        if(planets) {
            const updatedPlanet: PlanetDetail = {
                properties: {
                    climate: data.climate,
                    diameter: data.diameter,
                    gravity: data.gravity,
                    name: data.name,
                    orbital_period: data.orbital_period,
                    population: data.population,
                    rotation_period: data.rotation_period,
                    surface_water: data.rotation_period,
                    terrain: data.terrain,
                  }
            };
            setPlanets(updatedPlanet);
            setIsEditing(false);
        }
    };

    if(isLoading) {
        return (
          <div className="container mt-5 text-center">
             <div className="spinner-border" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
          </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card">
            <h2>Starship Details</h2>
            <div className="card-header d-flex justify-content-between align-items-center">
            <button
                   className="btn btn-primary"
                   onClick={() => navigate('/planets')}
                >
                  Back to List
            </button>
                <h3>{planets?.properties.name}</h3>
                <h4>Planet of Star Wars Universe</h4>
                
                {!isEditing && (
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            </div>
          </div>
         <div className="card-body">
           {isEditing ? (
             <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                <div className="col-md-6">
                   <h4>Information</h4>
                   <div className="mb-3">
                     <label className="form-label">Climate</label>
                     <input type="text" className="form-control"
                      {...register('climate')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Diameter</label>
                     <input type="text" className="form-control"
                      {...register('diameter')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Gravity</label>
                     <input type="text" className="form-control"
                      {...register('gravity')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Name</label>
                     <input type="text" className="form-control"
                      {...register('name')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Orbital period</label>
                     <input type="text" className="form-control"
                      {...register('orbital_period')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Population</label>
                     <input type="text" className="form-control"
                      {...register('population')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Rotation period</label>
                     <input type="text" className="form-control"
                      {...register('rotation_period')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Surface period</label>
                     <input type="text" className="form-control"
                      {...register('surface_water')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Terrain</label>
                     <input type="text" className="form-control"
                      {...register('terrain')}
                     />
                   </div>
                   
                   
                </div>
                <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary me-2">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    
                    reset({
                        climate: planets?.properties.climate,
                        diameter: planets?.properties.diameter,
                        gravity: planets?.properties.gravity,
                        name: planets?.properties.name,
                        orbital_period: planets?.properties.orbital_period,
                        population: planets?.properties.population,
                        rotation_period: planets?.properties.rotation_period,
                        surface_water: planets?.properties.surface_water, 
                        terrain: planets?.properties.terrain,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
             </form>
           ) : (
            <>
             
             <div className="row">
               <div className="col-md-6">
                <h4>Characteristics</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Climate:</strong> {planets?.properties.climate}
                  </li>
                  <li className="list-group-item">
                    <strong>Diameter:</strong> {planets?.properties.diameter}
                  </li>
                  <li className="list-group-item">
                    <strong>Gravity:</strong> {planets?.properties.gravity}
                  </li>
                  <li className="list-group-item">
                    <strong>Name:</strong> {planets?.properties.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Orbital period:</strong> {planets?.properties.orbital_period}
                  </li>
                  <li className="list-group-item">
                    <strong>Population:</strong> {planets?.properties.population}
                  </li>
                  <li className="list-group-item">
                    <strong>Rotation period:</strong> {planets?.properties.rotation_period}
                  </li>
                  <li className="list-group-item">
                    <strong>Surface water:</strong> {planets?.properties.surface_water}
                  </li>
                  <li className="list-group-item">
                    <strong>Terrain:</strong> {planets?.properties.terrain}
                  </li>
                </ul>
               </div>
             </div>
            </>
           )}
         </div>
        </div>
    )
}