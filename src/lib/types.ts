// ============================================================================
// TIPOS E INTERFACES - TrendSaaS
// ============================================================================

export type PlatformType = 'mobile' | 'web' | 'both';
export type MobilePlatform = 'ios' | 'android' | 'both';
export type TrendDirection = 'up' | 'down' | 'stable';

// ============================================================================
// APP/SITE BASE
// ============================================================================

export interface AppBase {
  id: string;
  name: string;
  platform: PlatformType;
  category: string;
  description: string;
  icon?: string;
  url?: string;
  
  // Métricas principais
  hypeScore: number; // 0-100
  trendDirection: TrendDirection;
  growthRate: number; // percentual
  
  // Timestamps
  firstSeen: Date;
  lastUpdated: Date;
}

// ============================================================================
// MOBILE APP
// ============================================================================

export interface MobileApp extends AppBase {
  platform: 'mobile';
  mobilePlatform: MobilePlatform;
  
  // App Store / Google Play Data
  appStoreId?: string;
  playStoreId?: string;
  developer: string;
  version: string;
  size: string;
  
  // Rankings
  overallRank?: number;
  categoryRank?: number;
  
  // Reviews & Ratings
  rating: number;
  reviewCount: number;
  sentimentScore: number; // -1 a 1
  
  // Estimativas
  estimatedDownloads: number;
  estimatedRevenue: number;
  estimatedDAU: number; // Daily Active Users
  
  // Histórico (últimos 30 dias)
  downloadHistory: MetricPoint[];
  rankHistory: MetricPoint[];
  ratingHistory: MetricPoint[];
}

// ============================================================================
// WEB APP/SITE
// ============================================================================

export interface WebApp extends AppBase {
  platform: 'web';
  domain: string;
  
  // Tecnologias detectadas
  technologies: Technology[];
  
  // SEO & Traffic
  estimatedTraffic: number;
  trafficSources: TrafficSource[];
  topKeywords: Keyword[];
  topPages: PageMetric[];
  
  // Backlinks
  backlinks: number;
  referringDomains: number;
  
  // Social & Community
  githubStars?: number;
  productHuntVotes?: number;
  
  // Histórico (últimos 30 dias)
  trafficHistory: MetricPoint[];
  keywordHistory: MetricPoint[];
}

// ============================================================================
// MÉTRICAS E PONTOS DE DADOS
// ============================================================================

export interface MetricPoint {
  date: string;
  value: number;
}

export interface Technology {
  name: string;
  category: string;
  confidence: number; // 0-1
}

export interface TrafficSource {
  source: string;
  percentage: number;
}

export interface Keyword {
  keyword: string;
  volume: number;
  position: number;
  difficulty: number;
}

export interface PageMetric {
  path: string;
  visits: number;
  percentage: number;
}

// ============================================================================
// ANÁLISE E PREVISÕES
// ============================================================================

export interface TrendAnalysis {
  current: number;
  change30d: number;
  change90d: number;
  prediction30d: number;
  prediction90d: number;
  volatility: number; // 0-1
  confidence: number; // 0-1
}

export interface HypeSpike {
  detectedAt: Date;
  magnitude: number; // multiplicador
  duration: number; // dias
  reason?: string;
}

export interface ForecastData {
  metric: string;
  current: number;
  forecast30d: number;
  forecast90d: number;
  trend: TrendDirection;
  confidence: number;
  dataPoints: MetricPoint[];
}

// ============================================================================
// COMPARAÇÃO
// ============================================================================

export interface ComparisonData {
  apps: (MobileApp | WebApp)[];
  metrics: ComparisonMetric[];
}

export interface ComparisonMetric {
  name: string;
  values: { appId: string; value: number }[];
  unit: string;
}

// ============================================================================
// INSIGHTS GLOBAIS
// ============================================================================

export interface CategoryInsight {
  category: string;
  growthRate: number;
  appCount: number;
  avgHypeScore: number;
  trending: boolean;
}

export interface MarketBubble {
  name: string;
  size: number; // market size
  growth: number; // growth rate
  hype: number; // hype score
  apps: number; // number of apps
}

export interface GlobalInsights {
  trendingCategories: CategoryInsight[];
  marketBubbles: MarketBubble[];
  emergingTechnologies: Technology[];
  topGrowers: (MobileApp | WebApp)[];
}

// ============================================================================
// SEARCH & FILTERS
// ============================================================================

export interface SearchQuery {
  query: string;
  platform?: PlatformType;
  category?: string;
  minHypeScore?: number;
  sortBy?: 'hype' | 'growth' | 'downloads' | 'traffic';
}

export interface SearchResult {
  results: (MobileApp | WebApp)[];
  total: number;
  page: number;
  pageSize: number;
}
