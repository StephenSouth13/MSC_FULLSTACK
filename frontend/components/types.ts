// types.ts
export interface Project {
  id: string;
  title: string;
  description: JSX.Element;
  instructors: string;
  image: string;
  category: string;
  mentors: { name: string; avatar: string }[];
}
