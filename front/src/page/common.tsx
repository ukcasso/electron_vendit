import gql from "graphql-tag"

export const ADD_USER = gql`
mutation createUser($email: String!, $password: String!, $confirmpassword: String!){
  createUser(email: $email, password: $password, confirmpassword: $confirmpassword){
      email
      password
      confirmpassword
    }
  }
`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!){
  loginUser(email: $email, password: $password){
      email
      token
    }
  }
`;