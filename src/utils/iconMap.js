import {
  Plane,
  Train,
  Car,
  Mountain,
  ShoppingBag,
  Home,
  MapPin,
  Clock,
  Coffee,
  Camera,
  Music,
  Heart,
  Sunrise,
  Star,
  Snowflake,
  Edit3
} from 'lucide-react';

export const iconMap = {
  Plane,
  Train,
  Car,
  Mountain,
  ShoppingBag,
  Home,
  MapPin,
  Clock,
  Coffee,
  Camera,
  Music,
  Heart,
  Sunrise,
  Star,
  Snowflake,
  Edit3
};

export const getIcon = (iconName) => iconMap[iconName] || MapPin;
