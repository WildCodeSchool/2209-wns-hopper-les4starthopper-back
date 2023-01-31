export const createCategory = `
  mutation createCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      name
      icon
    }
  }
`;

export const Categories = `
  query Categories {
    Categories{
      id
      name
      icon
    }
  }
`;

export const getCategory = `
  query Category (categoryId: ID!) {
    Category {
        id
        name
        icon
    }
  }
`;

export const deleteCategory = `
  mutation deleteCategory ($categoryId: ID!) {
    deleteCategory (id: $categoryId) {
      id
    }
  }
`;

export const updateCategory = `
  mutation updateCategory ($categoryId: ID!, $name: String!, $icon: String!) {
    updateCategory (id: $categoryId, name: $name, icon: $icon) {
      id
      name
      icon
    }
  }
`;

export const deleteCategories = `
  mutation deleteCategories {
    deleteCategories {
      id
    }
  }
`;
