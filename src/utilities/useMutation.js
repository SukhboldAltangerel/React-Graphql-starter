import { useState } from "react";
import { baseUrlGraphql } from "./baseUrl";

export default function useMutation({ gql }) {
   const [res, setRes] = useState({})
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState({})

   console.log(gql)

   function callback() {
      setLoading(true)
      fetch(baseUrlGraphql, {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ query: gql })
      }).then(res => res.json())
         .then(res => {
            const queryData = Object.values(res.data)[0]
            setRes(queryData)
            setLoading(false)
         })
         .catch(err => {
            setError(err)
            setLoading(false)
         })
   }
   return { callback, res, loading, error }
}
