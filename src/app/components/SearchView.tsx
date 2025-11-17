'use client';

import { Search, Filter, TrendingUp, Smartphone, Globe } from 'lucide-react';
import { useState } from 'react';
import { mockMobileApps, mockWebApps } from '@/lib/mock-data';
import { MobileApp, WebApp, PlatformType } from '@/lib/types';

interface SearchViewProps {
  onSelectApp: (app: MobileApp | WebApp) => void;
}

export default function SearchView({ onSelectApp }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'hype' | 'growth' | 'name'>('hype');

  const allApps = [...mockMobileApps, ...mockWebApps];

  // Filtrar e ordenar
  const filteredApps = allApps
    .filter((app) => {
      const matchesQuery =
        query === '' ||
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase()) ||
        app.category.toLowerCase().includes(query.toLowerCase());

      const matchesPlatform =
        platformFilter === 'all' || app.platform === platformFilter;

      return matchesQuery && matchesPlatform;
    })
    .sort((a, b) => {
      if (sortBy === 'hype') return b.hypeScore - a.hypeScore;
      if (sortBy === 'growth') return b.growthRate - a.growthRate;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Buscar Apps e SaaS</h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Digite o nome do app, URL do site ou categoria..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>

          {/* Platform Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                platformFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setPlatformFilter('mobile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                platformFilter === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </button>
            <button
              onClick={() => setPlatformFilter('web')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                platformFilter === 'web'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              Web
            </button>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:border-blue-500 focus:outline-none"
            >
              <option value="hype">Hype Score</option>
              <option value="growth">Crescimento</option>
              <option value="name">Nome</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-bold text-gray-900">{filteredApps.length}</span> resultados encontrados
        </p>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onSelectApp(app)}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-left border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{app.icon}</div>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {app.hypeScore}
                </div>
                <span className="text-xs text-gray-500">{app.platform === 'mobile' ? '📱' : '🌐'}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{app.name}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {app.category}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Crescimento</span>
                <span className="font-bold text-green-600">+{app.growthRate.toFixed(1)}%</span>
              </div>
              {app.platform === 'mobile' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-medium text-gray-900">
                    {((app as MobileApp).estimatedDownloads / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
              {app.platform === 'web' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tráfego/mês</span>
                  <span className="font-medium text-gray-900">
                    {((app as WebApp).estimatedTraffic / 1000).toFixed(0)}K
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou buscar por outro termo</p>
        </div>
      )}
    </div>
  );
}
