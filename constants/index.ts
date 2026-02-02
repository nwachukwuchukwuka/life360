import { FamilyMember } from "@/components/PeopleSheet";

export const COLORS = {
  primary: '#7762F0',
  background: '#7762F0',
  accent: '#FFE6BC',
  disabled: 'rgba(255, 255, 255, 0.2)',
  white: '#FFFFFF',
  black: '#000000',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
};

export interface OnboardingSlide {
  id: string;
  title: string;
  image: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Share your location with your family in real-time',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Coordinate easily with smart notifications',
    image: 'https://images.unsplash.com/photo-1524645343120-a4ae9f7d4343?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Encourage safer driving with reports on speed, texting, and more',
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=1887&auto=format&fit=crop',
  },
];


export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: string; // Ionicons name
  detailTitle?: string;
  detailText?: string;
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: '1',
    title: 'Individual Driver Reports',
    description: 'Know how (and what) your family is doing behind the wheel to become a family of better, safer drivers.',
    icon: 'car-sport-outline',
    detailTitle: 'Driver Reports',
    detailText: 'Get detailed breakdowns of every drive. See top speeds, rapid acceleration, hard braking, and phone usage while driving.'
  },
  {
    id: '2',
    title: '30 days Location History',
    description: 'Look back at the Places your Circle visited over the past 30 days.',
    icon: 'map-outline',
    detailTitle: 'Location History',
    detailText: 'Retrace steps with a comprehensive timeline of where family members have been for the last month.'
  },
  {
    id: '3',
    title: 'Unlimited Place Alerts',
    description: 'Get notified as Circle members come and go from as many Places as you\'d like.',
    icon: 'notifications-outline',
    detailTitle: 'Place Alerts',
    detailText: 'Get notified as Circle members come and go from all your family\'s spots.\n\nAll your go-tos\nWhen modern life has you moving in every direction, Place Alerts are the easiest way to make sure that your loved ones are where they need to be, on time.'
  },
  {
    id: '4',
    title: 'Priority customer support',
    description: 'Get answers within 24 hours. Helpful in-app and email support.',
    icon: 'headset-outline',
    detailTitle: 'Priority Support',
    detailText: 'Skip the line. Premium members get their questions answered first by our dedicated support team.'
  },
];


export const INTRO_SLIDES = [
  { id: '1', title: 'Use the Life360 SOS button when you feel unsafe', image: 'https://img.freepik.com/free-vector/city-night-concept-illustration_114360-1209.jpg', list: ['Walking alone at night', 'Present at an active shooting', 'Having a medical emergency'] },
  { id: '2', title: 'Hold down the button if you feel unsafe or think you might need help', image: 'https://img.freepik.com/free-vector/hand-holding-smartphone-concept-illustration_114360-394.jpg', desc: 'Hold down the button if you feel unsafe or think you might need help' },
  { id: '3', title: 'Release the button to silently notify your Circle and emergency contacts', image: 'https://img.freepik.com/free-vector/social-network-concept-illustration_114360-192.jpg', desc: 'Release the button to silently notify your Circle and emergency contacts' },
  { id: '4', title: 'A 24/7 emergency dispatcher will be ready to send police to your location', image: 'https://img.freepik.com/free-vector/call-center-concept-illustration_114360-194.jpg', desc: 'A 24/7 emergency dispatcher will be ready to send police to your location' },
  { id: '5', title: 'If you’re OK, enter your PIN code and we’ll cancel your SOS', image: 'https://img.freepik.com/free-vector/enter-pin-concept-illustration_114360-526.jpg', desc: 'If you’re OK, enter your PIN code and we’ll cancel your SOS' },
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
      id: '1',
      name: 'James',
      initial: 'J',
      location: 'Near Bukit Batok West Avenue 6',
      time: 'Since 3:32 pm',
      battery: 45,
      color: '#FF885B',
      isCharging: false,
      coordinate: { latitude: 1.3521, longitude: 103.769 },
  },
  {
      id: '2',
      name: 'Mobbin',
      initial: 'M',
      location: 'At School',
      time: 'Since 8:00 am',
      battery: 82,
      color: '#34C759',
      isCharging: true,
      coordinate: { latitude: 1.3621, longitude: 103.759 },
  },
];

export const DEFAULT_CIRCLES = [
  { id: '1', name: 'Mobbin', role: 'Life360 Premium', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80', active: true },
];