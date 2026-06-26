'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  initialActivities,
  initialNotifications,
  initialRequests,
  initialSavedIds,
  initialSubscription,
  subscriptionPlans,
  type CurrentSubscription,
} from '@/lib/mock-data';
import type { ActivityItem, ContactRequest, NotificationItem } from '@/lib/types';

interface ToastMsg {
  id: number;
  title: string;
  description?: string;
}

interface PortalContextValue {
  // Auth
  isAuthed: boolean;
  login: (email: string) => void;
  logout: () => void;
  employerEmail: string;

  // Saved candidates
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;

  // Contact requests
  requests: ContactRequest[];
  requestContact: (
    candidateId: string,
    candidateName: string,
    occupation: string,
    occupationCode: string,
    country: string,
    matchScore: number,
    message: string,
  ) => void;
  getRequestFor: (candidateId: string) => ContactRequest | undefined;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;

  // Activities
  activities: ActivityItem[];

  // Subscription
  subscription: CurrentSubscription;
  setSubscriptionPlan: (planId: string) => void;

  // Toasts
  toasts: ToastMsg[];
  pushToast: (title: string, description?: string) => void;
  dismissToast: (id: number) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [employerEmail, setEmployerEmail] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(initialSavedIds);
  const [requests, setRequests] = useState<ContactRequest[]>(initialRequests);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [subscription, setSubscription] = useState<CurrentSubscription>(initialSubscription);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const pushToast = useCallback((title: string, description?: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback((email: string) => {
    setEmployerEmail(email);
    setIsAuthed(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthed(false);
    setEmployerEmail('');
  }, []);

  const toggleSaved = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const exists = prev.includes(id);
        return exists ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [],
  );

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const addActivity = useCallback(
    (activity: Omit<ActivityItem, 'id' | 'date'>) => {
      const newActivity: ActivityItem = {
        ...activity,
        id: `a-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 12));
    },
    [],
  );

  const addNotification = useCallback(
    (notification: Omit<NotificationItem, 'id' | 'read' | 'date'>) => {
      const newNotif: NotificationItem = {
        ...notification,
        id: `n-${Date.now()}`,
        read: false,
        date: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    [],
  );

  const requestContact = useCallback<PortalContextValue['requestContact']>(
    (
      candidateId,
      candidateName,
      occupation,
      occupationCode,
      country,
      matchScore,
      message,
    ) => {
      const existing = requests.find((r) => r.candidateId === candidateId);
      if (existing) return;
      const newRequest: ContactRequest = {
        id: `r-${Date.now()}`,
        candidateId,
        candidateName,
        occupation,
        occupationCode,
        country,
        matchScore,
        message,
        status: 'pending',
        requestDate: new Date().toISOString().slice(0, 10),
      };
      setRequests((prev) => [newRequest, ...prev]);
      addNotification({
        type: 'request_sent',
        title: 'Contact request sent',
        description: `Your request to ${candidateName} (${occupation}) has been sent for candidate approval.`,
      });
      addActivity({
        type: 'request_sent',
        title: 'Contact request sent',
        description: `Request sent to ${candidateName} (${occupation}). Awaiting candidate approval.`,
      });
    },
    [requests, addNotification, addActivity],
  );

  const getRequestFor = useCallback(
    (candidateId: string) =>
      requests.find((r) => r.candidateId === candidateId),
    [requests],
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const setSubscriptionPlan = useCallback((planId: string) => {
    const plan = subscriptionPlans.find((p) => p.id === planId);
    if (!plan) return;
    setSubscription((prev) => {
      const limitForPlan: Record<string, number> = { free: 0, basic: 5, premium: 25 };
      return {
        planId: plan.id,
        planName: plan.name,
        status: 'active',
        requestsUsed: Math.min(prev.requestsUsed, limitForPlan[plan.id] ?? 0),
        requestsLimit: limitForPlan[plan.id] ?? 0,
        renewalDate: prev.renewalDate,
      };
    });
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const value: PortalContextValue = {
    isAuthed,
    login,
    logout,
    employerEmail,
    savedIds,
    toggleSaved,
    isSaved,
    requests,
    requestContact,
    getRequestFor,
    notifications,
    markNotificationRead,
    markAllRead,
    unreadCount,
    activities,
    subscription,
    setSubscriptionPlan,
    toasts,
    pushToast,
    dismissToast,
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used within PortalProvider');
  return ctx;
}
