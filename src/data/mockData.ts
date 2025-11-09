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
