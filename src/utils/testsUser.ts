export const createUser = `
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
      role
      email
      password
    }
  }
`;

export const getUser = `
  query($userId: ID!) {
    FindUser(id: $userId) {
      id
      email
      password
      role
    }
  } 
`;

export const getUsers = `
  query FindAllUsers {
    FindAllUsers{
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

export const signin = `
  mutation($password: String!, $email: String!){
    signin(password: $password, email: $email)
  }
`

export const getMe = `
query {
  GetMe {
    created_at
    email
    password
    id
    role
  }
}

`
