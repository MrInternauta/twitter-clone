import useSWR from "swr";
import fetcher from "@/libs/fetcher";
//SWR is a React Hooks library for data fetching.
const useCurrentUser = () => {
  //Determine when has to request data again
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
