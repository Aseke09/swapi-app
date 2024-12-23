import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Planet } from "../../types/types";



export const PlanetList = () => {
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`
                    https://www.swapi.tech/api/planets?page=${currentPage}&limit=10
                    `);
                setPlanets(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Error fetching characters:', error)
            }
            setIsLoading(false)
        }

      fetchData();  
     },[currentPage]);


const handleClick = (uid: string) => {
        navigate(`/planets/${uid}`);
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
        <h2 className="mb-4">Star Wars Universe Planets</h2>
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
                    {planets.map((planet) => (
                        <tr 
                         key={planet.uid}
                         onClick={() => handleClick(planet.uid)}
                         style={{cursor: 'pointer'}}
                        >
                         <td>{planet.uid}</td>
                         <td>{planet.name}</td>
                         <td>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClick(planet.uid)
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