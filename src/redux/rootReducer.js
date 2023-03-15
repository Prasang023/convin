import error from "./slices/error"
import success from "./slices/success"
import bucket from "./slices/bucket"
import history from "./slices/history"

const rootReducer = {
  error,
  success,
  bucket,
  history
}

export default rootReducer
