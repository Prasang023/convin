import React, { useEffect, useState } from "react"
import Bucket from "../components/Bucket"
import { AiOutlinePlus } from "react-icons/ai"
import { Button, Space, Modal, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getBucket, createBucket } from "../redux/slices/bucket"
import Error from "../components/Error"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bucketTitle, setBucketTitle] = useState("")
  const { bucketList } = useSelector((state) => state.bucket)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    dispatch(createBucket({ title: bucketTitle }))
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    console.log("in useEffect")
    dispatch(getBucket())
  }, [dispatch])

  return (
    <>
      <Modal
        title="Add Bucket"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter Title for Bucket"
          onChange={(evt) => setBucketTitle(evt.target.value)}
        />
      </Modal>
      <div className="btn-container">
        <Space>
          <Button
            type="primary"
            icon={<AiOutlinePlus style={{ marginRight: "5px" }} />}
            onClick={showModal}
          >
            {" "}
            Add Bucket
          </Button>
          <Button
            type="primary"
            // icon={<AiOutlinePlus style={{ marginRight: "5px" }} />}
            onClick={() => navigate("/history")}
          >
            {" "}
            History
          </Button>
        </Space>
      </div>
      <div>
        {bucketList.length
          ? bucketList.map((item, i) => <Bucket {...item} key={i} />)
          : null}
      </div>
      <Error />
    </>
  )
}

export default Home
