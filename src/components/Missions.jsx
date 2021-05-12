import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const Missions = () => {
    const { isLoading, error, data, isFetching } = useQuery("repoMissions", () =>
      fetch(
        "https://api.spacexdata.com/v3/missions"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? <CircularProgress  style={{ color: purple[500] }} thickness={7} /> : "Missions: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }
export default Missions