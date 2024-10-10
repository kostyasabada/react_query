import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries"

export default function Todo() {
  const todosIdsQuery = useTodosIds();

  const todosQueries = useTodos(todosIdsQuery.data);


  // const isFetching = useIsFetching();


  // if(todosIdsQuery.isPending) {
  //   return <span>loading...</span>
  // }

  // if(todosIdsQuery.isError) {
  //   return <span>there is error</span>
  // }

  return (
    <>
      {/* <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p> */}
      {/* {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))} */}
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
              <div>Id: {data?.id}</div>
              <span>Title: {data?.title}</span>
              <span>Description: {data?.description}</span>
          </li>
        ))}
      </ul>
    </>
  )
}