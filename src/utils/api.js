import { useEffect, useState } from "react";
import axios from "axios";
function stripHTML(str = "") {
  return str.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
function useNews({ startdate, enddate, keyword }) {

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/newsapi.ashx", {
        params: {
          keyword: keyword,
          startdate: startdate,
          enddate: enddate,
        },
       })
      .then((res) => {
        const mapped=res.data.map((item,idx)=>({
          id: item.id ?? `news-${idx}`, 
          title: item["標題"], 
          content: stripHTML(item["內容"]),
          postDate:  item["發布日期"],  
          link: item["連結網址"], 
          raw: item
        }));
        setNewsList(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("錯誤：", err);
        setError(err);
        setLoading(false);
      });
  }, [startdate, enddate, keyword]);

  return { newsList, loading, error };
}

export default useNews;
