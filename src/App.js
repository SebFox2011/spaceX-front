import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {Capsules, Capsule} from './components/Capsules'
import Roadster from './components/Roadster' 
import Dragons from './components/Dragon';
import Histories from './components/Histories'
import Infos from './components/Infos'
import Missions from './components/Missions'
import TimelineWidget from './components/TimelineWidget';


const queryClient = new QueryClient();

export default function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <TimelineWidget />
      <Roadster />
      -------------------------
      <Capsules />
      -------------------------
      <Dragons/>
      -------------------------
      <Capsule id={'C101'}/>
      -------------------------
      <Histories/>
      -------------------------
      <Infos/>
      -------------------------
      <Missions/>
      -------------------------
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>

  );
}


