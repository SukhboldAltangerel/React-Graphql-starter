import { baseUrl, baseUrlGraphql } from "./baseUrl"

export async function Fetch({ method, url, body, headers, addOptions }) {
   return fetch(`${baseUrl}/${url}`, {
      mode: 'cors',
      // cache: 'default',
      // credentials: 'same-origin',
      headers: headers ?? { 'Content-Type': 'application/json' },
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer',
      ...addOptions,
      method: method,
      body: body && JSON.stringify(body)
   }).then(res => res.json())
}

export async function queryFetch(query) {
   return fetch(baseUrlGraphql, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ query: query })
   }).then(res => res.json())
}
