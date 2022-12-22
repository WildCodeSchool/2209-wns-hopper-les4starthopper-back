export const createUser = `
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
