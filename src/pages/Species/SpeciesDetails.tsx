import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { SpeciesDetail, SpeciesFormInputs  } from "../../types/types";

const validationSchema = yup.object().shape({
    average_height: yup
      .string()
      .required(),
    average_lifespan: yup
      .string()
      .required(),
    classification: yup
      .string()
      .required(),
    designation: yup
      .string()
      .required(),
    eye_colors: yup
      .string()
      .required(),
    hair_colors: yup
      .string()
      .required(),
    language: yup
      .string()
      .required(),
    name: yup
      .string()
      .required(),
    skin_colors: yup
      .string()
      .required(),
  });

export const SpeciesDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [species, setSpecies] = useState<SpeciesDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset} = useForm<SpeciesFormInputs>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    })
    

    useEffect(() => {
        const fetchData = async () => {
           setIsLoading(true)
           try {
            const response = await axios.get<{result: SpeciesDetail}>(
                `https://swapi.tech/api/species/${id}`
            );
            setSpecies(response.data.result)
            
            reset({
                average_height: response.data.result.properties.average_height,
                average_lifespan: response.data.result.properties.average_lifespan,
                classification: response.data.result.properties.classification,
                designation: response.data.result.properties.designation,
                eye_colors: response.data.result.properties.eye_colors,
                hair_colors: response.data.result.properties.hair_colors,
                language: response.data.result.properties.language,
                name: response.data.result.properties.name, 
                skin_colors: response.data.result.properties.skin_colors,
              });
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           } catch(error) {
              console.error("Error occured while fetching data:", error)
           }
           setIsLoading(false)
        }
        fetchData();
    }, [id, reset]);


    const onSubmit = (data: SpeciesFormInputs) => {
        if(species) {
            const updatedSpecies: SpeciesDetail = {
                properties: {
                    average_height: data.average_height,
                    average_lifespan: data.average_lifespan,
                    classification: data.classification,
                    designation: data.designation,
                    eye_colors: data.eye_colors,
                    hair_colors: data.hair_colors,
                    language: data.language,
                    name: data.name,
                    skin_colors: data.skin_colors,
                  }
            };
            setSpecies(updatedSpecies);
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
                <h3>{species?.properties.name}</h3>
                <h4>Species of Star Wars Universe</h4>
                
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
                     <label className="form-label">Average Height</label>
                     <input type="text" className="form-control"
                      {...register('average_height')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Average Lifispan</label>
                     <input type="text" className="form-control"
                      {...register('average_lifespan')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Classification</label>
                     <input type="text" className="form-control"
                      {...register('classification')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Designation</label>
                     <input type="text" className="form-control"
                      {...register('designation')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Eye Colors</label>
                     <input type="text" className="form-control"
                      {...register('eye_colors')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Hair Colors</label>
                     <input type="text" className="form-control"
                      {...register('hair_colors')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Language</label>
                     <input type="text" className="form-control"
                      {...register('language')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Name</label>
                     <input type="text" className="form-control"
                      {...register('name')}
                     />
                   </div>
                   <div className="mb-3">
                     <label className="form-label">Skin Colors</label>
                     <input type="text" className="form-control"
                      {...register('skin_colors')}
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
                        average_height: species?.properties.average_height,
                        average_lifespan: species?.properties.average_lifespan,
                        classification: species?.properties.classification,
                        designation: species?.properties.designation,
                        eye_colors: species?.properties.eye_colors,
                        hair_colors: species?.properties.hair_colors,
                        language: species?.properties.language,
                        name: species?.properties.name, 
                        skin_colors: species?.properties.skin_colors,
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
                    <strong>Average Height:</strong> {species?.properties.average_height}
                  </li>
                  <li className="list-group-item">
                    <strong>Average Lifespan:</strong> {species?.properties.average_lifespan}
                  </li>
                  <li className="list-group-item">
                    <strong>Classification:</strong> {species?.properties.classification}
                  </li>
                  <li className="list-group-item">
                    <strong>Designation:</strong> {species?.properties.designation}
                  </li>
                  <li className="list-group-item">
                    <strong>Eye Colors:</strong> {species?.properties.eye_colors}
                  </li>
                  <li className="list-group-item">
                    <strong>Hair Colors:</strong> {species?.properties.hair_colors}
                  </li>
                  <li className="list-group-item">
                    <strong>Language:</strong> {species?.properties.language}
                  </li>
                  <li className="list-group-item">
                    <strong>Name:</strong> {species?.properties.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Skin Colors:</strong> {species?.properties.skin_colors}
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