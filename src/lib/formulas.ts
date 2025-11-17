// ============================================================================
// FÓRMULAS INTERNAS - TrendSaaS
// Sistema de cálculo proprietário para estimativas e análises
// ============================================================================

import { MetricPoint, TrendDirection, HypeSpike } from './types';

// ============================================================================
// 1. ESTIMATIVA DE DOWNLOADS (Mobile Apps)
// ============================================================================

/**
 * Estima downloads baseado em:
 * - Posição no ranking
 * - Número de reviews
 * - Rating médio
 * - Idade do app
 */
export function estimateDownloads(
  categoryRank: number,
  reviewCount: number,
  rating: number,
  daysSinceLaunch: number
): number {
  // Base: quanto melhor o rank, mais downloads
  const rankFactor = Math.max(1, 10000000 / Math.pow(categoryRank, 1.5));
  
  // Reviews indicam engajamento (1 review ≈ 100-500 downloads)
  const reviewFactor = reviewCount * 250;
  
  // Rating multiplica o potencial
  const ratingMultiplier = Math.pow(rating / 5, 2);
  
  // Apps mais antigos têm mais downloads acumulados
  const ageFactor = Math.sqrt(daysSinceLaunch) * 100;
  
  const estimated = (rankFactor + reviewFactor + ageFactor) * ratingMultiplier;
  
  return Math.round(estimated);
}

// ============================================================================
// 2. ESTIMATIVA DE RECEITA (Mobile Apps)
// ============================================================================

/**
 * Estima receita mensal baseado em:
 * - Downloads estimados
 * - Categoria (algumas monetizam melhor)
 * - Rating (apps melhores retêm mais)
 * - Modelo de negócio inferido
 */
export function estimateRevenue(
  estimatedDownloads: number,
  category: string,
  rating: number,
  hasInAppPurchases: boolean = true
): number {
  // Conversão base: 2-5% dos usuários pagam algo
  const conversionRate = hasInAppPurchases ? 0.03 : 0.01;
  
  // ARPU (Average Revenue Per User) varia por categoria
  const categoryARPU: Record<string, number> = {
    'Finance': 15,
    'Business': 12,
    'Productivity': 8,
    'Health & Fitness': 10,
    'Education': 7,
    'Entertainment': 5,
    'Games': 3,
    'Social': 2,
    'Utilities': 6,
    'default': 5
  };
  
  const arpu = categoryARPU[category] || categoryARPU['default'];
  
  // Rating afeta retenção e lifetime value
  const ratingMultiplier = Math.pow(rating / 5, 1.5);
  
  // Estimativa mensal (assumindo 30% dos downloads são ativos mensalmente)
  const activeUsers = estimatedDownloads * 0.3;
  const payingUsers = activeUsers * conversionRate;
  const monthlyRevenue = payingUsers * arpu * ratingMultiplier;
  
  return Math.round(monthlyRevenue);
}

// ============================================================================
// 3. ESTIMATIVA DE TRÁFEGO WEB
// ============================================================================

/**
 * Estima tráfego mensal baseado em:
 * - Backlinks e domínios referenciadores
 * - Keywords ranqueadas
 * - Presença em comunidades (GitHub, ProductHunt)
 * - Tecnologias usadas (indicam maturidade)
 */
export function estimateWebTraffic(
  backlinks: number,
  referringDomains: number,
  topKeywords: number,
  githubStars: number = 0,
  productHuntVotes: number = 0,
  technologies: number = 0
): number {
  // Backlinks são forte indicador de autoridade
  const backlinkFactor = Math.sqrt(backlinks) * 500;
  
  // Domínios únicos são mais valiosos que backlinks totais
  const domainFactor = referringDomains * 1000;
  
  // Keywords ranqueadas geram tráfego orgânico
  const keywordFactor = topKeywords * 800;
  
  // Comunidade indica tração
  const communityFactor = (githubStars * 50) + (productHuntVotes * 200);
  
  // Tecnologias modernas indicam site ativo e bem mantido
  const techFactor = technologies * 500;
  
  const estimatedMonthlyVisits = 
    backlinkFactor + 
    domainFactor + 
    keywordFactor + 
    communityFactor + 
    techFactor;
  
  return Math.round(Math.max(1000, estimatedMonthlyVisits));
}

// ============================================================================
// 4. HYPE SCORE (0-100)
// ============================================================================

/**
 * Calcula score de "hype" baseado em múltiplos sinais:
 * - Taxa de crescimento recente
 * - Velocidade de aquisição de reviews/backlinks
 * - Menções em comunidades
 * - Volatilidade (crescimento rápido = hype alto)
 */
export function calculateHypeScore(
  growthRate30d: number, // percentual
  growthRate7d: number, // percentual
  reviewVelocity: number, // reviews/dia
  socialMentions: number,
  volatility: number // 0-1
): number {
  // Crescimento recente pesa mais
  const growthScore = Math.min(40, (growthRate7d * 2) + (growthRate30d * 0.5));
  
  // Velocidade de reviews indica momentum
  const velocityScore = Math.min(25, reviewVelocity * 5);
  
  // Menções sociais indicam buzz
  const socialScore = Math.min(20, Math.log10(socialMentions + 1) * 5);
  
  // Volatilidade alta = hype (mas pode ser instável)
  const volatilityScore = Math.min(15, volatility * 15);
  
  const hypeScore = growthScore + velocityScore + socialScore + volatilityScore;
  
  return Math.round(Math.min(100, Math.max(0, hypeScore)));
}

// ============================================================================
// 5. DETECÇÃO DE HYPE SPIKE
// ============================================================================

/**
 * Detecta picos anormais de crescimento
 * Retorna magnitude do spike (ex: 3.5x = crescimento 350%)
 */
export function detectHypeSpike(
  history: MetricPoint[],
  threshold: number = 2.0 // 2x = 200% de crescimento
): HypeSpike | null {
  if (history.length < 7) return null;
  
  // Calcula média dos últimos 30 dias (exceto últimos 7)
  const baseline = history.slice(0, -7);
  const recent = history.slice(-7);
  
  const baselineAvg = baseline.reduce((sum, p) => sum + p.value, 0) / baseline.length;
  const recentAvg = recent.reduce((sum, p) => sum + p.value, 0) / recent.length;
  
  const magnitude = recentAvg / baselineAvg;
  
  if (magnitude >= threshold) {
    return {
      detectedAt: new Date(recent[recent.length - 1].date),
      magnitude,
      duration: 7,
      reason: magnitude >= 5 ? 'Viral growth' : magnitude >= 3 ? 'Strong momentum' : 'Accelerated growth'
    };
  }
  
  return null;
}

// ============================================================================
// 6. PROJEÇÃO DE TENDÊNCIA (30-90 dias)
// ============================================================================

/**
 * Projeta valores futuros usando regressão linear simples + momentum
 */
export function forecastTrend(
  history: MetricPoint[],
  daysAhead: number = 30
): { forecast: number; confidence: number; trend: TrendDirection } {
  if (history.length < 7) {
    return { forecast: 0, confidence: 0, trend: 'stable' };
  }
  
  // Converte datas para números (dias desde início)
  const points = history.map((p, i) => ({
    x: i,
    y: p.value
  }));
  
  // Regressão linear simples: y = mx + b
  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXY = points.reduce((sum, p) => sum + (p.x * p.y), 0);
  const sumX2 = points.reduce((sum, p) => sum + (p.x * p.x), 0);
  
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  
  // Projeta para o futuro
  const futureX = n + daysAhead;
  const forecast = m * futureX + b;
  
  // Calcula confiança baseado em R²
  const yMean = sumY / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => {
    const predicted = m * p.x + b;
    return sum + Math.pow(p.y - predicted, 2);
  }, 0);
  const r2 = 1 - (ssResidual / ssTotal);
  const confidence = Math.max(0, Math.min(1, r2));
  
  // Determina direção da tendência
  const trend: TrendDirection = m > 0.05 ? 'up' : m < -0.05 ? 'down' : 'stable';
  
  return {
    forecast: Math.max(0, Math.round(forecast)),
    confidence,
    trend
  };
}

// ============================================================================
// 7. VOLATILIDADE DO MERCADO
// ============================================================================

/**
 * Calcula volatilidade (desvio padrão normalizado)
 * 0 = estável, 1 = extremamente volátil
 */
export function calculateVolatility(history: MetricPoint[]): number {
  if (history.length < 2) return 0;
  
  const values = history.map(p => p.value);
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  // Normaliza pelo valor médio (coeficiente de variação)
  const volatility = mean > 0 ? stdDev / mean : 0;
  
  return Math.min(1, volatility);
}

// ============================================================================
// 8. CURVA DE ADOÇÃO (S-Curve)
// ============================================================================

/**
 * Identifica em que estágio da curva de adoção o app/site está
 * Retorna: 'early' | 'growth' | 'maturity' | 'decline'
 */
export function identifyAdoptionStage(
  history: MetricPoint[],
  currentGrowthRate: number
): 'early' | 'growth' | 'maturity' | 'decline' {
  if (history.length < 14) return 'early';
  
  const recent14 = history.slice(-14);
  const previous14 = history.slice(-28, -14);
  
  const recentAvg = recent14.reduce((sum, p) => sum + p.value, 0) / recent14.length;
  const previousAvg = previous14.reduce((sum, p) => sum + p.value, 0) / previous14.length;
  
  const acceleration = (recentAvg - previousAvg) / previousAvg;
  
  if (currentGrowthRate > 50 && acceleration > 0.2) return 'early';
  if (currentGrowthRate > 20 && acceleration > 0) return 'growth';
  if (currentGrowthRate > -10 && acceleration < 0.1) return 'maturity';
  return 'decline';
}

// ============================================================================
// 9. SCORE DE SENTIMENTO (Reviews)
// ============================================================================

/**
 * Calcula sentimento agregado de reviews
 * -1 = muito negativo, 0 = neutro, 1 = muito positivo
 */
export function calculateSentimentScore(
  rating: number,
  reviewCount: number,
  ratingDistribution: number[] // [1-star, 2-star, 3-star, 4-star, 5-star]
): number {
  // Rating médio já é um bom indicador
  const ratingScore = (rating - 3) / 2; // normaliza 1-5 para -1 a 1
  
  // Distribuição importa: polarização vs consenso
  if (ratingDistribution.length === 5) {
    const total = ratingDistribution.reduce((sum, count) => sum + count, 0);
    const polarization = (ratingDistribution[0] + ratingDistribution[4]) / total;
    
    // Alta polarização reduz confiança no score
    const confidenceMultiplier = 1 - (polarization * 0.3);
    
    return ratingScore * confidenceMultiplier;
  }
  
  return ratingScore;
}

// ============================================================================
// 10. GROWTH RATE (Taxa de Crescimento)
// ============================================================================

/**
 * Calcula taxa de crescimento percentual entre dois períodos
 */
export function calculateGrowthRate(
  currentValue: number,
  previousValue: number
): number {
  if (previousValue === 0) return currentValue > 0 ? 100 : 0;
  
  const growthRate = ((currentValue - previousValue) / previousValue) * 100;
  
  return Math.round(growthRate * 10) / 10; // 1 casa decimal
}
