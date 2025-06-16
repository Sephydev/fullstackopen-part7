import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  axios
    .get(baseUrl)
    .then(r => setResources(r.data))

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(r => setResources(resources.concat(r.data)))
  }

  const service = {
    create
  }

  return [resources, service]
}