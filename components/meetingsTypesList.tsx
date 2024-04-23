"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingsTypesList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const createMeeting = () => {
    setMeetingState("isInstantMeeting");
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Start an instant meeting "
        iconPath="/icons/add-meeting.svg"
        className="bg-orange-1"
        clickHandler={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        title="Schedule Meeting"
        description="plan a meeting "
        iconPath="/icons/schedule.svg"
        className="bg-blue-1"
        clickHandler={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        iconPath="/icons/recordings.svg"
        className="bg-purple-1"
        clickHandler={() => router.push("/recordings")}
      />
      <HomeCard
        title="Join Meeting"
        description="Via invitation link"
        iconPath="/icons/join-meeting.svg"
        className="bg-yellow-1"
        clickHandler={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting "
        className="text-center"
        buttonText="Start Meeting"
        clickHandler={createMeeting}
      />
    </section>
  );
};

export default MeetingsTypesList;
