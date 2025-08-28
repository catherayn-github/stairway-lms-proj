/* UTILITIES */

import { CACHE_KEY_USER } from "@app/_constants/cache_key";
import { HookCallbacks } from "@app/_entities/interface/api.interface";
import { User } from "@app/_entities/interface/user.interface";
import { AddUserData, EditUserData } from "@app/_entities/types/user.type";
import UserService from "@app/_services/user.service";
import { formatErrorMessage } from "@app/_utils";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const userService = new UserService();

export const useGetUsers = () => {
  return useInfiniteQuery({
    queryKey: [...CACHE_KEY_USER],
    queryFn: ( {pageParam = 1 }) => userService.getUsers({ page: pageParam, limit: 10 }),
  });
};

export const useGetUser = ({ id }: Pick<User, "id">) => {
	return useQuery({
		queryKey: [...CACHE_KEY_USER, id],
		queryFn: () => userService.getUser({ id }),
	});
};

export const useAddUser = ({
  onSuccess,
  onError,
}: HookCallbacks<User> = {}) => {
  const queryClient = useQueryClient();

  const { mutate: addUser, ...rest } = useMutation({
    mutationFn: ({ data }: { data: AddUserData }) =>
      userService.addUser({ data }),
    onSuccess(data) {
      onSuccess?.(data!);
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
    },
    onError(error) {
      onError?.(formatErrorMessage(error));
    },
  });

  return { addUser, ...rest };
};


export const useEditUser = ({
  onSuccess,
  onError,
}: HookCallbacks<User> = {}) => {
  const queryClient = useQueryClient();

  const { mutate: editUser, ...rest } = useMutation({
    mutationFn: ({ data }: { data: EditUserData }) =>
      userService.editUser({ data }),
    onSuccess(data) {
      onSuccess?.(data!);
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
    },
    onError(error) {
      onError?.(formatErrorMessage(error));
    },
  });

  return { editUser, ...rest };
};


export const useDeleteUser = ({
  onSuccess,
  onError,
}: HookCallbacks<Pick<User, "id">> = {}) => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, ...rest } = useMutation({
    mutationFn: ({ id }: { id: string }) => userService.deleteUser({ id }),
    onSuccess(data) {
      onSuccess?.(data!);
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
    },
    onError(error) {
      onError?.(formatErrorMessage(error));
    },
  });

  return { deleteUser, ...rest };
};
