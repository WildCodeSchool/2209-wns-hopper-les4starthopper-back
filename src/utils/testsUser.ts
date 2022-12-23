export const createUser = `
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
      role
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

export const deleteUser = `
  mutation deleteUser ($userId: ID!) {
    deleteUser (id: $userId) {
      id
    }
  }
`;

export const updateUser = `
  mutation updateUser ($userId: ID!, $role: Float) {
    updateUser (id: $userId, role: $role) {
      id
      role
    }
  }
`;

export const deleteUsers = `
  mutation deleteUsers {
    deleteUsers {
      id
    }
  }
`;
