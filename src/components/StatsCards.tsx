import React from 'react';
import { BookOpen, Clock, TrendingUp, Star } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalBooks: number;
    totalPages: number;
    readingHours: number;
    completedBooks: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Pages Read',
      value: stats.totalPages.toLocaleString(),
      icon: TrendingUp,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Reading Hours',
      value: `${stats.readingHours}h`,
      icon: Clock,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Completed',
      value: stats.completedBooks,
      icon: Star,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
          </div>
        );
      })}
    </div>
  );
}