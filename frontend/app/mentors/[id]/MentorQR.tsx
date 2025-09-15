//frontend/app/mentors/[id]/MentorQR.tsx
"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function MentorQR({ slug }: { slug: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mentors/${slug}`;

  return (
    <div className="p-4 border border-white rounded-lg bg-white">
      <QRCodeCanvas value={url} size={150} />
    </div>
  );
}