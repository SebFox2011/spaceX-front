import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const Infos = () => {
    const { isLoading, error, data, isFetching } = useQuery("repoInfos", () =>
      fetch(
        "https://api.spacexdata.com/v3/info"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? <CircularProgress  style={{ color: purple[500] }} thickness={7} />: "Infos: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }

  export default Infos