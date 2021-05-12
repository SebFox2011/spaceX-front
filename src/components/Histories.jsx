import React from "react";
import { useQuery } from "react-query";

const Histories = () => {

    const { isLoading, error, data, isFetching } = useQuery("repoHistories", () =>
      fetch(
        "https://api.spacexdata.com/v3/history"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? "Updating..." : "Histoire: "}</div>
        <span>{JSON.stringify(data)}</span>
      </div>
    );
}
export default Histories