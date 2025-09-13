"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function MentorQR({ slug }: { slug: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mentors/${slug}`;

  return (
    <div className="mt-12 flex flex-col items-center">
      
    
        <QRCodeCanvas value={url} size={200} />
      
    </div>
  );
}
