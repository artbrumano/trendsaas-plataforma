'use client';

import { useState } from 'react';
import { Plus, X, TrendingUp, Download, Globe, DollarSign } from 'lucide-react';
import { mockMobileApps, mockWebApps } from '@/lib/mock-data';
import { MobileApp, WebApp } from '@/lib/types';

interface CompareViewProps {
  initialApps?: (MobileApp | WebApp)[];
}

export default function CompareView({ initialApps = [] }: CompareViewProps) {
  const [selectedApps, setSelectedApps] = useState<(MobileApp | WebApp)[]>(initialApps.slice(0, 3));
  const [showSelector, setShowSelector] = useState(false);

  const allApps = [...mockMobileApps, ...mockWebApps];
  const availableApps = allApps.filter((app) => !selectedApps.find((s) => s.id === app.id));

  const addApp = (app: MobileApp | WebApp) => {
    if (selectedApps.length < 3) {
      setSelectedApps([...selectedApps, app]);
      setShowSelector(false);
    }
  };

  const removeApp = (appId: string) => {
    setSelectedApps(selectedApps.filter((app) => app.id !== appId));
  };

  const getMetricValue = (app: MobileApp | WebApp, metric: string): number => {
    if (metric === 'hypeScore') return app.hypeScore;
    if (metric === 'growthRate') return app.growthRate;
    if (metric === 'downloads' && app.platform === 'mobile')
      return (app as MobileApp).estimatedDownloads;
    if (metric === 'traffic' && app.platform === 'web') return (app as WebApp).estimatedTraffic;
    if (metric === 'revenue' && app.platform === 'mobile') return (app as MobileApp).estimatedRevenue;
    return 0;
  };

  const metrics = [
    { key: 'hypeScore', label: 'Hype Score', icon: TrendingUp, format: (v: number) => v.toFixed(0) },
    { key: 'growthRate', label: 'Crescimento', icon: TrendingUp, format: (v: number) => `+${v.toFixed(1)}%` },
    {
      key: 'downloads',
      label: 'Downloads/Tráfego',
      icon: Download,
      format: (v: number) => `${(v / 1000000).toFixed(1)}M`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">⚖️ Comparar Apps e SaaS</h2>
        <p className="text-gray-600">Compare até 3 apps ou sites lado a lado</p>
      </div>

      {/* App Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => {
          const app = selectedApps[index];

          if (!app) {
            return (
              <button
                key={index}
                onClick={() => setShowSelector(true)}
                className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center gap-3"
              >
                <Plus className="w-12 h-12 text-gray-400" />
                <span className="text-gray-600 font-medium">Adicionar App</span>
              </button>
            );
          }

          return (
            <div key={app.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500 relative">
              <button
                onClick={() => removeApp(app.id)}
                className="absolute top-4 right-4 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{app.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{app.name}</h3>
                <span className="text-sm text-gray-600">{app.category}</span>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-center py-2 rounded-lg font-bold">
                  Hype: {app.hypeScore}
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Crescimento</div>
                  <div className="text-xl font-bold text-green-600">+{app.growthRate.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* App Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Selecione um App</h3>
              <button
                onClick={() => setShowSelector(false)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => addApp(app)}
                  className="bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 text-left transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{app.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{app.name}</h4>
                      <span className="text-xs text-gray-600">{app.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hype</span>
                    <span className="font-bold text-orange-600">{app.hypeScore}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedApps.length >= 2 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Comparação Detalhada</h3>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-gray-600 font-medium">Métrica</th>
                {selectedApps.map((app) => (
                  <th key={app.id} className="text-center py-4 px-4">
                    <div className="text-2xl mb-2">{app.icon}</div>
                    <div className="font-bold text-gray-900">{app.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Hype Score */}
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Hype Score</td>
                {selectedApps.map((app) => {
                  const maxHype = Math.max(...selectedApps.map((a) => a.hypeScore));
                  const isMax = app.hypeScore === maxHype;
                  return (
                    <td key={app.id} className="py-4 px-4 text-center">
                      <div
                        className={`inline-block px-4 py-2 rounded-lg font-bold ${
                          isMax ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {app.hypeScore}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Growth Rate */}
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Taxa de Crescimento</td>
                {selectedApps.map((app) => {
                  const maxGrowth = Math.max(...selectedApps.map((a) => a.growthRate));
                  const isMax = app.growthRate === maxGrowth;
                  return (
                    <td key={app.id} className="py-4 px-4 text-center">
                      <div
                        className={`inline-block px-4 py-2 rounded-lg font-bold ${
                          isMax ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        +{app.growthRate.toFixed(1)}%
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Platform */}
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Plataforma</td>
                {selectedApps.map((app) => (
                  <td key={app.id} className="py-4 px-4 text-center">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {app.platform === 'mobile' ? '📱 Mobile' : '🌐 Web'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Categoria</td>
                {selectedApps.map((app) => (
                  <td key={app.id} className="py-4 px-4 text-center text-gray-700">
                    {app.category}
                  </td>
                ))}
              </tr>

              {/* Downloads/Traffic */}
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4 font-medium text-gray-700">Downloads/Tráfego</td>
                {selectedApps.map((app) => (
                  <td key={app.id} className="py-4 px-4 text-center">
                    {app.platform === 'mobile' ? (
                      <div className="text-gray-900 font-bold">
                        {((app as MobileApp).estimatedDownloads / 1000000).toFixed(1)}M downloads
                      </div>
                    ) : (
                      <div className="text-gray-900 font-bold">
                        {((app as WebApp).estimatedTraffic / 1000).toFixed(0)}K visitas/mês
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Revenue (Mobile only) */}
              {selectedApps.some((app) => app.platform === 'mobile') && (
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-700">Receita Estimada</td>
                  {selectedApps.map((app) => (
                    <td key={app.id} className="py-4 px-4 text-center">
                      {app.platform === 'mobile' ? (
                        <div className="text-gray-900 font-bold">
                          ${((app as MobileApp).estimatedRevenue / 1000).toFixed(0)}K/mês
                        </div>
                      ) : (
                        <div className="text-gray-400">N/A</div>
                      )}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Visual Comparison Chart */}
      {selectedApps.length >= 2 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📈 Comparação Visual</h3>

          <div className="space-y-6">
            {metrics.map((metric) => {
              const values = selectedApps.map((app) => getMetricValue(app, metric.key));
              const maxValue = Math.max(...values);

              return (
                <div key={metric.key}>
                  <div className="flex items-center gap-2 mb-3">
                    <metric.icon className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">{metric.label}</h4>
                  </div>

                  <div className="space-y-3">
                    {selectedApps.map((app, index) => {
                      const value = values[index];
                      const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

                      return (
                        <div key={app.id}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{app.icon}</span>
                              <span className="text-sm font-medium text-gray-700">{app.name}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{metric.format(value)}</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedApps.length < 2 && (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">⚖️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Adicione apps para comparar</h3>
          <p className="text-gray-600">Selecione pelo menos 2 apps para ver a comparação detalhada</p>
        </div>
      )}
    </div>
  );
}
