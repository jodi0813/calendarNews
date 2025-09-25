import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { zhTW } from "date-fns/locale/zh-TW";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "./NewsCalendar.scss";
import useNews from "../../utils/api";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
function NewsCalendar() {
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
    startdate: "2025/01/01",
    enddate: "2025/09/30",
    keyword: "",
  });

  /*const keywordGroups = {
    1: { name: "生技醫藥", className: "event-biotech" },
    2: { name: "資訊安全", className: "event-security" },
    3: { name: "國際金融", className: "event-finance" },
    4: { name: "數位資產", className: "event-crypto" },
    5: { name: "人工智慧", className: "event-ai" },
  };*/

  const events = newsList.map((item) => {
      return {
        id: item.id,
        title: item.title,  
        subtitle: item.title,
        content: item.content,
        post_date: item.postDate,
        start: new Date(item.postDate),
        end: new Date(item.postDate),
        allDay: true,
        resource: {
          className: "event-default",
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
          views={["month", "week", "day", "agenda"]} 
          style={{ height: 700, width: 1200 }}
          popup
          formats={{
            dayHeaderFormat: (date) =>
              format(date, "MM月dd日 EEEE", { locale: zhTW }),
          }}

          onSelectEvent={handleEventClick}
        />
      </div>
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal}>
              <FaXmark size={24} color="black" />
            </button>
            <h2>{selectedEvent.subtitle}</h2>
            <div className="popupDate">
              <div>ID：{selectedEvent.id}</div>
              <div>{selectedEvent.post_date}</div>
            </div>
            <div className="content">{selectedEvent.content}</div>
            
          </div>
        </div>
      )}
    </>
  );
}
export default NewsCalendar;
