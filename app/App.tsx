import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Components/Calender";
import cn from "./Components/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar({setShowUI}:any) {


	let currentHour = 10;
	let currentMinute = 30;
  
	// Generate time slots in 24-hour format
	const timeSlots24 = Array(15)
	  .fill(String)
	  .map(() => {
		const formattedTime = `${currentHour}:${currentMinute
		  .toString()
		  .padStart(2, '0')}`;
		currentMinute += 30;
  
		if (currentMinute >= 60) {
		  currentMinute = 0;
		  currentHour += 1;
		}
  
		return formattedTime;
	  });
  
	// Function to convert a single time slot from 24-hour to 12-hour format
	function convertTo12HourFormat(time24:String) {
	  const [hours, minutes] = time24.split(':').map(Number);
  
	  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
		return 'Invalid time format';
	  }
  
	  const period = hours < 12 ? 'AM' : 'PM';
	  const formattedHours = hours % 12 || 12;
	  const time12 = `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  
	  return time12;
	}
  
	// Convert all time slots to 12-hour format
	const timeSlots12 = timeSlots24.map((time24) => convertTo12HourFormat(time24));




  const [isMainDivHidden, setIsMainDivHidden] = useState(false);
  const [showAnotherDiv, setShowAnotherDiv] = useState(false);
  const [isDivhidden, setIsDivhidden] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const handleDiv = () => {
    setIsDivhidden(!isDivhidden);
  };

  const handleTimeSlotClick = () => {
    setIsMainDivHidden(!isMainDivHidden);
    setShowAnotherDiv(!showAnotherDiv);
  };

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className={`flex gap-4 mx-auto h-full `}>
      <div className={`flex ${isMainDivHidden ? "hidden" : ""}`}>
        <div className={`flex flex-col h-full md:py-12 ${isDivhidden ? "hidden" : ""} `}>
          <h1 className="text-lg font-semibold px-4 py-8 ">
            Select a Date & Time
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 w-full justify-center items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1 className="select-none font-semibold py-4">
                {months[today.month()]}, {today.year()}
              </h1>

              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              return (
                <h2
                  key={index}
                  className="text-sm font-medium py-4 grid place-content-center text-gray-500 select-none"
                >
                  {day}
                </h2>
              );
            })}
          </div>

          <div className=" grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today , disabled }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-12 grid place-content-center text-sm "
                  >
                    <h2
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-[#EC0B43] text-white" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? ""
                          : "",
                          disabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none "
                      )}
                      onClick={() => {
                        if (!disabled) {
                          setSelectDate(date);
                          handleDiv();
                          setShowUI(false);
                        }
                      }}
                    >
                      {date.date()}
                    </h2>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center w-full relative items-center gap-4 py-10 transition-all ease-linear duration-700 ${
            isDivhidden ? "" : "hidden"
          } `}
        >

        <div className="sticky top-0 flex justify-center items-center flex-col py-8 md:py-0 bg-white md:bg-transparent w-full">
			 <h2 className="text-lg font-semibold text-center pb-4 ">
              Select a Date & Time
             </h2>
             <h2 className="font-semibold text-center text-[#EC0B43]">
              {selectDate.toDate().toDateString()}
             </h2>
          </div>

        <div className="overflow-y-scroll md:pt-[430px] md:py-10 gap-4 flex flex-col justify-center items-center md:px-8 transition-all duration-700">
        {timeSlots12
         .filter(time => {
            const currentTime = dayjs();
            const selectedDateTime = dayjs(`${selectDate.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HH:mm');
            return selectedDateTime.isAfter(currentTime);
          })
          .map((time, index) => (
          <input
            type="button"
            key={index}
            value={time}
            className={`border border-purple-300 hover:border-purple-500 text-center lg:px-16 px-24 rounded-lg lg:py-2 py-4 font-semibold text-base cursor-pointer outline-none`}
            onClick={handleTimeSlotClick}
            onClickCapture={(e) => setSelectedTime(time)}
          />
        ))}
      </div>

        </div>
      </div>

      {showAnotherDiv && (
        <div className="flex-col md:px-8 transition-all duration-700">
          <div className="flex justify-between items-center py-8">
            <h2 className="font-semibold text-lg">
              Enter Detail
            </h2>

            <a href="" className="border cursor-pointer rounded-full">
              <img
                src="/image/left1.png"
                alt=""
                className="w-10 h-10"
              />
            </a>
          </div>
          <div className="flex flex-col gap-8  w-full">
            <input
              type="text"
              placeholder="Name"
              required
              className="border md:py-4 py-3 px-2 rounded-md outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              required
              className="border md:py-4 py-3 px-2 rounded-md outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              required
              className="border md:py-4 py-3 px-2 rounded-md outline-none"
            />
            <div className="py-4 flex flex-col gap-2 w-full">
              <p>
                Please share anything that will help prepare for our meeting.
              </p>
              <textarea
                name=""
                id=""
                cols={10}
                rows={4}
                className="border w-full rounded-md outline-none px-2 py-2"
              ></textarea>
            </div>
          </div>

          <button className="border md:py-4 py-3 w-2/5 rounded-lg font-semibold md:text-base text-sm text-[#EC0B43]">
            Schedule Call
          </button>
        </div>
      )}
    </div>
  );
}
