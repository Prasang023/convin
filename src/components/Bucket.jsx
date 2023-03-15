import React, { useState, useEffect } from "react"
import CustomCard from "./CustomCard"
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { SmileOutlined } from "@ant-design/icons"
import { Dropdown, Space, Card, Modal, Button, Input } from "antd"
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { editBucket, deleteBucket } from "../redux/slices/bucket"
import CardModal from "./CardModal"
import Error from "./Error"

const items = [
  {
    key: "1",
    label: "Edit Bucket Name",
    icon: <AiOutlineEdit />
  },
  {
    key: "2",
    label: "Delete Bucket",
    icon: <AiOutlineDelete />
  },
  {
    key: "3",
    label: "Delete multiple cards",
    icon: <AiOutlineDelete />
  }
]

const Bucket = (bucketDetails) => {
  const { title, cards, id, cardId } = bucketDetails
  const dispatch = useDispatch()
  const [editTitle, setEditTitle] = useState(title)
  const [checkedList, setCheckedList] = useState([])
  const [multipleDelete, setMultipleDelete] = useState(false)
  const [createCard, setCreateCard] = useState({
    id: "",
    title: "",
    ytLink: "",
    content: ""
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const showEditModal = () => {
    setIsEditModalOpen(true)
  }
  const editHandleOk = () => {
    dispatch(editBucket({ ...bucketDetails, title: editTitle }))
    setIsEditModalOpen(false)
  }
  const editHandleCancel = () => {
    setIsEditModalOpen(false)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }
  const createHandleOk = () => {
    // createCardFunc(editCard)
    console.log(createCard)
    var newCard = { ...createCard, id: cardId }
    var finalCards = cards.map((c) => c)
    finalCards.push(newCard)
    console.log("cards", cards)
    var newId = cardId
    newId++
    dispatch(
      editBucket({
        ...bucketDetails,
        cardId: newId,
        cards: finalCards
      })
    )
    setIsCreateModalOpen(false)
  }
  const createHandleCancel = () => {
    setIsCreateModalOpen(false)
  }

  const onClick = ({ key }) => {
    var itemClicked = items[key - 1]
    if (key == 1) showEditModal()
    if (key == 2) dispatch(deleteBucket(id))
    if (key == 3) setMultipleDelete(true)
  }

  const editCardFunc = (editedCard) => {
    console.log("Edit card function")
    var finalCards = cards.filter((c) => c.id !== editedCard.id)
    finalCards.push(editedCard)
    dispatch(editBucket({ ...bucketDetails, cards: finalCards }))
  }

  const clickCheckbox = (id, isChecked) => {
    if (isChecked) {
      setCheckedList(checkedList.filter((c) => c !== id))
    } else {
      setCheckedList([...checkedList, id])
    }
    console.log(checkedList)
  }

  const deleteCards = () => {
    // for(var i=0;i<cards.length;i++) {
    //   if(checkedList.find(checkIn))
    // }
    var finalCards = cards.filter((c) => checkedList.find((x) => x !== c.id))
    console.log(finalCards)
    dispatch(editBucket({ ...bucketDetails, cards: finalCards }))
  }

  return (
    <>
      <CardModal
        isModalOpen={isCreateModalOpen}
        HandleOk={createHandleOk}
        HandleCancel={createHandleCancel}
        setCard={setCreateCard}
        card={createCard}
      />
      <Modal
        title="Edit Bucket Title"
        open={isEditModalOpen}
        onOk={editHandleOk}
        onCancel={editHandleCancel}
      >
        <Input
          placeholder="Enter Title for Bucket"
          onChange={(evt) => setEditTitle(evt.target.value)}
          defaultValue={editTitle}
        />
      </Modal>
      <div className="bucket-container">
        <div className="bucket-head">
          <h3>{title}</h3>
          <Space>
            {multipleDelete ? (
              <>
                <Button type="primary" onClick={deleteCards}>
                  Delete
                </Button>
                <Button
                  type="primary"
                  onClick={() => setCheckedList(cards.map((c) => c.id))}
                >
                  Select All
                </Button>
                <Button onClick={() => setMultipleDelete(!multipleDelete)}>
                  Cancel
                </Button>
              </>
            ) : null}
            <Dropdown menu={{ items, onClick }} className="dropdown">
              <Space>
                <AiOutlineMore />
              </Space>
            </Dropdown>
          </Space>
        </div>
        <div className="card-container">
          {cards?.map((card) => (
            <CustomCard
              card={card}
              editCardFunc={editCardFunc}
              multipleDelete={multipleDelete}
              checkedList={checkedList}
              clickCheckbox={clickCheckbox}
              bucketId={bucketDetails.id}
            />
          ))}
          <Card
            bordered={false}
            style={{
              width: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px"
            }}
            className="add-card"
            onClick={showCreateModal}
          >
            <AiOutlinePlus size="30px" />
          </Card>
        </div>
      </div>
      <Error />
    </>
  )
}

export default Bucket
