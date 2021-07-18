import { useEffect, useState } from "react"
import { baseUrlGraphql } from "./baseUrl"

export default function useQuery({ gql, initData, cache }) {
   const [cached] = useState(!!cache && !!localStorage.getItem(gql))
   const [data, setData] = useState(cached
      ? JSON.parse(localStorage.getItem(gql))
      : initData
   )
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState({})

   function refetch() {
      setLoading(true)
      fetch(baseUrlGraphql, {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ query: gql })
      }).then(res => res.json())
         .then(res => {
            const queryData = Object.values(res.data)[0]
            setData(queryData)
            cache && localStorage.setItem(gql, JSON.stringify(queryData))
            setLoading(false)
         })
         .catch(err => {
            setError(err)
            setLoading(false)
         })
   }

   useEffect(() => {
      if (!cached) refetch()
   }, [])

   return { data, loading, error, refetch }
}
