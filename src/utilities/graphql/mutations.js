import argsGql from "./argsGql"

export const loginQuery = (args) => `
mutation {
   loginUser(${argsGql(args)}) {
      message
      token
   }
}
`

export const signUpQuery = (args) => `
mutation {
   signUpUser(${argsGql(args)}) {
      message
      token
   }
 } 
`
