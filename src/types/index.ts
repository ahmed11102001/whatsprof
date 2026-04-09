export interface User {
  id: string;
  name: string;
  email: string;
  package: string;
  contactsCount: number;
  sentMessages: number;
  totalMessages: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  messages: number;
  features: string[];
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SidebarItem {
  icon: string;
  label: string;
  href: string;
}
