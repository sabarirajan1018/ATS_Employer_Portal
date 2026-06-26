import type {
  ActivityItem,
  BillingRecord,
  ContactRequest,
  EmployerProfile,
  NotificationItem,
  SubscriptionPlan,
} from './types';

export const initialRequests: ContactRequest[] = [
  {
    id: 'r-001',
    candidateId: 'c-002',
    candidateName: 'Miguel S.',
    occupation: 'Electrician',
    occupationCode: 'ANZSCO 341111',
    country: 'Philippines',
    matchScore: 97,
    message:
      'We have an immediate industrial electrician role on a Newcastle project. Would love to discuss.',
    status: 'approved',
    requestDate: '2025-05-10',
    resolvedDate: '2025-05-12',
  },
  {
    id: 'r-002',
    candidateId: 'c-004',
    candidateName: 'Carlos M.',
    occupation: 'Diesel Mechanic',
    occupationCode: 'ANZSCO 321212',
    country: 'Philippines',
    matchScore: 92,
    message:
      'Looking for a senior mechanic for our heavy fleet. Reach out if interested.',
    status: 'pending',
    requestDate: '2025-05-11',
  },
  {
    id: 'r-003',
    candidateId: 'c-007',
    candidateName: 'Grace W.',
    occupation: 'Civil Engineer',
    occupationCode: 'ANZSCO 233211',
    country: 'Kenya',
    matchScore: 90,
    message:
      'Civil engineer role opening for our road infrastructure project. Please reach out.',
    status: 'pending',
    requestDate: '2025-05-09',
  },
  {
    id: 'r-004',
    candidateId: 'c-009',
    candidateName: 'Liam O.',
    occupation: 'Automotive Electrician',
    occupationCode: 'ANZSCO 321111',
    country: 'Ireland',
    matchScore: 78,
    message:
      'EV technician role available at our Sydney workshop. Keen to chat?',
    status: 'rejected',
    requestDate: '2025-05-06',
    resolvedDate: '2025-05-08',
  },
];

export const initialSavedIds: string[] = ['c-001', 'c-005', 'c-011'];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n-001',
    type: 'request_approved',
    title: 'Contact request approved',
    description: 'Miguel S. (Electrician) accepted your contact request. Contact details unlocked.',
    date: '2025-05-12T09:24:00Z',
    read: false,
  },
  {
    id: 'n-002',
    type: 'new_candidate',
    title: 'New candidate available',
    description: 'Sven L. (Bricklayer, 12 years) joined the marketplace with a 95% match score.',
    date: '2025-05-11T03:10:00Z',
    read: false,
  },
  {
    id: 'n-003',
    type: 'request_rejected',
    title: 'Contact request rejected',
    description: 'Liam O. (Automotive Electrician) declined your contact request.',
    date: '2025-05-08T14:48:00Z',
    read: true,
  },
  {
    id: 'n-004',
    type: 'new_candidate',
    title: 'New welder profile available',
    description: 'Raj K. (Welder, 7 years, ANZSCO 322313) is now available with match score 94%.',
    date: '2025-05-10T01:55:00Z',
    read: false,
  },
  {
    id: 'n-005',
    type: 'request_sent',
    title: 'Contact request sent',
    description: 'Your request to Carlos M. (Diesel Mechanic) has been sent for candidate approval.',
    date: '2025-05-11T06:20:00Z',
    read: true,
  },
  {
    id: 'n-006',
    type: 'subscription',
    title: 'Subscription renewal reminder',
    description: 'Your Premium plan renews on 1 June 2025. Confirm payment method to keep priority access.',
    date: '2025-05-13T11:00:00Z',
    read: false,
  },
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'a-1',
    type: 'new_profile',
    title: 'New welder profile available',
    description: 'Raj K. — Welder, India, 7 years experience, match score 94%.',
    date: '2025-05-12',
  },
  {
    id: 'a-2',
    type: 'new_profile',
    title: 'New electrician profile available',
    description: 'Miguel S. — Electrician, Philippines, 9 years experience, match score 97%.',
    date: '2025-05-10',
  },
  {
    id: 'a-3',
    type: 'approved',
    title: 'Contact request approved',
    description: 'Miguel S. approved your contact request. Contact information unlocked.',
    date: '2025-05-12',
  },
  {
    id: 'a-4',
    type: 'favourite',
    title: 'Candidate added to favourites',
    description: 'Sven L. (Master Bricklayer) added to your shortlist.',
    date: '2025-05-09',
  },
];

export interface CurrentSubscription {
  planId: string;
  planName: string;
  status: 'active' | 'renewing' | 'cancelled';
  requestsUsed: number;
  requestsLimit: number;
  renewalDate: string;
}

export const initialSubscription: CurrentSubscription = {
  planId: 'premium',
  planName: 'Premium',
  status: 'active',
  requestsUsed: 7,
  requestsLimit: 25,
  renewalDate: '2025-06-01',
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '/mo',
    tagline: 'Browse the marketplace',
    cta: 'Switch to Free',
    features: [
      { label: 'Candidate browsing', included: true },
      { label: '5 searches per day', included: true },
      { label: 'Save up to 3 candidates', included: true },
      { label: 'Contact requests', included: false },
      { label: 'AI match scores', included: false },
      { label: 'Priority access', included: false },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 149,
    period: '/mo',
    tagline: 'For active hiring teams',
    cta: 'Upgrade to Basic',
    features: [
      { label: 'Unlimited candidate browsing', included: true },
      { label: 'Unlimited searches', included: true },
      { label: 'Unlimited saved candidates', included: true },
      { label: '5 contact requests per month', included: true },
      { label: 'AI match scores', included: true },
      { label: 'Priority access', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 399,
    period: '/mo',
    tagline: 'Scale your skilled migration pipeline',
    cta: 'Stay on Premium',
    highlighted: true,
    features: [
      { label: 'Unlimited candidate browsing', included: true },
      { label: 'Unlimited searches', included: true },
      { label: 'Unlimited saved candidates', included: true },
      { label: '25 contact requests per month', included: true },
      { label: 'AI match scores & insights', included: true },
      { label: 'Priority access to new profiles', included: true },
    ],
  },
];

export const billingHistory: BillingRecord[] = [
  {
    id: 'b-001',
    date: '2025-05-01',
    description: 'Premium — Monthly subscription',
    amount: 399,
    status: 'paid',
    invoice: 'INV-2025-0501',
  },
  {
    id: 'b-002',
    date: '2025-04-01',
    description: 'Premium — Monthly subscription',
    amount: 399,
    status: 'paid',
    invoice: 'INV-2025-0401',
  },
  {
    id: 'b-003',
    date: '2025-03-01',
    description: 'Premium — Monthly subscription',
    amount: 399,
    status: 'paid',
    invoice: 'INV-2025-0301',
  },
  {
    id: 'b-004',
    date: '2025-02-01',
    description: 'Basic — Monthly subscription',
    amount: 149,
    status: 'paid',
    invoice: 'INV-2025-0201',
  },
];

export const employerProfile: EmployerProfile = {
  companyName: 'Harbourline Construction Group',
  contactPerson: 'Daniel Hayes',
  email: 'daniel.hayes@harbourline.com.au',
  phone: '+61 2 4987 6543',
  industry: 'Commercial Construction',
  companySize: '201-500 employees',
  location: 'Newcastle, NSW, Australia',
  hiringRequirements:
    'Hiring 15 skilled tradespeople across welding, electrical and carpentry for the 2025 Newcastle infrastructure program. Open to sponsored migration.',
  abn: '12 345 678 901',
  website: 'www.harbourline.com.au',
};
