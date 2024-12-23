
export interface User {
    username: string;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Resources {
  people?: string;
  planets: string;
  species: string;
  starships: string;
}
  
export interface ResourceCard {
    title: string;
    path: string;
    description: string;
    icon: string;
  }
  
export  interface Character {
    uid: string;
    name: string;
    url: string;
  }

export  interface CharacterDetails {
    properties: {
      height: string;
      mass: string;
      hair_color: string;
      skin_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      name: string;
    };
    description: string;
  }

export  interface CharacterFormInputs {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    description: string;
  }

export interface StarShip {
    uid: string;
    name: string;
    url: string;
}

export interface StarshipDetail {
  properties: {
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    name: string;
  };
  description: string;
}

export  interface StarshipFormInputs {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  name: string;
  description: string;
}

export interface Planet {
  uid: string;
  name: string;
  url: string;
}

export interface PlanetDetail {
  properties: {
    climate: string;
    diameter: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
  };
}

export  interface PlanetFormInputs {
    climate: string;
    diameter: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    rotation_period: string;
    surface_water: string;
    terrain: string;
};

export interface Species {
  uid: string;
  name: string;
  url: string;
}

export interface SpeciesDetail {
  properties: {
    average_height: string,
    average_lifespan: string,
    classification: string,
    designation: string,
    eye_colors: string,
    hair_colors: string,
    language: string,
    name: string,
    skin_colors: string,
  };
}

export  interface SpeciesFormInputs {
    average_height: string,
    average_lifespan: string,
    classification: string,
    designation: string,
    eye_colors: string,
    hair_colors: string,
    language: string,
    name: string,
    skin_colors: string,
};
