/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: "rgb(95,111,255)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
// {
// docSlots.length && docSlots.map((item, index) => {
//   return (
//       <div className='flex flex-col' key={index}>
//           <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
//               <p>{daysOfWeeks[item[slotIndex].dateTime.getDay()]}</p>
//               <p>{item[slotIndex].dateTime.getDate()}</p>
//           </div>
//       </div>
//   );
// })
// }

// {
//   docSlots.length && docSlots[slotIndex].map((item, index) => {
//       return <p onClick={() => setSlotTime(item.time)} className={`text-sm font-normal flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
//           {item.time.toLowerCase()}
//       </p>
//   })
// }

// const [docSlots, setDocSlots] = useState([]);
// const [slotIndex, setSlotIndex] = useState(0);
// const [slotTime, setSlotTime] = useState('');

// function getAvailableSlots() {
//   setDocSlots([]);

//   // GETTING CURRENT DATE
//   let today = new Date();

//   for (let i = 0; i < 7; i++) {
//       // GETTING DATE WITH INDEX
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i);

//       // SETTING END TIME OF DATE WITH INDEX
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(20, 0, 0, 0)

//       // SETTING HOURS
//       if (today.getDate() === currentDate.getDate()) {
//           currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//           currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       }
//       else {
//           currentDate.setHours(10);
//           currentDate.setMinutes(0)
//       }

//       let timeSlot = [];

//       while (currentDate.getHours() < endTime.getHours()) {
//           let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//           // add slot to array
//           timeSlot.push({
//               dateTime: new Date(currentDate),
//               time: formattedTime
//           })

//           // Increment time by 30 minutes
//           currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       setDocSlots(prev => ([...prev, timeSlot]));
//   }
// // }
// useEffect(() => {
//   getAvailableSlots()
// }, [docInfo])