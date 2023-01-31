export const createPointOfInterest = `
  mutation createPointOfInterest($data: PointOfInterestInput!, $categoryId: Float!) {
    createPointOfInterest(data: $data, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const PointOfinterests = `
  query PointOfinterests {
    PointOfinterests{
      id
    }
  }
`;

export const pointOfInterest = `
  query pointOfInterest (poiId: ID!) {
    pointOfInterest {
        id
        name
    }
  }
`;

export const deletePointOfInterest = `
  mutation deletePointOfInterest ($poiId: ID!) {
    deletePointOfInterest (id: $poiId) {
      id
    }
  }
`;

export const updatePointOfInterest = `
  mutation updatePointOfInterest ($poiId: ID!, $description: String!) {
    updatePointOfInterest (id: $poiId, description: $description) {
      id
      description
    }
  }
`;

export const deletePointOfinterests = `
  mutation deletePointOfinterests {
    deletePointOfinterests {
      id
    }
  }
`;
