import React, { useContext } from "react"
import "./App.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Roadster from "./components/Roadster"
import Dragons from "./components/Dragon"
import Infos from "./components/Infos"
import { AppContext } from "./ThemeWrapper"
import { Switch, Route } from "react-router-dom"
import TimelineWidget from "./components/TimelineWidget"
import Capsules, { Capsule } from "./components/Capsules"
import MissionsTable from "./components/MissionsTable"
import Ships from "./components/Ships"
import Dashboard from "./Templates/Dashboard"
const queryClient = new QueryClient()

export default function App({ history }) {
  const changeMode = useContext(AppContext)
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" exact component={Infos} />
          <Route path="/Capsules" component={Capsules} />
          <Route path="/History" component={TimelineWidget} />
          <Route path="/MissionsTable" component={MissionsTable} />
          <Route path="/Ships" component={Ships} />
          <Route path="/Capsules" component={Capsules} />
          <Route path="/Roadster" component={Roadster} />
          <Route path="/Dragons" component={Dragons} />
        </Switch>
        <Capsule id={"C101"} />

        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Dashboard>
  )
}
