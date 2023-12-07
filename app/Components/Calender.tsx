import dayjs from "dayjs";


export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
	const today = dayjs();
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  
	const arrayOfDate = [];
  
	// create prefix date
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
	  const date = firstDateOfMonth.day(i);
  
	  arrayOfDate.push({
		currentMonth: false,
		date,
		disabled: true,  // All past dates are disabled in the prefix
	  });
	}
  
	// generate current date
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
	  const date = firstDateOfMonth.date(i);
	  const isToday = date.isSame(today, 'day');
	  const isPastDate = date.isBefore(today, 'day');
  
	  arrayOfDate.push({
		currentMonth: true,
		date,
		today: isToday,
		disabled: isPastDate,  // Only past dates are disabled in the current month
	  });
	}
  
	const remaining = 42 - arrayOfDate.length;
  
	for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
	  const date = lastDateOfMonth.date(i);
  
	  arrayOfDate.push({
		currentMonth: false,
		date,
		disabled: true,  // All future dates are disabled in the remaining days
	  });
	}
  
	return arrayOfDate;
  };
  
  

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];