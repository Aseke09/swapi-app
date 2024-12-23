import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Character } from "../types/types";


export const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fectCharacters = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`
                    https://www.swapi.tech/api/people?page=${currentPage}&limit=10
                    `);
                setCharacters(response.data.results);
                setTotalPages(response.data.total_pages);
                
            } catch (error) {
                console.error('Error fetching characters:', error)
            }
            setIsLoading(false)
        }

      fectCharacters();  
     },[currentPage]);


const handleCharacterClick = (uid: string) => {
        navigate(`/people/${uid}`);
     };

if(isLoading){
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
        <h2 className="mb-4">Star Wars Characters</h2>
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map((character) => (
                        <tr 
                         key={character.uid}
                         onClick={() => handleCharacterClick(character.uid)}
                         style={{cursor: 'pointer'}}
                        >
                         <td>{character.uid}</td>
                         <td>{character.name}</td>
                         <td>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCharacterClick(character.uid)
                              }}      
                            >
                              View Details
                            </button>
                         </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            >
             Previous
          </button>
          <span className="align-self-center mx-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
    </div>
)
}

