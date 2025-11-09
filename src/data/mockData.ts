export interface Item {
  id: number;
  title: string;
  type: "Rent" | "Sell";
  category: "Electronics" | "Books" | "Sports" | "Misc";
  price: number;
  ownerId: number;
  image: string;
  condition: string;
  verified: boolean;
  description: string;
}

export interface Request {
  id: number;
  title: string;
  type: "Buy" | "Rent";
  category: "Electronics" | "Books" | "Sports" | "Misc";
  maxPrice: number;
  requesterId: number;
  description: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  rating: number;
  avatar: string;
}

export interface Message {
  from: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  bookingId: number;
  itemId: number;
  messages: Message[];
}

export const items: Item[] = [
  {
    id: 1,
    title: "DSLR Camera",
    type: "Rent",
    category: "Electronics",
    price: 200,
    ownerId: 1,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
    condition: "Excellent, lightly used.",
    verified: true,
    description: "Perfect for fests and project shoots. Includes bag and battery."
  },
  {
    id: 2,
    title: "HP Printer",
    type: "Sell",
    category: "Electronics",
    price: 3500,
    ownerId: 2,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=600&fit=crop",
    condition: "Good condition, works perfectly.",
    verified: true,
    description: "Portable HP printer with extra ink cartridges."
  },
  {
    id: 3,
    title: "Cricket Kit",
    type: "Rent",
    category: "Sports",
    price: 100,
    ownerId: 3,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
    condition: "Used but well maintained.",
    verified: false,
    description: "Complete kit for weekend matches — pads, gloves, bat."
  },
  {
    id: 4,
    title: "Data Structures Textbook",
    type: "Sell",
    category: "Books",
    price: 450,
    ownerId: 1,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
    condition: "Like new, barely used.",
    verified: true,
    description: "Standard textbook for CS students. No markings."
  },
  {
    id: 5,
    title: "Gaming Keyboard",
    type: "Rent",
    category: "Electronics",
    price: 150,
    ownerId: 2,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop",
    condition: "Excellent condition.",
    verified: true,
    description: "Mechanical RGB keyboard. Perfect for gaming or coding."
  },
  {
    id: 6,
    title: "Badminton Racket Set",
    type: "Rent",
    category: "Sports",
    price: 80,
    ownerId: 3,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=600&fit=crop",
    condition: "Good condition.",
    verified: false,
    description: "2 rackets with shuttlecocks included."
  },
  {
    id: 7,
    title: "Study Lamp",
    type: "Sell",
    category: "Misc",
    price: 600,
    ownerId: 4,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop",
    condition: "Excellent condition.",
    verified: true,
    description: "LED desk lamp with adjustable brightness. Perfect for late-night study sessions."
  },
  {
    id: 8,
    title: "Graphing Calculator",
    type: "Rent",
    category: "Electronics",
    price: 50,
    ownerId: 4,
    image: "https://images.unsplash.com/photo-1611165973554-0d4e32d8e00d?w=800&h=600&fit=crop",
    condition: "Good working condition.",
    verified: true,
    description: "TI-84 Plus graphing calculator. Great for exams and assignments."
  },
  {
    id: 9,
    title: "Python Programming Book",
    type: "Sell",
    category: "Books",
    price: 350,
    ownerId: 4,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&h=600&fit=crop",
    condition: "Like new.",
    verified: true,
    description: "Comprehensive Python guide with exercises. Minimal wear."
  }
];

export const users: User[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@nitj.ac.in",
    verified: true,
    rating: 4.9,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 2,
    name: "Aakash Mehta",
    email: "aakash@nitj.ac.in",
    verified: true,
    rating: 4.7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash"
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan@nitj.ac.in",
    verified: false,
    rating: 4.2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  }
];

export const chats: Chat[] = [
  {
    bookingId: 101,
    itemId: 1,
    messages: [
      { from: "You", text: "Hi Priya, is the DSLR still available?", timestamp: "10:30 AM" },
      { from: "Priya Sharma", text: "Yes! You can rent it today from 3–6 PM.", timestamp: "10:32 AM" },
      { from: "You", text: "Perfect, I'll pick it up from the library desk.", timestamp: "10:35 AM" }
    ]
  }
];

export const currentUser: User = {
  id: 4,
  name: "Rahul Kumar",
  email: "student@nitj.ac.in",
  verified: true,
  rating: 4.8,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
};

export const requests: Request[] = [
  {
    id: 1,
    title: "Looking for MacBook Pro",
    type: "Buy",
    category: "Electronics",
    maxPrice: 50000,
    requesterId: 2,
    description: "Need a MacBook Pro for development work. Preferably 2020 or newer model.",
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Need Calculus Textbook",
    type: "Rent",
    category: "Books",
    maxPrice: 200,
    requesterId: 3,
    description: "Looking to rent Advanced Engineering Mathematics for this semester.",
    createdAt: "1 day ago"
  },
  {
    id: 3,
    title: "Football needed",
    type: "Rent",
    category: "Sports",
    maxPrice: 50,
    requesterId: 1,
    description: "Need a football for weekend matches. Good condition preferred.",
    createdAt: "3 days ago"
  },
  {
    id: 4,
    title: "Wireless Mouse",
    type: "Buy",
    category: "Electronics",
    maxPrice: 800,
    requesterId: currentUser.id,
    description: "Looking for a good wireless mouse for daily use.",
    createdAt: "5 hours ago"
  }
];

