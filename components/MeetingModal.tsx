import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  className: string;
  buttonText?: string;
  children?: React.ReactNode;
  image?: string;
  buttonIcon?: string;
  onClose: () => void;
  clickHandler: () => void;
}

const MeetingModal = (meetingPros: MeetingModalProps) => {
  return (
    <Dialog open={meetingPros.isOpen} onOpenChange={meetingPros.onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {meetingPros.image && (
            <div className="flex justify-center">
              <Image
                src={meetingPros.image}
                alt="image"
                height={27}
                width={27}
              />
            </div>
          )}
          <h1
            className={cn(
              "text-3xl font-bold leading-[42px]",
              meetingPros.className
            )}
          >
            {meetingPros.title}
          </h1>
          {meetingPros.children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={meetingPros.clickHandler}
          >
            {meetingPros.buttonIcon && (
              <Image
                src={meetingPros.buttonIcon}
                alt="icon"
                height={13}
                width={13}
              />
            )}
            &nbsp;
            {meetingPros.buttonText || "Schedule a Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
