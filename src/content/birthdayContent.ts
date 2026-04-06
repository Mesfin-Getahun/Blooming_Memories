export interface MemoryMoment {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  images: string[];
  colSpan?: string;
}

export interface LoveNote {
  title: string;
  text: string;
}

export const birthdayContent = {
  recipientName: "Merrye",
  senderName: "Mesfin",
  relationshipLabel: "my bestie",
  celebrationDate: "May 12 EC",
  heroQuote:
    "You make ordinary days feel golden, and every memory with you feels like a favorite song.",
  introBadge: "A day made for her",
  surpriseTitle: "For the girl who makes life softer, louder, funnier, and brighter",
  letterGreeting: "Dear Merrye,",
  letterSignature: "Your Partner in Crime",
  letterClosing: "Always yours,",
  letterParagraphs: [
    "I wanted this little corner of the internet to feel like a love letter to our friendship. Not something generic, but something that feels like us.",
    "Thank you for being the person who shows up with kindness, with laughter, and with the kind of energy that makes hard days easier to survive. Life feels lighter with you in it.",
    "I hope this year gives you soft mornings, loud laughter, answered prayers, and the kind of happiness that keeps finding you again and again. You deserve that and so much more.",
  ],
  highlightNotes: [
    {
      title: "Your laugh is therapy",
      text: "Even the most chaotic day gets better when you start laughing for real.",
    },
    {
      title: "You make memories effortlessly",
      text: "The smallest hangout with you somehow becomes a story worth replaying forever.",
    },
    {
      title: "You love deeply",
      text: "The way you care for people is rare, and it is one of the most beautiful things about you.",
    },
  ] satisfies LoveNote[],
  moments: [
    {
      id: "moment-1",
      title: "The Day We Couldn't Stop Laughing",
      description:
        "One of those perfect days where everything was funny, nothing had to be planned, and being together was enough.",
      date: "Your favorite memory",
      location: "Replace with the real place",
      images: ["/gebeya.webp"],
      colSpan: "md:col-span-2",
    },
    {
      id: "moment-2",
      title: "Soft Little Adventures",
      description:
        "The random trips, the check-ins, the effortless conversations, and all the tiny moments that became big to me because they included you.",
      date: "A sweet chapter",
      location: "Replace with the real place",
      images: ["/gebeya.webp"],
    },
    {
      id: "moment-3",
      title: "Us, In Frames",
      description:
        "A small memory box of the smiles, poses, chaos, and calm that we managed to capture along the way.",
      date: "Our gallery",
      location: "Replace with the real place",
      images: ["/gebeya.webp"],
      colSpan: "md:col-span-3",
    },
  ] satisfies MemoryMoment[],
  extendedMoments: [
    {
      id: "extended-1",
      title: "A Favorite Day",
      description:
        "This is where you can write one specific memory that means a lot to both of you.",
      date: "Month Year",
      location: "Real location",
      images: ["/gebeya.webp"],
    },
    {
      id: "extended-2",
      title: "One More Story Worth Keeping",
      description:
        "Use this card for an inside joke, a trip, a school memory, or even a random hangout that became unforgettable.",
      date: "Month Year",
      location: "Real location",
      images: ["/gebeya.webp"],
    },
  ] satisfies MemoryMoment[],
};

export const personalizationChecklist = [
  "Drop your real photos into public/memories",
  "Replace /gebeya.webp in src/content/birthdayContent.ts with your image paths",
  "Swap the placeholder memory titles and descriptions with real moments",
  "Edit the letter so it sounds exactly like you",
];
