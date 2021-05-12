import React from "react";
import { useQuery } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

export default function Dragons () {
    const { isLoading, error, data, isFetching } = useQuery("repoDragons", () =>
      fetch(
        "https://api.spacexdata.com/v3/dragons"
      ).then((res) => res.json())
    );
    if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? "Updating..." : "Dragon: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }