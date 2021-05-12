import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Roadster from './components/Roadster' 
import Dragons from './components/Dragon';
import Infos from './components/Infos'
import Missions from './components/Missions'
import TimelineWidget from './components/TimelineWidget';
import Capsules,{Capsule} from './components/Capsules'
import MissionsTable from './components/MissionsTable'
import Ships from './components/Ships'
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimelineWidget />
      <Capsules/>
      <MissionsTable/>
      <Ships/>
      <Roadster />
      -------------------------
      <Dragons/>
      -------------------------
      <Capsule id={'C101'}/>
      -------------------------
      <Infos/>
      -------------------------
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>

  );
}


