export const fetchPaginationEvents = async (page = 1) => {
    const res = await fetch(`https://proyecto10-six.vercel.app/api/events?page=${page}&limit=${8}`);
    const events = await res.json();
    return {
        currentPage: page,
        totalPages: events.totalPages,
        items: events.events,
    };
};