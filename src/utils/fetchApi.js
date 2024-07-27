export const fetchApi = async ({
    endpoint,
    method = "GET",
    data = null,
    token = null,
  }) => {
    const url = `https://proyecto10-six.vercel.app/api/${endpoint}`;
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
  
    if (data) {
      if (data instanceof FormData) {
        delete options.headers['Content-Type'];
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }
  
    try {
      const response = await fetch(url, options);
  
      return {
        status: response.status,
        ok: response.ok,
        json: async () => {
          try {
            return await response.json();
          } catch (e) {
            return response.text();
          }
        }
      };
    } catch (error) {
      console.error('Fetch API Error:', error);
      throw error;
    }
  };
  