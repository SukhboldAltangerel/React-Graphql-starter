import { baseUrl } from "./baseUrl"

export default function Fetch({ method, url, body, callback, headers, addOptions }) {
   fetch(`${baseUrl}/${url}`, {
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
      .then(data => callback && callback(data))
}
