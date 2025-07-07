import { useState } from "react";
import NewsCalendar from "../components/NewsCalendar/NewsCalendar";
import NewsFilter from "../components/NewsFilter/NewsFilter";
import "./HomePages.scss";
function HomePages() {
  const initialCategories = {
    生技醫藥: true,
    資訊安全: true,
    國際金融: true,
    數位資產: true,
    人工智慧: true,
  };

  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  return (
    <>
      <div className="onePage">
        <h1>新聞行事曆</h1>
        <div className="line"></div>
        <div className="content">
          <NewsFilter
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
          <NewsCalendar selected={selectedCategories} />
        </div>
      </div>
    </>
  );
}
export default HomePages;
