export const fetchUsersByUserName = async (userName) => {
    const res = await fetch(`https://proyecto10-six.vercel.app/api/users/userName/${userName}`);
    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      return null;
    }
    return ;
  };