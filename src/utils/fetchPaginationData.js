export const fetchPaginationData = async (type, page = 1, limit = 8) => {
    const res = await fetch(`https://proyecto10-six.vercel.app/api/${type}?page=${page}&limit=${limit}`);
    const data = await res.json();
    return {
        currentPage: page,
        totalPages: data.totalPages,
        items: type === 'events' ? data.events : data.users,
    };
};