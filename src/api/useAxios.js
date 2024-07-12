import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (config) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if(!config) return
      try {
        setLoading(true);
        const response = await axios(config);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  return { data, error, loading };
};

export default useAxios;
