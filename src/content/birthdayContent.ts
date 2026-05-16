import { memoryImagePaths } from '../generated/memories';

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

export interface GiftPromise {
  title: string;
  text: string;
}

export interface BirthdayWish {
  label: string;
  text: string;
}

const fallbackImage = memoryImagePaths.length > 0 ? memoryImagePaths[0] : '';
const allMemoryImages = memoryImagePaths.length > 0 ? [...memoryImagePaths] : [fallbackImage];

const splitIntoGroups = (images: string[]) => {
  // First, group photos by their prefix structure to match moments together
  const autoGrouped: Record<string, string[]> = {};
  
  images.forEach(img => {
    let key = "misc";
    if (img.includes('IMG_20260103')) key = "jan3";
    else if (img.includes('IMG_20260108')) key = "jan8";
    else if (img.includes('IMG_20260218')) key = "feb18";
    else if (img.includes('2026-04-07')) key = "apr7";
    else if (img.includes('Screenshot_20260413')) key = "apr13";
    else if (img.includes('Snapchat')) key = "snapchat";
    else key = "misc";
    
    if (!autoGrouped[key]) autoGrouped[key] = [];
    autoGrouped[key].push(img);
  });

  // Convert the grouped dictionary into an array of buckets, ordered by size descending
  let buckets = Object.values(autoGrouped).sort((a, b) => b.length - a.length);
  
  // We want exactly 5 cards. Let's merge or split to get exactly 5 arrays roughly balanced.
  const targetCards = 5;
  const groups: string[][] = Array.from({ length: targetCards }, () => []);
  
  // Flatten everything back out but sorted so same-moment photos are next to each other
  // and distribute them chunk by chunk, evenly filling the 5 cards out.
  let allSortedImages: string[] = [];
  buckets.forEach(bucket => allSortedImages.push(...bucket));
  
  const baseSize = Math.floor(allSortedImages.length / targetCards);
  let remainder = allSortedImages.length % targetCards;
  
  let currentIndex = 0;
  for (let i = 0; i < targetCards; i++) {
    // Add an extra image to early cards if there's a remainder
    let currentCardSize = baseSize + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    
    groups[i] = allSortedImages.slice(currentIndex, currentIndex + currentCardSize);
    currentIndex += currentCardSize;
  }
  
  return groups;
};

// With exactly 5 groups returned, we can map them directly to our blueprints!
const autoGroups = splitIntoGroups(allMemoryImages);
const heroMontage = allMemoryImages.slice(0, 5);

const momentBlueprints = [
  {
    id: 'moment-1',
    title: 'Golden Hour Chaos',
    description:
      'The kind of memory that feels loud, soft, and impossible to forget all at once. Every frame feels like a line from our favorite inside joke.',
    date: 'Opening chapter',
    location: 'From the memories folder',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'moment-2',
    title: 'Soft Focus, Big Feelings',
    description:
      'A little collection of glances, laughter, poses, and unplanned moments that somehow turned into something beautiful.',
    date: 'Little moments',
    location: 'Straight from our camera roll',
  },
  {
    id: 'moment-3',
    title: 'Main Character Energy',
    description:
      'This one is the full cinematic reel: the confidence, the warmth, the silly bits, and the snapshots that make the whole story feel alive.',
    date: 'The full reel',
    location: 'Every frame that mattered',
    colSpan: 'md:col-span-3',
  },
] as const;

type MomentBlueprint = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  colSpan?: string;
};

const buildMoment = (
  blueprint: MomentBlueprint,
  images: string[] | undefined,
): MemoryMoment => ({
  ...blueprint,
  images: images && images.length > 0 ? images : [fallbackImage],
});

const extendedBlueprints = [
  {
    id: 'extended-1',
    title: 'The Afterglow',
    description:
      'The extra shots that still hit hard even after the main moment is over. Quiet favorites, tiny details, and frames worth revisiting.',
    date: 'Bonus cut',
    location: 'Saved for the replay',
  },
  {
    id: 'extended-2',
    title: 'Another Scene I Would Keep',
    description:
      'Because some memories do not belong in storage. They deserve their own spotlight, their own pause, and their own little celebration.',
    date: 'Encore',
    location: 'The photo vault',
  },
] as const;

const moments = momentBlueprints.map((blueprint, index) => buildMoment(blueprint, autoGroups[index] || []));

// We simply map the remaining extended moments to the 4th and 5th group from our 5 generated autoGroups
const extendedMoments = extendedBlueprints.map((blueprint, index) =>
  buildMoment(blueprint, autoGroups[index + 3] || []),
);

export const birthdayContent = {
  recipientName: "Merrye",
  senderName: "Mesfin",
  relationshipLabel: "my bestie",
  celebrationDate: "May 12 EC",
  heroQuote:
    "You make ordinary days feel golden, and every memory with you feels like a favorite song.",
  introBadge: "A birthday made for her",
  surpriseTitle: "For the bestie who deserves a birthday gift full of love, joy, and our favorite memories",
  giftIntro:
    "This is not just a gallery. It is a little birthday world made to remind you how loved you are, how unforgettable you are, and how beautiful life feels with you in it.",
  giftRibbon: "Wrapped with laughter, memories, and love",
  letterGreeting: "Dear Merrye,",
  letterSignature: "Your ...",
  letterClosing: "Always yours,",
  letterParagraphs:[
"I really wanted this little corner of the internet to feel like a love letter to our friendship, because a standard 'happy birthday' could never capture what you mean to me. It needed to be something that feels completely like us.",
"Thank you for always showing up for me with so much warmth, kindness, and contagious laughter. You have this beautiful way of making the heaviest days feel a million times lighter just by being in them.",
"For this next year of your life, my wish for you is soft mornings, loud laughter, answered prayers, and a deep kind of happiness that follows you wherever you go. You deserve the absolute world. Happy Birthday!"
],
  highlightNotes: [
    {
      title: "Your laugh changes the weather",
      text: "The whole mood of a room shifts the second you start laughing for real.",
    },
    {
      title: "You turn ordinary days cinematic",
      text: "Even random little hangouts with you end up feeling like scenes worth framing.",
    },
    {
      title: "You care in a way people remember",
      text: "The softness, loyalty, and effort you bring into people's lives stays with them.",
    },
  ] satisfies LoveNote[],
  giftPromises: [
    {
      title: "A page made only for you",
      text: "Not something random, not something copied. A whole little space on the internet made with you in mind.",
    },
    {
      title: "A replay of what we have shared",
      text: "Every section is meant to feel like opening a box of memories we would never want to lose.",
    },
    {
      title: "A reminder for this new year",
      text: "You deserve soft days, loud laughter, kind people, and beautiful surprises that keep finding you.",
    },
  ] satisfies GiftPromise[],
  birthdayWishes: [
    {
      label: "For your heart",
      text: "I hope this year gives you peace that stays, joy that grows, and love that feels safe and sure.",
    },
    {
      label: "For your dreams",
      text: "I hope the things you pray for start meeting you halfway and become real one by one.",
    },
    {
      label: "For us",
      text: "I hope we keep making the kind of memories that still make us smile years later.",
    },
  ] satisfies BirthdayWish[],
  moments,
  extendedMoments,
  allMemoryImages,
  heroMontage,
  memoryCount: allMemoryImages.length,
};

export const personalizationChecklist = [
  "Drop your real photos into public/memories",
  "Run npm run dev or npm run build to refresh the generated memory list",
  "Swap the placeholder memory titles and descriptions with your exact moments later",
  "Edit the letter so it sounds exactly like you",
];
