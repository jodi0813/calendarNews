import { useState } from "react";
import NewsCalendar from "../components/NewsCalendar/NewsCalendar";
// import NewsFilter from "../components/NewsFilter/NewsFilter";
import "./HomePages.scss";
function HomePages() {

  return (
    <>
      <div className="onePage">
        <h1>衛生福利部國民健康署新聞內容</h1>
        <div className="line"></div>
        <div className="content">
          {/* <NewsFilter
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          /> */}
          <NewsCalendar />
        </div>
      </div>
    </>
  );
}
export default HomePages;
