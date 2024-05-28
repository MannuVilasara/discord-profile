import React from "react";
import useSWR from "swr";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import fetcher from "@/utils/fetcher";
import { LanyardResponse } from "@/app/api/discord/route";

export default function DcActivity() {
  const { data, isLoading, error } = useSWR<LanyardResponse>(
    "/api/discord",
    fetcher,
  );

  if (isLoading || error || !data?.data.activities[0]) {
    return null; // Or loading/error UI
  }
  let index = 0;

  if (data?.data.activities[index].id === "custom") {
    index++;
  }
  if (isLoading || error || !data?.data.activities[index]) {
    return null; // Or loading/error UI
  }
  const flag = data.data.activities[index].flags;
  let rawLargeImg = data.data.activities[index].assets.large_image;
  const httpsIndex = rawLargeImg.indexOf("/https/");
  let type;
  let image;
  let details;

  if (flag === 1) {
    type = "Playing";
    if (httpsIndex !== -1) {
      const httpsSubstring = rawLargeImg.substring(httpsIndex + 1);
      const nextSlashIndex = httpsSubstring.indexOf("/");

      image = "https://" + httpsSubstring.substring(nextSlashIndex + 1);
      details = data.data.activities[index].details;
    }
  } else {
    type = "Listening to";
    image = data.data.spotify.album_art_url;
    details = data.data.activities[index].details.slice(0, 15);
  }

  return (
    <React.Fragment>
      <br />
      <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              className="rounded-lg"
              height="60px"
              src={image}
              width="60px"
            />
          </Avatar>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-serif">
              {type + " " + data.data.activities[index].name}
            </span>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground font-sans font-light">
                {details}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
