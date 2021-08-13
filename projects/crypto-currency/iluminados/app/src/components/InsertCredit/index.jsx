import React, { useState } from 'react'
import { TxtField } from '../TxtField'
import { Controller, useForm } from 'react-hook-form'
import { FormContainer } from './styles'
import { Button } from '../Button'
import axios from 'axios'
import { getToken } from '../../Services/auth'

export const InsertCredit = () => {
  const { control, handleSubmit } = useForm()
  const [balance, setBalance] = useState(0)
  const onSubmit = (data) => {
    setBalance(data.balance)
    axios.request({
      method: "POST",
      url: "http://localhost:3030/bank",
      headers: { "auth-token": getToken() },
      data
    })
      .then(response => {
        console.log(response)
        console.log(balance)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(balance)
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="balance"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) =>
              <TxtField
                {...field}
                label="Valor a ser adicionado"
                variant="outlined"
                autoFocus={true}
              />
            }
          />
          <Button Button Color="primary" Variant="contained" Type="submit">Adicionar saldo</Button>
        </form>
      </FormContainer>
    </>
  )
}