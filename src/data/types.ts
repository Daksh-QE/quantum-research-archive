export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];  // e.g. "VIDEO", "PAPER", "TUT", "GUIDE", "NOTES", "BOOK", "COURSE"
  category: string;
  author?: string;
  domain?: string; // "Quantum Computing" | "Quantum Mechanics" | "Both"
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'notes' | 'tutorial' | 'paper' | 'guide';
  url: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CommunityMember {
  id: string;
  name: string;
  initials: string;
  role: string; // "RES" | "EDU" | "BUILD" | "LEAD"
  description: string;
  url: string;
  tags: string[];
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string; // "SIMULATOR" | "SDK" | "PLATFORM" | "FRAMEWORK" | "LANGUAGE"
  tags: string[];
}

export interface Article {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
  domain?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export interface Newsletter {
  id: string;
  name: string;
  description: string;
  url: string;
  frequency: string;
  tags: string[];
}
