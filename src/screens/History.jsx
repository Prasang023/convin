import React, { useEffect } from "react"
import { getHistory } from "../redux/slices/history"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const History = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { history } = useSelector((state) => state.history)
  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  return (
    <div>
      <h2>History</h2>
      <Button style={{ marginLeft: "40px" }} onClick={() => navigate("/")}>
        Home
      </Button>
      <div className="history-container">
        {[...history].reverse().map((item) => (
          <div className="history-card">
            <iframe
              width="280"
              height="160"
              src={item.ytLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              autoplay
              style={{ borderRadius: "10px" }}
            ></iframe>
            <div className="history-content">
              <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
              <p>
                Last Viewed:{" "}
                {new Date(item.timestamp).toLocaleDateString("en-US")}{" "}
                {new Date(item.timestamp).toLocaleTimeString("en-US")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
