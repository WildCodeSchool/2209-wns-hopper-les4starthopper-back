export const createComment = `
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      id
      comment
    }
  }
`;

export const getComments = `
  query Comments {
    Comments{
      id
    }
  }
`;

export const deleteComment = `
  mutation deleteComment ($commentId: ID!) {
    deleteComment (id: $commentId) {
      id
    }
  }
`;

export const updateComment = `
  mutation updateComment ($commentId: ID!, $comment: String!) {
    updateComment (id: $commentId, comment: $comment) {
      id
      comment
    }
  }
`;

export const deleteComments = `
  mutation deleteComments {
    deleteComments {
      id
    }
  }
`;
