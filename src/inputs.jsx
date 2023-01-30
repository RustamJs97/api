import React, { useState, } from 'react'
import { Container, Card, } from './components/login/styled'
import 'react-phone-input-2/lib/style.css'
import ReactPhoneInput from 'react-phone-input-2'


const LoginPage = () => {

  const [click, setClick] = useState('')


  return (
    <Container>

      <Card >

        <ReactPhoneInput
          onChange={(value, country) => {
            console.log(value, country);
          }}
        />
        {/* <ReactPhoneInput defaultCountry="no" excludeCountries={["us", "ca"]} /> */}

      </Card>

    </Container>
  )
}

export default LoginPage