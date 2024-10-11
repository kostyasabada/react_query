import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries"
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodosIds();

  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    //function mutateFn from mutation
    createTodoMutation.mutate(data)
  }

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true })
    }
  }

  const handleDeleteTodo = async (id: number) => {
     deleteTodoMutation.mutateAsync(id);
    console.log('success');
    
  }


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

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo</h4>
        <input type="text" placeholder="Title" {...register('title')} />
        <br />
        <input type="text" placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'} />
      </form>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>Title: {data?.title}</span>
            <span>Description: {data?.description}</span>
            <div>
              <button onClick={() => handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                {data?.checked ? 'Done' : 'Mark as done'}
              </button>
              {data && data?.id && (
                <button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>

              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}