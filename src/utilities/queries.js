import argsGql from "./argsGql"

export const getUsersQuery = `
{
   getUsers {
      id
      name
      email
      password
   }
} 
`

export const loginQuery = (args) => `
mutation {
   loginUser(${argsGql(args)}) {
      email
   }
}
`

export const signUpQuery = (args) => `
mutation {
   signUpUser(${argsGql(args)}) {
      message
   }
 } 
`
