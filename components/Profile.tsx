import React from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { Code } from "@nextui-org/code";

import { badges } from "./Badge";

import { Badge } from ".";

import { getDate } from "@/utils";
import DcActivity from "@/components/activity";

const Profile = () => {
  const userId = "786926252811485186";
  const badgeBits = Object.keys(badges);

  const available: string[] = [];

  for (let key of badgeBits) {
    available.push(key);
  }
  const timestamp = Number(BigInt(userId) >> 22n) + 1420070400000;
  const joinedAt = getDate(timestamp);

  return (
    <div className="bg-default-outer rounded-lg flex flex-col relative">
      <div className="bottom-[50] relative w-[25rem] h-full right-0 aspect-[1920/480]">
        <Image
          alt="Banner"
          className="rounded-t-md"
          fill={true}
          src="/banner.webp"
        />
      </div>
      <div
        className={`${
          available.length === 0 ? "bg-default-outer" : "bg-default-inner"
        } flex flex-wrap ml-auto p-2 rounded-md mx-5 mt-3 gap-2`}
      >
        {available.map((bit, i) => {
          return <Badge key={i} badgeBit={parseInt(bit)} />;
        })}
      </div>
      <div className="rounded-full top-8 ml-5 aspect-square border-[4px] border-default-outer w-32 absolute">
        <Image
          alt="Avatar"
          className="rounded-full"
          fill={true}
          src="/avatar.webp"
        />
      </div>
      <span className="pt-8" />
      <div className="bg-default-inner m-5 mt-0 rounded-md p-3">
        <h2 className="font-bold text-2xl px-20">! Mannu</h2>
        <span className="text-sm">@dev_mannu</span>
        {/* Status Here */}
        <hr className="border-1 border-default-segment my-2 mx-3" />
        <h2 className="uppercase font-extrabold text-xs tracking-wide pb-2">
          About
        </h2>
        <Code>I turn those random 3 AM ideas into reality ✨🤌</Code>
        <h2 className="uppercase font-extrabold text-xs tracking-wide pb-1 py-5">
          Member Since
        </h2>
        <p className="text-sm">
          <span className="text-sm font-medium flex gap-2  flex-row">
            <FaDiscord size={19} />
            {joinedAt.toString()}
          </span>
        </p>
        <DcActivity />
      </div>
    </div>
  );
};

export default Profile;
