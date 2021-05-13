import React,{useContext} from "react";
import { useQuery } from "react-query";
import Dashboard from '../Templates/Dashboard';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { AppContext } from '../ThemeWrapper';

const Infos = ({ history }) => {
  const changeMode = useContext(AppContext);
    const { isLoading, error, data, isFetching } = useQuery("repoInfos", () =>
      fetch(
        "https://api.spacexdata.com/v3/info"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <Dashboard history={history} changeMode={changeMode}>
      <div>
        <div>{isFetching ? <CircularProgress  style={{ color: purple[500] }} thickness={7} />: "Infos: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
      </Dashboard>
    );
    
  }

  export default Infos