import React, { useContext,Suspense } from "react"
import "./App.css"
import { QueryClient, QueryClientProvider } from "react-query"
//import { ReactQueryDevtools } from "react-query/devtools"
import RoadsterV3 from "./components/screen/RoadsterV3"
import Dragons from "./components/screen/Dragons"
import Infos from "./components/screen/Infos"
import { AppContext } from "./ThemeWrapper"
import { Switch, Route } from "react-router-dom"
import TimelineWidget from "./components/screen/TimelineWidget"
import Capsules from "./components/screen/Capsules"
import Missions from "./components/screen/Missions"
import Ships from "./components/screen/Ships"
import Dashboard from "./Templates/Dashboard"
import Launches from "./components/screen/Launches"
import LaunchPads from "./components/screen/LaunchPads"
import Payloads from "./components/screen/Payloads"
import Crews from "./components/screen/Crews"
import Starlinks from "./components/screen/Starlinks"
import Rockets from "./components/screen/Rockets"
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
const queryClient = new QueryClient({defaultOptions: {
  queries: {
    suspense: true,
  },
},})

export default function App({ history }) {
  const changeMode = useContext(AppContext)

  document.title = 'SpaceX front'

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <QueryClientProvider client={queryClient}>
      <Suspense fallback={ "I'am waiting ................."}>
        <Switch>
          <Route path="/" exact component={Infos} />
          <Route path="/Capsules" component={Capsules} />
          <Route path="/Crews" component={Crews} />
          <Route path="/Dragons" component={Dragons} />
          <Route path="/History" component={TimelineWidget} /> 
          <Route path="/Launches" component={Launches} />
          <Route path="/LaunchPads" component={LaunchPads} />
          <Route path="/Missions" component={Missions} />
          <Route path="/Payloads" component={Payloads} />
          <Route path="/RoadsterV3" component={RoadsterV3} />
          <Route path="/Rockets" component={Rockets} />
          <Route path="/Ships" component={Ships} />
          <Route path="/Starlinks" component={Starlinks} />
        </Switch></Suspense>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </Dashboard>
  )
}
