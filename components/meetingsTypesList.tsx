"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingsTypesList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [meetingProps, setMeetingProps] = useState({
    StartTime: new Date(),
    Description: "",
    Link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const user = useUser();
  const streamClient = useStreamVideoClient();

  const createMeeting = async () => {
    if (!streamClient || !user) {
      return;
    }
    try {
      if (!meetingProps.StartTime) {
        toast({ title: "Please select a start time" });
        return;
      }
      const callId = crypto.randomUUID();
      const call = streamClient.call("default", callId);
      if (!call) {
        throw new Error("Failed to create call");
      }
      const startAt =
        meetingProps.StartTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const description = meetingProps.Description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description },
        },
      });
      setCallDetails(call);
      if (!meetingProps.Description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
        description: "Your Meeting created with id : " + call.id,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to create a meeting",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting "
          className="text-center"
          clickHandler={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setMeetingProps({
                  ...meetingProps,
                  Description: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <ReactDatePicker
              selected={meetingProps.StartTime}
              onChange={(date) =>
                setMeetingProps({ ...meetingProps, StartTime: date! })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          clickHandler={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
              description: "Meeting link copied to clipboard",
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

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
