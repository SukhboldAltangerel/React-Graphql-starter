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
   success
   message
   }
}
`
