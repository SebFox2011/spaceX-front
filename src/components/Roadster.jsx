import React from "react";
import { useQuery } from "react-query";

export default function Roadster () {
    const { isLoading, error, data, isFetching } = useQuery("repoRoadster", () =>
      fetch(
        "https://api.spacexdata.com/v3/roadster"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? "Updating..." : "Roadster: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
    
  }