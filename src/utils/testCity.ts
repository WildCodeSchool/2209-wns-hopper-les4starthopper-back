export const createCity = `
  mutation createCity($data: CityInput!) {
    createCity(data: $data) {
      id
      name
    }
  }
`;

export const getCities = `
  query Cities {
    Cities{
      id
    }
  }
`;

export const getCity = `
  query city (cityId: ID!) {
    city {
        id
        name
    }
  }
`;

export const deleteCity = `
  mutation deleteCity ($cityId: ID!) {
    deleteCity (id: $cityId) {
      id
    }
  }
`;

export const updateCity = `
  mutation updateCity ($cityId: ID!, $name: String!) {
    updateCity (id: $cityId, name: $name) {
      id
      name
    }
  }
`;

export const deleteCities = `
  mutation deleteCities {
    deleteCities {
      id
    }
  }
`;
