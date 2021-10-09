import argsGql from './argsGql'

export const loginQuery = (args) => `
mutation {
   loginUser(${argsGql(args)}) {
      message
      token
      id
      name
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

export const sendMessageMutation = (args) => `
mutation {
   addChatRedis(${argsGql(args)}) {
     message
   }
 }
`
