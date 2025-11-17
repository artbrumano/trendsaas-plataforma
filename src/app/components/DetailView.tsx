'use client';

import {
  TrendingUp,
  TrendingDown,
  Star,
  Download,
  DollarSign,
  Users,
  Globe,
  Code,
  ExternalLink,
  ArrowLeft,
  Calendar,
  BarChart3
} from 'lucide-react';
import { MobileApp, WebApp } from '@/lib/types';
import { forecastTrend } from '@/lib/formulas';

interface DetailViewProps {
  app: MobileApp | WebApp;
  onBack: () => void;
}

export default function DetailView({ app, onBack }: DetailViewProps) {
  const isMobile = app.platform === 'mobile';
  const mobileApp = isMobile ? (app as MobileApp) : null;
  const webApp = !isMobile ? (app as WebApp) : null;

  // Calcular previsões
  const history = isMobile ? mobileApp!.downloadHistory : webApp!.trafficHistory;
  const forecast30 = forecastTrend(history, 30);
  const forecast90 = forecastTrend(history, 90);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white">
        <div className="flex items-start gap-6">
          <div className="text-6xl">{app.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{app.name}</h1>
              <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full">
                Hype: {app.hypeScore}
              </div>
            </div>
            <p className="text-lg text-blue-100 mb-4">{app.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {isMobile ? '📱 Mobile App' : '🌐 Web App'}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {app.category}
              </span>
              {app.trendDirection === 'up' && (
                <span className="bg-green-500/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Em Alta
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isMobile && mobileApp && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(mobileApp.estimatedDownloads / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${(mobileApp.estimatedRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Receita/mês</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{mobileApp.rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">{mobileApp.reviewCount.toLocaleString()} reviews</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(mobileApp.estimatedDAU / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Usuários Ativos</div>
                </div>
              </div>
            </div>
          </>
        )}

        {!isMobile && webApp && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(webApp.estimatedTraffic / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Visitas/mês</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ExternalLink className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{webApp.backlinks.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Backlinks</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{webApp.technologies.length}</div>
                  <div className="text-sm text-gray-600">Tecnologias</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{webApp.topKeywords.length}</div>
                  <div className="text-sm text-gray-600">Keywords</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Histórico de Crescimento (30 dias)</h3>
        <div className="h-64 flex items-end gap-1">
          {history.slice(-30).map((point, index) => {
            const maxValue = Math.max(...history.map(p => p.value));
            const height = (point.value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm hover:opacity-80 transition-opacity"
                style={{ height: `${height}%` }}
                title={`${point.date}: ${point.value.toLocaleString()}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>{history[history.length - 30]?.date || 'Início'}</span>
          <span>{history[history.length - 1]?.date || 'Hoje'}</span>
        </div>
      </div>

      {/* Forecasts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Previsão 30 dias</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {isMobile
                  ? `${(forecast30.forecast / 1000000).toFixed(1)}M`
                  : `${(forecast30.forecast / 1000).toFixed(0)}K`}
              </div>
              <div className="text-sm text-gray-600">
                {isMobile ? 'Downloads estimados' : 'Visitas estimadas'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {forecast30.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
              {forecast30.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
              <span className="text-sm font-medium text-gray-700">
                Tendência: {forecast30.trend === 'up' ? 'Alta' : forecast30.trend === 'down' ? 'Baixa' : 'Estável'}
              </span>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Confiança</span>
                <span className="font-bold text-gray-900">{(forecast30.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Previsão 90 dias</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {isMobile
                  ? `${(forecast90.forecast / 1000000).toFixed(1)}M`
                  : `${(forecast90.forecast / 1000).toFixed(0)}K`}
              </div>
              <div className="text-sm text-gray-600">
                {isMobile ? 'Downloads estimados' : 'Visitas estimadas'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {forecast90.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
              {forecast90.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
              <span className="text-sm font-medium text-gray-700">
                Tendência: {forecast90.trend === 'up' ? 'Alta' : forecast90.trend === 'down' ? 'Baixa' : 'Estável'}
              </span>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Confiança</span>
                <span className="font-bold text-gray-900">{(forecast90.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Specific: Reviews Sentiment */}
      {isMobile && mobileApp && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Análise de Sentimento</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Sentimento Geral</span>
                  <span className="text-sm font-bold text-gray-900">
                    {(mobileApp.sentimentScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                    style={{ width: `${mobileApp.sentimentScore * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {mobileApp.sentimentScore > 0.7
                  ? '😊 Usuários estão muito satisfeitos com o app'
                  : mobileApp.sentimentScore > 0.5
                  ? '🙂 Feedback geralmente positivo'
                  : '😐 Sentimento misto, há espaço para melhorias'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Web Specific: Technologies */}
      {!isMobile && webApp && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🛠️ Stack Tecnológico</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {webApp.technologies.map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{tech.name}</h4>
                  <span className="text-xs text-gray-500">{(tech.confidence * 100).toFixed(0)}%</span>
                </div>
                <span className="text-sm text-gray-600">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Web Specific: Traffic Sources */}
      {!isMobile && webApp && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🌐 Fontes de Tráfego</h3>
          <div className="space-y-3">
            {webApp.trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <span className="text-sm font-bold text-gray-900">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
