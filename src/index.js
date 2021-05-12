import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import ThemeWrapper from "./ThemeWrapper"
import { Provider } from "react-redux"
import history from "./utils/history"
import { ConnectedRouter } from "connected-react-router/immutable"

import configureStore from "./redux/configureStore"

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
