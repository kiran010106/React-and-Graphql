import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonsForm'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)


  const result = useQuery(ALL_PERSONS , {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App