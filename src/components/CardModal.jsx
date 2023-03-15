import React from "react"
import { Dropdown, Space, Card, Button, Input, Modal } from "antd"

const CardModal = ({
  isModalOpen,
  HandleOk,
  HandleCancel,
  setCard,
  card
}) => {
  const { TextArea } = Input
  return (
    <Modal
      title="Edit Card Details"
      open={isModalOpen}
      onOk={HandleOk}
      onCancel={HandleCancel}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Enter Title"
          onChange={(evt) => setCard({ ...card, title: evt.target.value })}
          defaultValue={card?.title}
        />
        <TextArea
          rows={4}
          placeholder="Enter Card content"
          defaultValue={card?.content}
          onChange={(evt) =>
            setCard({ ...card, content: evt.target.value })
          }
        />
        <Input
          placeholder="Enter Video Link"
          onChange={(evt) => setCard({ ...card, ytLink: evt.target.value })}
          defaultValue={card?.ytLink}
        />
      </Space>
    </Modal>
  )
}

export default CardModal
