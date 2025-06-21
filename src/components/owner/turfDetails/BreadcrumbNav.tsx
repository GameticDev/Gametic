import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbNavProps {
  username?: string;
  turfName: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ username, turfName }) => {
  const router = useRouter();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li className="flex items-center">
            <button
              onClick={() => router.push('/owner')}
              className="flex items-center font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {username}
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => router.push('/owner')}
                className="ml-2 font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                My Turfs
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-2 font-medium text-blue-600">{turfName}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbNav;