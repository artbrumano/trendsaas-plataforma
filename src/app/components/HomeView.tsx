'use client';

import { TrendingUp, Zap, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { mockMobileApps, mockWebApps, mockGlobalInsights } from '@/lib/mock-data';
import { MobileApp, WebApp } from '@/lib/types';

interface HomeViewProps {
  onSelectApp: (app: MobileApp | WebApp) => void;
}

export default function HomeView({ onSelectApp }: HomeViewProps) {
  const trendingApps = [...mockMobileApps, ...mockWebApps]
    .sort((a, b) => b.hypeScore - a.hypeScore)
    .slice(0, 6);

  const recentSpikes = [...mockMobileApps, ...mockWebApps]
    .filter(app => app.growthRate > 100)
    .sort((a, b) => b.growthRate - a.growthRate)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">TrendSaaS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra os Apps e SaaS em Alta
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Análise de tendências, métricas estimadas e insights para criadores indie e investidores.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">{mockGlobalInsights.topGrowers.length}K+</div>
              <div className="text-sm text-blue-100">Apps Analisados</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">
                {mockGlobalInsights.trendingCategories.filter(c => c.trending).length}
              </div>
              <div className="text-sm text-blue-100">Categorias em Alta</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">Real-time</div>
              <div className="text-sm text-blue-100">Dados Atualizados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Apps */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🔥 Trending Agora</h2>
            <p className="text-gray-600">Apps e SaaS com maior hype score</p>
          </div>
          <TrendingUp className="w-6 h-6 text-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{app.icon}</div>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {app.hypeScore}
                  </div>
                  {app.trendDirection === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                  {app.trendDirection === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                  {app.trendDirection === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{app.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>

              <div className="flex items-center gap-4 text-sm">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {app.platform === 'mobile' ? '📱 Mobile' : '🌐 Web'}
                </span>
                <span className="text-gray-500">{app.category}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Crescimento</span>
                  <span className="font-bold text-green-600">+{app.growthRate.toFixed(1)}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Hype Spikes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">⚡ Crescimento Acelerado</h2>
            <p className="text-gray-600">Apps com picos de crescimento anormais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentSpikes.map((app) => (
            <button
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{app.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                    <Zap className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{app.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                      +{app.growthRate.toFixed(0)}% crescimento
                    </div>
                    <span className="text-xs text-gray-500">{app.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📊 Categorias em Alta</h2>
            <p className="text-gray-600">Setores com maior crescimento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGlobalInsights.trendingCategories.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{category.category}</h3>
                {category.trending && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Trending
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Crescimento</span>
                  <span className="font-bold text-green-600">+{category.growthRate.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Apps</span>
                  <span className="font-medium text-gray-900">{category.appCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hype Médio</span>
                  <span className="font-medium text-orange-600">{category.avgHypeScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
