import { useUserStore } from '../state/userStore';

export function useUsers() {
  const { users, loading, error, fetchUsers, createUser, updateUser, deleteUser } = useUserStore();

  return { users, loading, error, fetchUsers, createUser, updateUser, deleteUser };
}