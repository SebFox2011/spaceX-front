import React from "react";
import { useQuery } from "react-query";

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
        <div>{isFetching ? "Updating..." : "Missions: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }
export default Missions