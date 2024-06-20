export const fetchUsers = async (page = 1) => {
  const res = await fetch(`https://proyecto10-six.vercel.app/api/users?page=${page}&limit=2`);
  const users = await res.json();
  return {
      currentPage: page,
      totalPages: users.totalPages,
      items: users.users,
  };
};