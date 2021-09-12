export const getUsersQuery = `
{
   getUsers {
      id
      name
   }
} 
`

export const getChatQuery = `
{
   getChatRedis {
     userId
     name
     message
     dateTime
   }
}
`

export const getUserQuery = `
{
   getUser {
     id
     name
   }
}
`
