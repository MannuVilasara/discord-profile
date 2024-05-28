"use client";
import { Card } from "@nextui-org/card";

import { Profile } from "@/components";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <Card className="border-2 border-[#0691cc] rounded-lg">
          <Profile />
        </Card>
      </div>
    </section>
  );
}
