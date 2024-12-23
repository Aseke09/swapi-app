import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { StarshipDetail, StarshipFormInputs  } from "../../types/types";

const validationSchema = yup.object().shape({
    
    MGLT: yup
      .string()
      .required(),
    cargo_capacity: yup
      .string()
      .required(),
    consumables: yup
      .string()
      .required(),
    cost_in_credits: yup
      .string()
      .required(),
    crew: yup
      .string()
      .required(),
    hyperdrive_rating: yup
      .string()
      .required(),
    length: yup
      .string()
      .required(),
    manufacturer: yup
      .string()
      .required(),
    max_atmosphering_speed: yup
      .string()
      .required(),
    model: yup
      .string()
      .required(),
    name: yup
      .string()
      .required(),
    passengers: yup
      .string()
      .required(),
    starship_class: yup
      .string()
      .required(),
    description: yup
      .string()
      .required(),
  });

export const StarshipDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [starship, setStarship] = useState<StarshipDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset} = useForm<StarshipFormInputs>({
      resolver: yupResolver(validationSchema),
    })
    

    useEffect(() => {
        const fetchData = async () => {
           setIsLoading(true)
           try {
            const response = await axios.get<{result: StarshipDetail}>(
                `https://swapi.tech/api/starships/${id}`
            );
            setStarship(response.data.result)
            reset({
                model: response.data.result.properties.model,
                starship_class: response.data.result.properties.starship_class,
                manufacturer: response.data.result.properties.manufacturer,
                cost_in_credits: response.data.result.properties.cost_in_credits,
                length: response.data.result.properties.length,
                crew: response.data.result.properties.crew,
                passengers: response.data.result.properties.passengers,
                max_atmosphering_speed: response.data.result.properties.max_atmosphering_speed, 
                hyperdrive_rating: response.data.result.properties.hyperdrive_rating,
                MGLT: response.data.result.properties.MGLT,
                cargo_capacity: response.data.result.properties.cargo_capacity,
                consumables: response.data.result.properties.consumables,
                name: response.data.result.properties.name,
                description: response.data.result.description,
              });
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           } catch(error) {
              console.error("Error occured while fetching data:", error)
           }
           setIsLoading(false)
        }
        fetchData();
    }, [id, reset]);


    const onSubmit = (data: StarshipFormInputs) => {
        if(starship) {
            const updatedStarship: StarshipDetail = {
                properties: {
                    model: data.model,
                    starship_class: data.starship_class,
                    manufacturer: data.manufacturer,
                    cost_in_credits: data.cost_in_credits,
                    length: data.length,
                    crew: data.crew,
                    passengers: data.passengers,
                    max_atmosphering_speed: data.max_atmosphering_speed,
                    hyperdrive_rating: data.hyperdrive_rating,
                    MGLT: data.MGLT,
                    cargo_capacity: data.cargo_capacity,
                    consumables: data.consumables,
                    name: data.name,
                  },
                  description: data.description
            };
            setStarship(updatedStarship);
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
                   onClick={() => navigate('/starships')}
                >
                  Back to List
            </button>
                <h3>{starship?.properties.name}</h3>
                <h4>{starship?.description}</h4>
                
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
               <div className="col-12 mb-3">
                 <label className="form-label">Description</label>
                 <textarea
                    className="form-control" rows={2}
                    {...register('description')}
                  />

                </div>
                <div className="col-md-6">
                   <h4>Information</h4>
                   <div className="mb-3">
                     <label className="form-label">Model</label>
                     <input type="text" className="form-control"
                      {...register('model')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Starship Class</label>
                     <input type="text" className="form-control"
                      {...register('starship_class')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Manufacturer</label>
                     <input type="text" className="form-control"
                      {...register('manufacturer')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Cost</label>
                     <input type="text" className="form-control"
                      {...register('cost_in_credits')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Length</label>
                     <input type="text" className="form-control"
                      {...register('length')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Hyperdrive Rating</label>
                     <input type="text" className="form-control"
                      {...register('hyperdrive_rating')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">MGLT</label>
                     <input type="text" className="form-control"
                      {...register('MGLT')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Atmospheric Speed</label>
                     <input type="text" className="form-control"
                      {...register('max_atmosphering_speed')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Crew</label>
                     <input type="text" className="form-control"
                      {...register('crew')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Passengers</label>
                     <input type="text" className="form-control"
                      {...register('passengers')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Cargo Capacity</label>
                     <input type="text" className="form-control"
                      {...register('cargo_capacity')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Consumables</label>
                     <input type="text" className="form-control"
                      {...register('consumables')}
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
                        model: starship?.properties.model,
                        starship_class: starship?.properties.starship_class,
                        manufacturer: starship?.properties.manufacturer,
                        cost_in_credits: starship?.properties.cost_in_credits,
                        length: starship?.properties.length,
                        crew: starship?.properties.crew,
                        passengers: starship?.properties.passengers,
                        max_atmosphering_speed: starship?.properties.max_atmosphering_speed, 
                        hyperdrive_rating: starship?.properties.hyperdrive_rating,
                        MGLT: starship?.properties.MGLT,
                        cargo_capacity: starship?.properties.cargo_capacity,
                        consumables: starship?.properties.consumables,
                        name: starship?.properties.name,
                        description: starship?.description,
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
                    <strong>Model:</strong> {starship?.properties.model}
                  </li>
                  <li className="list-group-item">
                    <strong>Starship Class:</strong> {starship?.properties.starship_class}
                  </li>
                  <li className="list-group-item">
                    <strong>Manufacturer:</strong> {starship?.properties.manufacturer}
                  </li>
                  <li className="list-group-item">
                    <strong>Cost:</strong> {starship?.properties.cost_in_credits}
                  </li>
                  <li className="list-group-item">
                    <strong>Length:</strong> {starship?.properties.length}
                  </li>
                  <li className="list-group-item">
                    <strong>Hyperdrive Rating:</strong> {starship?.properties.hyperdrive_rating}
                  </li>
                  <li className="list-group-item">
                    <strong>MGLT:</strong> {starship?.properties.MGLT}
                  </li>
                  <li className="list-group-item">
                    <strong>Atmospheric Speed:</strong> {starship?.properties.max_atmosphering_speed}
                  </li>
                  <li className="list-group-item">
                    <strong>Crew:</strong> {starship?.properties.crew}
                  </li>
                  <li className="list-group-item">
                    <strong>Passenger:</strong> {starship?.properties.passengers}
                  </li>
                  <li className="list-group-item">
                    <strong>Cargo Capacity:</strong> {starship?.properties.cargo_capacity}
                  </li>
                  <li className="list-group-item">
                    <strong>Consumables:</strong> {starship?.properties.consumables}
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