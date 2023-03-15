import React, { useState } from "react"
import { Dropdown, Space, Card, Button, Input, Modal, Checkbox } from "antd"
import { useDispatch } from "react-redux"
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import CardModal from "./CardModal"
import { useSelector } from "react-redux"
import { moveCardFromTo } from "../redux/slices/bucket"
import { addHistory } from "../redux/slices/history"

const CustomCard = ({
  card,
  editCardFunc,
  multipleDelete,
  checkedList,
  clickCheckbox,
  bucketId
}) => {
  const { bucketList } = useSelector((state) => state.bucket)
  const tmpList = bucketList.map((b) => {
    return { key: b.id + 3, label: b.title, id: b.id }
  })

  const items = [
    {
      key: 1,
      label: "Edit Card Deails",
      icon: <AiOutlineEdit />
    },
    // {
    //   key: 2,
    //   label: "Delete Card",
    //   icon: <AiOutlineDelete />
    // },
    {
      key: 3,
      label: "Move Card",
      children: tmpList
    }
  ]

  const { title, content, ytLink, id } = card
  const dispatch = useDispatch()
  const [editCard, setEditCard] = useState(card)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const showDetailsModal = () => {
    dispatch(addHistory({ ...card, timestamp: Date.now() }))
    setIsDetailsModalOpen(true)
  }
  const HandleDetailsModalOk = () => {
    editCardFunc(editCard)
    setIsDetailsModalOpen(false)
  }
  const HandleDetailsModalCancel = () => {
    setIsDetailsModalOpen(false)
  }

  const showEditModal = () => {
    setIsEditModalOpen(true)
  }
  const editHandleOk = () => {
    editCardFunc(editCard)
    setIsEditModalOpen(false)
  }
  const editHandleCancel = () => {
    setIsEditModalOpen(false)
  }
  const onClick = ({ key }) => {
    // var itemClicked = items[key - 1]
    if (key == 1) {
      showEditModal()
      return
    }
    console.log(key)
    const moveItem = tmpList.find((e) => e.key == key)
    console.log(moveItem)
    dispatch(moveCardFromTo({ card, bucketId, toId: moveItem?.id }))
  }

  function checkIn(x) {
    return x === id
  }

  return (
    <>
      <CardModal
        isModalOpen={isEditModalOpen}
        HandleOk={editHandleOk}
        HandleCancel={editHandleCancel}
        setCard={setEditCard}
        card={card}
      />
      <Modal
        title="Card Details"
        open={isDetailsModalOpen}
        onOk={HandleDetailsModalOk}
        onCancel={HandleDetailsModalCancel}
        footer={[
          <Button key="close" onClick={HandleDetailsModalCancel}>
            Close
          </Button>,
        ]}
      >
        <h3>{title}</h3>
        <p>{content}</p><br/>
        <iframe width="460" height="260" src={ytLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen autoplay></iframe>
      </Modal>
      <Card
        title={title}
        className="cardstyle"
        onClick={showDetailsModal}
        extra={
          <div>
            {multipleDelete ? (
              <Checkbox
                checked={checkedList.find(checkIn) ? true : false}
                onClick={() =>
                  clickCheckbox(id, checkedList.find(checkIn) ? true : false)
                }
              ></Checkbox>
            ) : null}
            <Dropdown menu={{ items, onClick }} className="dropdown">
              <Space>
                <AiOutlineMore />
              </Space>
            </Dropdown>
          </div>
        }
        bordered={false}
        style={{
          width: 300,
          marginRight: "20px"
        }}
      >
        <p>{content}</p>
      </Card>
    </>
  )
}

export default CustomCard
