export const createUser = `
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const getUsers = `
  query Users {
    Users{
      id
    }
  }
`;
