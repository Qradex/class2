import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { v4 as uuid } from 'uuid'
import List from '../List/list'
import store from '../../utils/store.js'
import StoreApi from '../../utils/storeApi'
import InputContainer from '../Input/inputContainer'
import { DragDropContext } from 'react-beautiful-dnd'
import { ContainerBoard, ListContainer, DropList } from './style.js'
import { getToken } from '../../Services/auth'

export default function Board() {
  const [data, setData] = useState(store)
  const addMoreCard = (title, listId) => {
    const newCardId = uuid()
    const newCard = {
      id: newCardId,
      title,
    }

    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    }
    setData(newState)
  }

  const addMoreList = (title) => {
    const newListId = uuid()
    const newList = {
      id: newListId,
      title,
      cards: [],
    }
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    }
    setData(newState)
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    }
    setData(newState)
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }
    if (type === 'list') {
      const newListIds = data.listIds
      newListIds.splice(source.index, 1)
      newListIds.splice(destination.index, 0, draggableId)
      return
    }

    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      }
      setData(newSate)
    } else {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      }
      setData(newState)
    }
  }


  let { id } = useParams()
  const API = process.env.REACT_APP_API_URL
  const [listAll, setListAll] = useState([])

  useEffect(() => {
    fetch(
      `${API}/list/${id}`,
      {
        method: 'get',
        headers: new Headers({
          'auth-superman': getToken(),
        })
      },
    )
      .then(async response => {
        const data = await response.json()
        setListAll(data)
      })
      .catch(error => console.log(error))
  }, [API, setListAll])
  console.log('fora',listAll)

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <ContainerBoard>
        <DragDropContext onDragEnd={onDragEnd}>
          <DropList droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <ListContainer style={{ display: "flex" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* {data.listIds.map((listId, index) => {
                  const list = data.lists[listId]
                  return <List list={list} key={listId} index={index} /> */}
                {/* })} */}
                
                {console.log('antes do map', listAll.length),
                  listAll.length > 0 && listAll.map((item, index) => {
                    console.log('dentro', item)
                    return <List list={item} key={item.id} index={index} />
                  }
                  )
                }
                <InputContainer type="list" />
                {provided.placeholder}
              </ListContainer>
            )}
          </DropList>
        </DragDropContext>
      </ContainerBoard>
    </StoreApi.Provider>
  )
}