export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type Availability =
  | 'Immediate'
  | '2-4 Weeks'
  | '1-2 Months'
  | '3-6 Months';

export interface ExperienceEntry {
  role: string;
  company: string;
  country: string;
  duration: string;
  summary: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  verified: boolean;
}

export interface AIInsight {
  strengths: string[];
  recommendedRoles: string[];
  employmentReadiness: 'Ready for Employer Contact' | 'In Review' | 'Additional Screening Required';
  notes: string;
}

export interface Candidate {
  id: string;
  redactedName: string;
  occupation: string;
  country: string;
  yearsExperience: number;
  skills: string[];
  certifications: Certification[];
  occupationCode: string;
  matchScore: number;
  aiConfidence: number;
  aiSummary: string;
  aiExperience: ExperienceEntry[];
  languages: string[];
  availability: Availability;
  ieltsScore?: number;
  regionExperience?: string[];
  redactedResume: string;
  // Contact information — only revealed after candidate approval
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  candidateId: string;
  candidateName: string;
  occupation: string;
  occupationCode: string;
  country: string;
  matchScore: number;
  message: string;
  status: RequestStatus;
  requestDate: string;
  resolvedDate?: string;
}

export interface NotificationItem {
  id: string;
  type:
    | 'request_sent'
    | 'request_approved'
    | 'request_rejected'
    | 'new_candidate'
    | 'subscription'
    | 'system';
  title: string;
  description: string;
  date: string;
  read: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'new_profile' | 'approved' | 'favourite' | 'request_sent';
  title: string;
  description: string;
  date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: { label: string; included: boolean }[];
  highlighted?: boolean;
  cta: string;
}

export interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'refunded';
  invoice: string;
}

export interface EmployerProfile {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  location: string;
  hiringRequirements: string;
  abn: string;
  website: string;
}
