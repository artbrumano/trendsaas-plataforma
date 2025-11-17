'use client';

import { TrendingUp, Zap, Target, Lightbulb } from 'lucide-react';
import { mockGlobalInsights } from '@/lib/mock-data';

export default function InsightsView() {
  const { trendingCategories, marketBubbles, emergingTechnologies, topGrowers } = mockGlobalInsights;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-bold">Insights Globais</h1>
        </div>
        <p className="text-lg text-purple-100">
          Análise do mercado indie, tendências emergentes e oportunidades de investimento
        </p>
      </div>

      {/* Trending Categories */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categorias em Alta</h2>
            <p className="text-gray-600">Setores com maior crescimento no mercado</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCategories.map((category, index) => (
            <div
              key={category.category}
              className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${
                category.trending ? 'border-green-400' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{category.category}</h3>
                  {category.trending && (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">
                      🔥 Trending
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-300">#{index + 1}</div>
              </div>

              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Taxa de Crescimento</div>
                  <div className="text-2xl font-bold text-green-600">+{category.growthRate.toFixed(1)}%</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Apps</div>
                    <div className="text-lg font-bold text-gray-900">{category.appCount.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Hype Médio</div>
                    <div className="text-lg font-bold text-orange-600">{category.avgHypeScore}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Bubbles */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bolhas de Mercado</h2>
            <p className="text-gray-600">Nichos com alto potencial de crescimento</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketBubbles.map((bubble) => {
              // Calcula tamanho visual baseado no market size
              const sizeScale = Math.min(200, (bubble.size / 20000000) * 200 + 100);

              return (
                <div key={bubble.name} className="flex items-center gap-6">
                  {/* Bubble Visual */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-xl"
                      style={{
                        width: `${sizeScale}px`,
                        height: `${sizeScale}px`
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">{bubble.hype}</div>
                        <div className="text-xs">Hype</div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      +{bubble.growth.toFixed(0)}%
                    </div>
                  </div>

                  {/* Bubble Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{bubble.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tamanho do Mercado</span>
                        <span className="font-bold text-gray-900">
                          ${(bubble.size / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Crescimento</span>
                        <span className="font-bold text-green-600">+{bubble.growth.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Apps no Nicho</span>
                        <span className="font-bold text-gray-900">{bubble.apps.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emerging Technologies */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-yellow-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tecnologias Emergentes</h2>
            <p className="text-gray-600">Stacks e ferramentas em ascensão</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {emergingTechnologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
                <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full">
                  {tech.category}
                </span>
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-1">Confiança</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{ width: `${tech.confidence * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold text-gray-900 mt-1">
                    {(tech.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Growers */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Maiores Crescimentos</h2>
            <p className="text-gray-600">Apps e SaaS com crescimento explosivo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topGrowers.map((app, index) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{app.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{app.description}</p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Hype</div>
                      <div className="text-lg font-bold text-orange-600">{app.hypeScore}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Crescimento</div>
                      <div className="text-lg font-bold text-green-600">+{app.growthRate.toFixed(0)}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Tipo</div>
                      <div className="text-lg">{app.platform === 'mobile' ? '📱' : '🌐'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Summary */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">📊 Resumo do Mercado</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">
              {trendingCategories.reduce((sum, cat) => sum + cat.appCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-indigo-100">Apps Analisados</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">
              {trendingCategories.filter((c) => c.trending).length}
            </div>
            <div className="text-sm text-indigo-100">Categorias Trending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">{marketBubbles.length}</div>
            <div className="text-sm text-indigo-100">Nichos em Alta</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">
              +
              {(
                trendingCategories.reduce((sum, cat) => sum + cat.growthRate, 0) /
                trendingCategories.length
              ).toFixed(0)}
              %
            </div>
            <div className="text-sm text-indigo-100">Crescimento Médio</div>
          </div>
        </div>
      </section>
    </div>
  );
}
