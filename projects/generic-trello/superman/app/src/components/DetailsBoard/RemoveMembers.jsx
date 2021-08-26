import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import { getToken } from '../../Services/auth.js'
import { ContainerTitle, BoxModal, BoxModalOn, ContainerList, FixedBtn, ListMembers, ButtonEstyled } from './style.js'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'

const RemoveMembers = () => {

  let { id } = useParams()
  const API = process.env.REACT_APP_API_URL
  const [members, setMembers] = useState([])
  const [resAPI, setResAPI] = useState('')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [checked, setChecked] = React.useState([1])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.patch(`${API}/board/removemember`, { idBoard: id, members: checked },
      {
        headers: {
          'auth-superman': getToken(),
        }
      }
    )
      .then(response => {
        setResAPI(response.data)
        window.location.reload()
      }).catch(err => {
        setResAPI(err.response.data.message)
      })
  }

  useEffect(() => {
    fetch(
      `${API}/board/${id}/members/`,
      {
        method: 'get',
        headers: new Headers({
          'auth-superman': getToken(),
        })
      },
    )
      .then(async response => {
        const data = await response.json()
        setMembers(data)
      })
      .catch(error => console.log(error))
  }, [API, setMembers])

  const MembersNameRemove = () => {
    return (

      <ContainerList dense>
        {members != null && members.map((member) => {
          const labelId = `checkbox-list-secondary-label-${member.id}`
          return (
            <ListItem key={member.id} button>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText id={member.id} primary={member.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(member.id)}
                  checked={checked.indexOf(member.id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </ContainerList>
    )
  }

  return (
    <ContainerTitle>
      <ButtonEstyled variant="contained" color="secondary" onClick={handleOpen}>Remover</ButtonEstyled>
      <BoxModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <BoxModalOn>
            <FixedBtn><Button variant="contained" type="submit" color="secondary" onClick={handleSubmit}>Remover</Button></FixedBtn>
            <ListMembers>{MembersNameRemove()}</ListMembers>
          </BoxModalOn>
        </Fade>
      </BoxModal>
    </ContainerTitle>
  )
}

export default RemoveMembers