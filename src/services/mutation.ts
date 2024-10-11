import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {

  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log('mutate');
    },
    onError: () => {
      console.log('err');
    },
    onSuccess: () => {
      console.log('success');
    },
    onSettled: async (data, error, variables, ) => {
      console.log('settles');
      if (error) {
        console.log('error');
      } else {
        //make new query Todo from queries to update list
        await queryCLient.invalidateQueries({ queryKey: ['todos']})
      }
    }
  })
}

export function useUpdateTodo() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async(_, error, variables) => {
      if (error) {
        console.log('error');
      } else {
        await queryCLient.invalidateQueries({ queryKey: ['todos']});
        await queryCLient.invalidateQueries({queryKey: ['todo', {id: variables.id}]})
      }
    }
  })
}

export function useDeleteTodo() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      console.log('deleted');
    },

    onSettled: async(_, error) => {
      if (error) {
        console.log('error');
      } else {
        await queryCLient.invalidateQueries({ queryKey: ['todos']});
      }
    }
  })
}