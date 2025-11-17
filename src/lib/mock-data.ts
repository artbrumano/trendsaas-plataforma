// ============================================================================
// MOCK DATA - TrendSaaS
// Dados fictícios para demonstração da plataforma
// ============================================================================

import { 
  MobileApp, 
  WebApp, 
  MetricPoint, 
  GlobalInsights,
  CategoryInsight,
  MarketBubble
} from './types';

// ============================================================================
// HELPER: Gerar histórico de métricas
// ============================================================================

function generateHistory(
  baseValue: number, 
  days: number, 
  volatility: number = 0.1,
  trend: 'up' | 'down' | 'stable' = 'up'
): MetricPoint[] {
  const history: MetricPoint[] = [];
  let value = baseValue;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Adiciona tendência
    if (trend === 'up') value *= (1 + Math.random() * 0.05);
    if (trend === 'down') value *= (1 - Math.random() * 0.03);
    
    // Adiciona volatilidade
    const noise = (Math.random() - 0.5) * volatility * value;
    
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value + noise)
    });
  }
  
  return history;
}

// ============================================================================
// MOBILE APPS
// ============================================================================

export const mockMobileApps: MobileApp[] = [
  {
    id: 'app-1',
    name: 'FocusFlow',
    platform: 'mobile',
    mobilePlatform: 'both',
    category: 'Productivity',
    description: 'AI-powered focus timer with ambient soundscapes',
    icon: '🎯',
    developer: 'MindfulTech Inc',
    version: '2.4.1',
    size: '45 MB',
    appStoreId: 'com.mindful.focusflow',
    playStoreId: 'com.mindful.focusflow',
    
    hypeScore: 87,
    trendDirection: 'up',
    growthRate: 145.3,
    
    overallRank: 234,
    categoryRank: 12,
    
    rating: 4.7,
    reviewCount: 8420,
    sentimentScore: 0.82,
    
    estimatedDownloads: 2450000,
    estimatedRevenue: 89000,
    estimatedDAU: 145000,
    
    downloadHistory: generateHistory(2000000, 30, 0.15, 'up'),
    rankHistory: generateHistory(300, 30, 0.2, 'down'),
    ratingHistory: generateHistory(4.5, 30, 0.05, 'up'),
    
    firstSeen: new Date('2023-08-15'),
    lastUpdated: new Date()
  },
  {
    id: 'app-2',
    name: 'BudgetBuddy',
    platform: 'mobile',
    mobilePlatform: 'ios',
    category: 'Finance',
    description: 'Smart expense tracker with AI insights',
    icon: '💰',
    developer: 'FinTech Solutions',
    version: '3.1.0',
    size: '62 MB',
    appStoreId: 'com.fintech.budgetbuddy',
    
    hypeScore: 92,
    trendDirection: 'up',
    growthRate: 203.7,
    
    overallRank: 89,
    categoryRank: 5,
    
    rating: 4.8,
    reviewCount: 15230,
    sentimentScore: 0.91,
    
    estimatedDownloads: 5200000,
    estimatedRevenue: 234000,
    estimatedDAU: 320000,
    
    downloadHistory: generateHistory(3000000, 30, 0.2, 'up'),
    rankHistory: generateHistory(150, 30, 0.25, 'down'),
    ratingHistory: generateHistory(4.6, 30, 0.03, 'up'),
    
    firstSeen: new Date('2023-03-20'),
    lastUpdated: new Date()
  },
  {
    id: 'app-3',
    name: 'FitQuest',
    platform: 'mobile',
    mobilePlatform: 'both',
    category: 'Health & Fitness',
    description: 'Gamified fitness challenges with friends',
    icon: '🏃',
    developer: 'HealthTech Labs',
    version: '1.8.2',
    size: '78 MB',
    appStoreId: 'com.health.fitquest',
    playStoreId: 'com.health.fitquest',
    
    hypeScore: 76,
    trendDirection: 'up',
    growthRate: 89.4,
    
    overallRank: 567,
    categoryRank: 28,
    
    rating: 4.5,
    reviewCount: 6780,
    sentimentScore: 0.73,
    
    estimatedDownloads: 1800000,
    estimatedRevenue: 67000,
    estimatedDAU: 98000,
    
    downloadHistory: generateHistory(1200000, 30, 0.18, 'up'),
    rankHistory: generateHistory(700, 30, 0.15, 'down'),
    ratingHistory: generateHistory(4.3, 30, 0.08, 'up'),
    
    firstSeen: new Date('2023-11-05'),
    lastUpdated: new Date()
  },
  {
    id: 'app-4',
    name: 'QuickNote AI',
    platform: 'mobile',
    mobilePlatform: 'both',
    category: 'Productivity',
    description: 'Voice-to-text notes with AI summarization',
    icon: '📝',
    developer: 'NoteWorks',
    version: '4.2.0',
    size: '38 MB',
    appStoreId: 'com.noteworks.quicknote',
    playStoreId: 'com.noteworks.quicknote',
    
    hypeScore: 68,
    trendDirection: 'stable',
    growthRate: 23.1,
    
    overallRank: 1234,
    categoryRank: 67,
    
    rating: 4.4,
    reviewCount: 12450,
    sentimentScore: 0.68,
    
    estimatedDownloads: 3400000,
    estimatedRevenue: 45000,
    estimatedDAU: 187000,
    
    downloadHistory: generateHistory(3200000, 30, 0.1, 'stable'),
    rankHistory: generateHistory(1200, 30, 0.12, 'stable'),
    ratingHistory: generateHistory(4.4, 30, 0.04, 'stable'),
    
    firstSeen: new Date('2022-06-10'),
    lastUpdated: new Date()
  }
];

// ============================================================================
// WEB APPS
// ============================================================================

export const mockWebApps: WebApp[] = [
  {
    id: 'web-1',
    name: 'TaskFlow',
    platform: 'web',
    domain: 'taskflow.io',
    category: 'Productivity',
    description: 'Collaborative task management for remote teams',
    icon: '✅',
    url: 'https://taskflow.io',
    
    hypeScore: 84,
    trendDirection: 'up',
    growthRate: 167.8,
    
    technologies: [
      { name: 'React', category: 'Frontend', confidence: 0.95 },
      { name: 'Next.js', category: 'Framework', confidence: 0.92 },
      { name: 'Tailwind CSS', category: 'Styling', confidence: 0.88 },
      { name: 'Vercel', category: 'Hosting', confidence: 0.90 },
      { name: 'Supabase', category: 'Backend', confidence: 0.85 }
    ],
    
    estimatedTraffic: 450000,
    trafficSources: [
      { source: 'Direct', percentage: 35 },
      { source: 'Organic Search', percentage: 28 },
      { source: 'Social', percentage: 22 },
      { source: 'Referral', percentage: 15 }
    ],
    
    topKeywords: [
      { keyword: 'task management tool', volume: 12000, position: 8, difficulty: 65 },
      { keyword: 'remote team collaboration', volume: 8500, position: 12, difficulty: 58 },
      { keyword: 'project tracking software', volume: 15000, position: 15, difficulty: 72 }
    ],
    
    topPages: [
      { path: '/', visits: 125000, percentage: 28 },
      { path: '/features', visits: 67000, percentage: 15 },
      { path: '/pricing', visits: 54000, percentage: 12 },
      { path: '/blog', visits: 45000, percentage: 10 }
    ],
    
    backlinks: 3420,
    referringDomains: 567,
    
    githubStars: 2340,
    productHuntVotes: 1876,
    
    trafficHistory: generateHistory(300000, 30, 0.15, 'up'),
    keywordHistory: generateHistory(45, 30, 0.1, 'up'),
    
    firstSeen: new Date('2023-05-12'),
    lastUpdated: new Date()
  },
  {
    id: 'web-2',
    name: 'DesignKit Pro',
    platform: 'web',
    domain: 'designkit.pro',
    category: 'Design',
    description: 'AI-powered design system generator',
    icon: '🎨',
    url: 'https://designkit.pro',
    
    hypeScore: 95,
    trendDirection: 'up',
    growthRate: 312.5,
    
    technologies: [
      { name: 'Vue.js', category: 'Frontend', confidence: 0.93 },
      { name: 'Nuxt', category: 'Framework', confidence: 0.90 },
      { name: 'TypeScript', category: 'Language', confidence: 0.96 },
      { name: 'Figma API', category: 'Integration', confidence: 0.88 },
      { name: 'OpenAI', category: 'AI', confidence: 0.85 }
    ],
    
    estimatedTraffic: 780000,
    trafficSources: [
      { source: 'Organic Search', percentage: 42 },
      { source: 'Social', percentage: 31 },
      { source: 'Direct', percentage: 18 },
      { source: 'Referral', percentage: 9 }
    ],
    
    topKeywords: [
      { keyword: 'design system generator', volume: 6800, position: 3, difficulty: 54 },
      { keyword: 'ai design tool', volume: 18000, position: 7, difficulty: 68 },
      { keyword: 'figma alternative', volume: 22000, position: 11, difficulty: 75 }
    ],
    
    topPages: [
      { path: '/', visits: 234000, percentage: 30 },
      { path: '/templates', visits: 156000, percentage: 20 },
      { path: '/ai-generator', visits: 117000, percentage: 15 },
      { path: '/showcase', visits: 78000, percentage: 10 }
    ],
    
    backlinks: 8920,
    referringDomains: 1243,
    
    githubStars: 8760,
    productHuntVotes: 4532,
    
    trafficHistory: generateHistory(400000, 30, 0.25, 'up'),
    keywordHistory: generateHistory(67, 30, 0.18, 'up'),
    
    firstSeen: new Date('2023-09-08'),
    lastUpdated: new Date()
  },
  {
    id: 'web-3',
    name: 'CodeSnippet',
    platform: 'web',
    domain: 'codesnippet.dev',
    category: 'Developer Tools',
    description: 'Beautiful code snippet manager and sharing platform',
    icon: '💻',
    url: 'https://codesnippet.dev',
    
    hypeScore: 72,
    trendDirection: 'up',
    growthRate: 94.2,
    
    technologies: [
      { name: 'React', category: 'Frontend', confidence: 0.94 },
      { name: 'Next.js', category: 'Framework', confidence: 0.91 },
      { name: 'Monaco Editor', category: 'Library', confidence: 0.89 },
      { name: 'PostgreSQL', category: 'Database', confidence: 0.87 },
      { name: 'Redis', category: 'Cache', confidence: 0.82 }
    ],
    
    estimatedTraffic: 320000,
    trafficSources: [
      { source: 'Organic Search', percentage: 48 },
      { source: 'Direct', percentage: 26 },
      { source: 'Referral', percentage: 16 },
      { source: 'Social', percentage: 10 }
    ],
    
    topKeywords: [
      { keyword: 'code snippet manager', volume: 4200, position: 5, difficulty: 42 },
      { keyword: 'developer tools', volume: 28000, position: 23, difficulty: 81 },
      { keyword: 'code sharing platform', volume: 3100, position: 9, difficulty: 38 }
    ],
    
    topPages: [
      { path: '/', visits: 96000, percentage: 30 },
      { path: '/explore', visits: 64000, percentage: 20 },
      { path: '/snippets', visits: 48000, percentage: 15 },
      { path: '/docs', visits: 32000, percentage: 10 }
    ],
    
    backlinks: 2180,
    referringDomains: 423,
    
    githubStars: 5420,
    productHuntVotes: 2134,
    
    trafficHistory: generateHistory(200000, 30, 0.12, 'up'),
    keywordHistory: generateHistory(34, 30, 0.08, 'up'),
    
    firstSeen: new Date('2023-07-22'),
    lastUpdated: new Date()
  },
  {
    id: 'web-4',
    name: 'EmailCraft',
    platform: 'web',
    domain: 'emailcraft.app',
    category: 'Marketing',
    description: 'No-code email template builder with AI',
    icon: '📧',
    url: 'https://emailcraft.app',
    
    hypeScore: 79,
    trendDirection: 'up',
    growthRate: 128.6,
    
    technologies: [
      { name: 'Svelte', category: 'Frontend', confidence: 0.92 },
      { name: 'SvelteKit', category: 'Framework', confidence: 0.90 },
      { name: 'Tailwind CSS', category: 'Styling', confidence: 0.94 },
      { name: 'Stripe', category: 'Payment', confidence: 0.88 },
      { name: 'SendGrid', category: 'Email', confidence: 0.86 }
    ],
    
    estimatedTraffic: 215000,
    trafficSources: [
      { source: 'Organic Search', percentage: 38 },
      { source: 'Social', percentage: 29 },
      { source: 'Direct', percentage: 21 },
      { source: 'Referral', percentage: 12 }
    ],
    
    topKeywords: [
      { keyword: 'email template builder', volume: 9200, position: 6, difficulty: 59 },
      { keyword: 'no code email design', volume: 3800, position: 4, difficulty: 45 },
      { keyword: 'html email creator', volume: 5600, position: 10, difficulty: 52 }
    ],
    
    topPages: [
      { path: '/', visits: 64500, percentage: 30 },
      { path: '/templates', visits: 43000, percentage: 20 },
      { path: '/builder', visits: 32250, percentage: 15 },
      { path: '/pricing', visits: 21500, percentage: 10 }
    ],
    
    backlinks: 1560,
    referringDomains: 298,
    
    githubStars: 1240,
    productHuntVotes: 987,
    
    trafficHistory: generateHistory(150000, 30, 0.14, 'up'),
    keywordHistory: generateHistory(28, 30, 0.09, 'up'),
    
    firstSeen: new Date('2023-10-15'),
    lastUpdated: new Date()
  }
];

// ============================================================================
// GLOBAL INSIGHTS
// ============================================================================

export const mockGlobalInsights: GlobalInsights = {
  trendingCategories: [
    {
      category: 'AI Tools',
      growthRate: 245.7,
      appCount: 1247,
      avgHypeScore: 82,
      trending: true
    },
    {
      category: 'Productivity',
      growthRate: 156.3,
      appCount: 3421,
      avgHypeScore: 74,
      trending: true
    },
    {
      category: 'Finance',
      growthRate: 189.2,
      appCount: 892,
      avgHypeScore: 79,
      trending: true
    },
    {
      category: 'Health & Fitness',
      growthRate: 98.4,
      appCount: 2156,
      avgHypeScore: 68,
      trending: false
    },
    {
      category: 'Design Tools',
      growthRate: 203.1,
      appCount: 567,
      avgHypeScore: 85,
      trending: true
    }
  ],
  
  marketBubbles: [
    {
      name: 'AI-Powered SaaS',
      size: 12500000,
      growth: 312.5,
      hype: 94,
      apps: 1847
    },
    {
      name: 'No-Code Platforms',
      size: 8900000,
      growth: 187.3,
      hype: 81,
      apps: 1234
    },
    {
      name: 'Web3 Tools',
      size: 4200000,
      growth: 156.8,
      hype: 72,
      apps: 567
    },
    {
      name: 'Remote Work',
      size: 15600000,
      growth: 134.2,
      hype: 76,
      apps: 2891
    }
  ],
  
  emergingTechnologies: [
    { name: 'GPT-4 Integration', category: 'AI', confidence: 0.94 },
    { name: 'Edge Computing', category: 'Infrastructure', confidence: 0.87 },
    { name: 'WebAssembly', category: 'Performance', confidence: 0.82 },
    { name: 'Blockchain', category: 'Web3', confidence: 0.78 },
    { name: 'AR/VR', category: 'Immersive', confidence: 0.71 }
  ],
  
  topGrowers: [...mockMobileApps.slice(0, 2), ...mockWebApps.slice(0, 2)]
};

// ============================================================================
// COMBINED DATA
// ============================================================================

export const allApps = [...mockMobileApps, ...mockWebApps];
