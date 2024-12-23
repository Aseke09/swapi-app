import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { CharacterDetails, CharacterFormInputs } from "../types/types";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  height: yup
    .string()
    .required(),
  mass: yup
    .string()
    .required(),
  hair_color: yup
    .string()
    .required(),
  skin_color: yup
    .string()
    .required(),
  eye_color: yup
    .string()
    .required(),
  birth_year: yup
    .string()
    .required(),
  gender: yup
    .string()
    .required(),
  description: yup
    .string()
    .required()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
});


export const CharacterDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<CharacterDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset} = useForm<CharacterFormInputs>({
      resolver: yupResolver(validationSchema),
      mode: 'onBlur'
    })
    

    useEffect(() => {
        const fetchCharacterDetails = async () => {
           setIsLoading(true)
           try {
            const response = await axios.get<{result: CharacterDetails}>(
                `https://swapi.tech/api/people/${id}`
            );
            setCharacter(response.data.result)
            
            reset({
                name: response.data.result.properties.name,
                height: response.data.result.properties.height,
                mass: response.data.result.properties.mass,
                hair_color: response.data.result.properties.hair_color,
                skin_color: response.data.result.properties.skin_color,
                eye_color: response.data.result.properties.eye_color,
                birth_year: response.data.result.properties.birth_year,
                gender: response.data.result.properties.gender,
                description: response.data.result.description
              });
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           } catch(error) {
              console.error("Error occured while fetching data:", error)
           }
           setIsLoading(false)
        }
        fetchCharacterDetails();
    }, [id, reset]);


    const onSubmit = (data: CharacterFormInputs) => {
        if(character) {
            const updatedCharacter: CharacterDetails = {
                properties: {
                    name: data.name,
                    height: data.height,
                    mass: data.mass,
                    hair_color: data.hair_color,
                    skin_color: data.skin_color,
                    eye_color: data.eye_color,
                    birth_year: data.birth_year,
                    gender: data.gender
                },
                description: data.description
            };
            setCharacter(updatedCharacter);
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
            <h2>Character Details</h2>
            <div className="card-header d-flex justify-content-between align-items-center">
            <button
                   className="btn btn-primary"
                   onClick={() => navigate('/people')}
                >
                  Back to List
            </button>
                <h3>{character?.properties.name}</h3>
                <h4>{character?.description}</h4>
                
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
                     <label className="form-label">Name</label>
                     <input type="text" className="form-control"
                      {...register('name')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Birth Year</label>
                     <input type="text" className="form-control"
                      {...register('birth_year')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Gender</label>
                     <input type="text" className="form-control"
                      {...register('gender')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Height</label>
                     <input type="text" className="form-control"
                      {...register('height')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Mass</label>
                     <input type="text" className="form-control"
                      {...register('mass')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Hair Color</label>
                     <input type="text" className="form-control"
                      {...register('hair_color')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Skin Color</label>
                     <input type="text" className="form-control"
                      {...register('skin_color')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Eye Color</label>
                     <input type="text" className="form-control"
                      {...register('eye_color')}
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
                      name: character?.properties.name,
                      height: character?.properties.height,
                      mass: character?.properties.mass,
                      hair_color: character?.properties.hair_color,
                      skin_color: character?.properties.skin_color,
                      eye_color: character?.properties.eye_color,
                      birth_year: character?.properties.birth_year,
                      gender: character?.properties.gender,
                      description: character?.description
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
                    <strong>Height:</strong> {character?.properties.height}
                  </li>
                  <li className="list-group-item">
                    <strong>Mass:</strong> {character?.properties.mass}
                  </li>
                  <li className="list-group-item">
                    <strong>Hair Color:</strong> {character?.properties.hair_color}
                  </li>
                  <li className="list-group-item">
                    <strong>Skin Color:</strong> {character?.properties.skin_color}
                  </li>
                  <li className="list-group-item">
                    <strong>Eye Color:</strong> {character?.properties.eye_color}
                  </li>
                  <li className="list-group-item">
                    <strong>Birth Year:</strong> {character?.properties.birth_year}
                  </li>
                  <li className="list-group-item">
                    <strong>Gender:</strong> {character?.properties.gender}
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
