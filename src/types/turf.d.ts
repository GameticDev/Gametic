
interface TurfData {
  _id?: string;
  ownerId?: string;
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  image: string[];
  hourlyRate: number;
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

interface TurfFormValues {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
}