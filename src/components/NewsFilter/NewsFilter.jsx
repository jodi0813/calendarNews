import "./NewsFilter.scss";
function NewsFilter({ selected, setSelected }) {
  const NewsCategory = Object.keys(selected);

  const handleChange = (category) => {
    setSelected((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <div className="categorys">
        <div className="categoryTitle">請勾選新聞類別</div>
        {NewsCategory.map((category, i) => (
          <label key={i} className="labelBox">
            <input
              type="checkbox"
              className="check"
              checked={selected[category]}
              onChange={() => handleChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </>
  );
}
export default NewsFilter;
