import MeetingsTypesList from "@/components/meetingsTypesList";
import React from "react";

const Home = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeFormattingOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeFormattingOptions);
  const currentTime = timeFormatter.format(currentDate);
  const currentFormattedDate = dateFormatter.format(currentDate);
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover ">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming meeting at 2 PM{" "}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {currentTime}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {currentFormattedDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingsTypesList />
    </section>
  );
};

export default Home;
