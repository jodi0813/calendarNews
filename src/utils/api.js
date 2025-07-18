import { useEffect, useState } from "react";
import axios from "axios";

function useNews({ startDate, endDate, keywordGroupIds = "1,2,3,4,5" }) {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/get_posts", {
        params: {
          keyword_group_ids: keywordGroupIds,
          start_date: startDate,
          end_date: endDate,
        },
      })
      .then((res) => {
        setNewsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("錯誤：", err);
        setError(err);
        setLoading(false);
      });
  }, [startDate, endDate, keywordGroupIds]);

  return { newsList, loading, error };
}

export default useNews;
