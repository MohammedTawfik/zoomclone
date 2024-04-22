"use client";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="flex flex-col sticky h-full w-fit left-0 top-0 justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive =
            pathName === link.path; /*|| pathName.startsWith(link.path)*/
          return (
            <Link
              href={link.path}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                src={link.iconUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg max-lg:hidden font-semibold">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
