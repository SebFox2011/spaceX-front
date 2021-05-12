import React from "react"
import { useQuery } from "react-query"

export const Capsules = () => {
  const { isLoading, error, data, isFetching } = useQuery("repoCapsules", () =>
    fetch("https://api.spacexdata.com/v3/capsules").then((res) => res.json())
  )
  if (isLoading) return "Loading..."
  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <div>{isFetching ? "Updating..." : "Capsules: "}</div>
      <span>{JSON.stringify(data)}</span>
    </div>
  )
}

export const Capsule = ({ id }) => {
  console.log(id)
  const { isLoading, error, data, isFetching } = useQuery("capsule-${id}", () =>
    fetch(`https://api.spacexdata.com/v3/capsules/${id}/`).then((res) =>
      res.json()
    )
  )
  if (isLoading) return "Loading..."
  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <div>{isFetching ? "Updating..." : "Dragon: "}</div>
      <div key={id}>{JSON.stringify(data)}</div>
    </div>
  )
}
