import { useTodosIds } from "../services/queries"

export default function Todo() {
  const todosIdsQuery = useTodosIds();

  
  // if(todosIdsQuery.isPending) {
  //   return <span>loading...</span>
  // }

  // if(todosIdsQuery.isError) {
  //   return <span>there is error</span>
  // }

  return (
    <>
      <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status: {todosIdsQuery.status}</p>
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  )
}