
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export const mainNavItems: NavItem[] = [
  { title: 'Browse', href: '/' },
  { title: 'Messages', href: '/chat' },
  { title: 'AI Assistant', href: '/ai-chat' },
];


export type Property = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  imageUrl: string;
  imageHint: string;
  type: 'Apartment' | 'Villa' | 'Cabin' | 'Penthouse' | 'Duplex' | 'Terrace House';
  bedrooms: number;
  bathrooms: number;
};

export const sampleProperties: Property[] = [
  {
    id: '1',
    name: 'Luxury Lekki Phase 1 Villa',
    location: 'Lekki Phase 1, Lagos',
    pricePerNight: 150000, // Adjusted price for local currency context (example)
    rating: 4.9,
    amenities: ['Pool', 'WiFi', 'Generator', 'Kitchen', 'Air Conditioning', 'Security'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503583604.jpg?k=9cf40ce02070838d38048e6ed05d329c6cd996f33bf1ba281a4c897b2d231c91&o=&hp=1',
    imageHint: 'hotel exterior',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 5,
  },
  {
    id: '2',
    name: 'Chic Ikoyi Apartment',
    location: 'Ikoyi, Lagos',
    pricePerNight: 90000,
    rating: 4.7,
    amenities: ['WiFi', 'Kitchen', 'Gym Access', 'City View', '24/7 Power'],
    imageUrl: 'https://images.nigeriapropertycentre.com/properties/images/1397749/062f15509e7f05-cozy-chic-1-bedroom-apartment-with-pool-snooker-modern-decor-short-let-old-ikoyi-ikoyi-lagos.jpg',
    imageHint: 'cozy apartment ikoyi',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: '3',
    name: 'Serene Victoria Island Duplex',
    location: 'Victoria Island, Lagos',
    pricePerNight: 120000,
    rating: 4.8,
    amenities: ['Serviced', 'WiFi', 'Kitchen', 'Security', 'Spacious Living'],
    imageUrl: 'https://isijayne.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-15-at-09.54.26-900x600.jpeg',
    imageHint: 'modern interior',
    type: 'Duplex',
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    id: '4',
    name: 'Banana Island Penthouse',
    location: 'Banana Island, Lagos',
    pricePerNight: 300000,
    rating: 4.9,
    amenities: ['Rooftop Terrace', 'WiFi', 'Kitchen', 'Jacuzzi', 'Panoramic View', 'Private Elevator'],
    imageUrl: 'https://hutbay.blob.core.windows.net/listings/53099772059b46fc84c1062148341c9f.jpg',
    imageHint: 'penthouse interior',
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 4,
  },
  {
    id: '5',
    name: 'Cozy Yaba Studio',
    location: 'Yaba, Lagos',
    pricePerNight: 45000,
    rating: 4.5,
    amenities: ['WiFi', 'Kitchenette', 'Quiet Environment', 'Proximity to Tech Hubs'],
    imageUrl: 'https://imgservice.bedroomvillas.com/500x245/classy-condos-ng-lagos-bc-10743192-0.jpg',
    imageHint: 'classy yaba studio',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: '6',
    name: 'Modern Surulere Terrace House',
    location: 'Surulere, Lagos',
    pricePerNight: 70000,
    rating: 4.3,
    amenities: ['Family Friendly', 'WiFi', 'Kitchen', 'Gated Community'],
    imageUrl: 'https://images.propertypro.ng/medium/4bed-terrace-duplexes-GKDXabWllptnsVIc3J64.jpg',
    imageHint: 'terrace duplex',
    type: 'Terrace House',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: '7',
    name: 'Elegant Ikeja GRA Apartment',
    location: 'Ikeja GRA, Lagos',
    pricePerNight: 100000,
    rating: 4.6,
    amenities: ['Swimming Pool', 'WiFi', 'Fully Furnished', 'Security', 'Gym'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447381012.jpg?k=be1579ad303e367f3f8d46895f6a534c78fdba513b912533e911953f23d0a560&o=&hp=1',
    imageHint: 'ikeja apartment',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: '8',
    name: 'Waterfront Lekki Duplex',
    location: 'Lekki, Lagos', // General Lekki
    pricePerNight: 180000,
    rating: 4.7,
    amenities: ['Water View', 'Boat Jetty Access', 'WiFi', 'Modern Kitchen', 'Air Conditioning', 'Security'],
    imageUrl: 'https://www.superiteafrica.com/uploads/property_image/IMG_4265.jpeg',
    imageHint: 'lekki duplex exterior',
    type: 'Duplex',
    bedrooms: 4,
    bathrooms: 4,
  },
];

export const allAmenities = Array.from(new Set(sampleProperties.flatMap(p => p.amenities))).sort();
export const allLocations = Array.from(new Set(sampleProperties.map(p => p.location))).sort();
export const allPropertyTypes = Array.from(new Set(sampleProperties.map(p => p.type))).sort();

