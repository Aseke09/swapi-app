import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoginForm } from './components/LoginForm';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CharacterList } from './pages/CharacterList';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './components/Dashboard';
import { CharacterDetail } from './pages/CharacterDetail';
import { StarshipLists } from './pages/Starships/StarshipLists';
import { StarshipDetails } from './pages/Starships/StarshipDetail';
import { PlanetList} from './pages/Planets/PlanetList';
import { PlanetDetails } from './pages/Planets/PlanetDetails';
import { SpecieList } from './pages/Species/SpeciesList';
import { SpeciesDetails } from './pages/Species/SpeciesDetails';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/"
          element={
            <ProtectedRoute>
               <Dashboard/>
            </ProtectedRoute>
            }
          />
          <Route path='/people/'
            element={
              <ProtectedRoute>
               <CharacterList/>
              </ProtectedRoute>
            }
          />
           <Route path='/people/:id'
            element={
              <ProtectedRoute>
               <CharacterDetail/>
              </ProtectedRoute>
            }
          /> 
          <Route path='/starships/'
            element={
              <ProtectedRoute>
               <StarshipLists/>
              </ProtectedRoute>
            }
          />
          <Route path='/starships/:id'
            element={
              <ProtectedRoute>
               <StarshipDetails/>
              </ProtectedRoute>
            }
          /> 
          <Route path='/planets/'
            element={
              <ProtectedRoute>
               <PlanetList/>
              </ProtectedRoute>
            }
          />
          <Route path='/planets/:id'
            element={
              <ProtectedRoute>
               <PlanetDetails/>
              </ProtectedRoute>
            }
          /> 
          <Route path='/species/'
            element={
              <ProtectedRoute>
               <SpecieList/>
              </ProtectedRoute>
            }
          />
          <Route path='/species/:id'
            element={
              <ProtectedRoute>
               <SpeciesDetails/>
              </ProtectedRoute>
            }
          /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
