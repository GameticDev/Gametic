import ActivityCard from "@/components/user/userCard";


const dummyData = Array.from({ length: 8 }, (_, i) => ({
  userName: 'suhail km',
  price: '₹199',
  activity: '5s Football Activity',
  location: 'South United Fo...',
  distance: '0.10 kms',
  sportType: 'Football 5s',
  joined: '3/10',
  avatarUrl: '/ava.avif', // Add public/avatar.jpg
  participants: [
    '/p1.jpg', '/p1.jpg', '/p1.jpg' // Add public/p1.jpg etc.
  ]
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dummyData.map((card, index) => (
          <ActivityCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}