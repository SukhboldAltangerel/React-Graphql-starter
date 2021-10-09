import Button from 'components/button/button'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { uploadFetch } from 'utilities/fetch'
import styles from './fileUpload.module.css'

export default function FileUpload() {
   const [files, setFiles] = useState([])

   function handleInput(e) {
      setFiles([...e.target.files])
   }

   function prepareFormData() {
      const formData = new FormData()
      formData.append('operations', JSON.stringify({
         query: `
         mutation ($files: [Upload!]!) {
            uploadFile (files: $files) {
               message
            }
         }
         `,
         variables: {
            files: files.map(_ => null)
         }
      }))
      formData.append('map', JSON.stringify(files.reduce((acc, _, i) => ({ ...acc, [i]: [`variables.files.${i}`] }), {})))
      files.forEach((file, i) => formData.append(i, file, file.name))
      return formData
   }

   const upload = useMutation(() => uploadFetch(prepareFormData()), {
      onSuccess: data => console.log(data),
   })

   return (
      <div className="">
         <input type="file" onChange={handleInput} multiple />

         <Button onClick={upload.mutate}>
            upload
         </Button>
      </div>
   )
}
