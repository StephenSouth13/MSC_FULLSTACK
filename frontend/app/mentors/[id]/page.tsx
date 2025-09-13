import { mentorDetails } from "@/data/mentor-detail";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MentorClient from "./MentorClient";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mentor = mentorDetails.find((m) => m.id === params.id);
  return { title: mentor?.name || "Mentor" };
}

export default function MentorDetailPage({ params }: Props) {
  const mentor = mentorDetails.find((m) => m.id === params.id);
  if (!mentor) return notFound();
  return <MentorClient mentor={mentor} slug={params.id} />;
}
