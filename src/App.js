import React, { useContext } from "react"
import "./App.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import RoadsterV3 from "./components/RoadsterV3"
import Dragons from "./components/Dragons"
import Infos from "./components/Infos"
import { AppContext } from "./ThemeWrapper"
import { Switch, Route } from "react-router-dom"
import TimelineWidget from "./components/TimelineWidget"
import Capsules, { Capsule } from "./components/Capsules"
import Missions from "./components/Missions"
import Ships from "./components/Ships"
import Dashboard from "./Templates/Dashboard"
import Launches from "./components/Launches"
import LaunchPads from "./components/LaunchPads"
import Payloads from "./components/Payloads"
import Crews from "./components/Crews"
import Starlinks from "./components/Starlinks"
const queryClient = new QueryClient()

export default function App({ history }) {
  const changeMode = useContext(AppContext)
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" exact component={Infos} />
          <Route path="/Capsules" component={Capsules} />
          <Route path="/Crews" component={Crews} />
          <Route path="/Capsules" component={Capsules} />
          <Route path="/Dragons" component={Dragons} />
          <Route path="/History" component={TimelineWidget} />
          <Route path="/Missions" component={Missions} />
          <Route path="/Launches" component={Launches} />
          <Route path="/LaunchPads" component={LaunchPads} />
          <Route path="/Payloads" component={Payloads} />
          <Route path="/RoadsterV3" component={RoadsterV3} />
          <Route path="/Ships" component={Ships} />
          <Route path="/Starlinks" component={Starlinks} />
        </Switch>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </Dashboard>
  )
}
