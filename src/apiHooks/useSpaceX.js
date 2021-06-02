import { useQuery } from "react-query"

const useSpaceX = (ressource) => {
  return useQuery(ressource, () => fetch(`https://api.spacexdata.com/v4/${ressource}`).then((res) => res.json()))
}

export default useSpaceX