import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProduct, getProducts, getProjects, getTodo, getTodoIds } from "./api"
import { Product } from "../types/product"

export function useTodosIds() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodoIds,
    // refetchOnWindowFocus: false
  })
}

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ['todo', { id }],
        queryFn: () => getTodo(id!)
      }
    })
  })
}

export function useProjects(page: number) {
  return useQuery({
    queryKey: ['projects', {page} ],
    queryFn: () => getProjects(page),
    //while the next page data is loading, it will keep previousPageData
    placeholderData: keepPreviousData
  })
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam : (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1
    }
  })
}

export function useProduct(id: number | null) {
  const queryCLient = useQueryClient();

  return useQuery({
    queryKey: ['product', {id}],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (queryCLient.getQueryData(['products']) as {
        pages: Product[] | undefined
      })?.pages?.flat(2);

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id)
      }
    }
  })
}