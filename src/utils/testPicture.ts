export const createPicture = `
  mutation uploadPicture($data: PictureInput!) {
    uploadPicture(data: $data) {
      id
      url
    }
  }
`;

export const getPictures = `
  query pictures {
    pictures{
      id
    }
  }
`;

export const deletePictures = `
  mutation deletePictures {
    deletePictures {
      id
    }
  }
`;
