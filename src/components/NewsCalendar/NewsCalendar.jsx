import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { zhTW } from "date-fns/locale/zh-TW";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "./NewsCalendar.scss";
import useNews from "../../utils/api";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
function NewsCalendar({ selected }) {
  const locales = {
    "zh-TW": zhTW,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 7 }),
    getDay,
    locales,
  });
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10).replace(/-/g, "");
  const { newsList } = useNews({
    startDate: "20250101",
    endDate: formattedToday,
  });

  const keywordGroups = {
    1: { name: "生技醫藥", className: "event-biotech" },
    2: { name: "資訊安全", className: "event-security" },
    3: { name: "國際金融", className: "event-finance" },
    4: { name: "數位資產", className: "event-crypto" },
    5: { name: "人工智慧", className: "event-ai" },
  };

  const events = newsList
    .filter((item) => {
      const group = keywordGroups[item.keyword_group_id];
      return selected[group?.name];
    })

    .map((item) => {
      const group = keywordGroups[item.keyword_group_id] || {
        name: "未知分類",
        className: "event-default",
      };
      return {
        id: item.id,
        title: `${group.name}：${item.title.slice(0, 10)}...`,
        subtitle: item.title,
        content: item.content,
        post_date: item.post_date,
        created_at: item.created_at,
        updated_at: item.updated_at,
        start: new Date(item.post_date),
        end: new Date(item.post_date),
        allDay: true,
        resource: {
          className: group.className,
        },
      };
    });

  /* 控制彈窗 */
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    console.log(event);
  };
  const closeModal = () => {
    setSelectedEvent(null);
  };
  return (
    <>
      <div className="calendarBox">
        <Calendar
          localizer={localizer}
          culture="zh-TW"
          messages={{
            today: "今天",
            previous: "上月",
            next: "下月",
            month: "月",
            week: "週",
            day: "日",
            agenda: "列表",
            showMore: () => "＋查看更多新聞",
          }}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month"]}
          style={{ height: 700, width: 1200 }}
          popup
          formats={{
            dayHeaderFormat: (date) =>
              format(date, "MM月dd日 EEEE", { locale: zhTW }),
          }}
          eventPropGetter={(event) => {
            const groupId = event.resource.className;
            const colorMap = {
              "event-biotech": "#FF9999",
              "event-security": "#66B3FF",
              "event-finance": "#FFD966",
              "event-crypto": "#B6D7A8",
              "event-ai": "#C299FF",
              "event-default": "#CCCCCC",
            };
            return {
              style: {
                backgroundColor: colorMap[groupId] || "#CCCCCC",
                color: "white",
                borderRadius: "4px",
                padding: "2px 6px",
                border: "none",
              },
            };
          }}
          onSelectEvent={handleEventClick}
        />
      </div>
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal}>
              <FaXmark size={24} color="black"/>
            </button>
            <div className="popupDate">
              <div>ID：{selectedEvent.id}</div>
              <h2>{selectedEvent.subtitle}</h2>
              <div>{selectedEvent.post_date}</div>
            </div>
            <div className="content">{selectedEvent.content}</div>
            <div className="created">
              <div>建立時間{selectedEvent.created_at}</div>
              <div>更新時間{selectedEvent.updated_at}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default NewsCalendar;
