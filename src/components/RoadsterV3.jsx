import React from "react";
import { useQuery } from "react-query";

export default function RoadsterV3 () {
    const { isLoading, error, data, isFetching } = useQuery("repoRoadsterV3", () =>
      fetch(
        "https://api.spacexdata.com/v3/roadster"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? "Updating..." : "RoadsterV3: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }