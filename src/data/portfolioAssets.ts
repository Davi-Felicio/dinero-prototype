export interface PortfolioAsset {
  ticker: string;
  name: string;
  category: "FIIs" | "Cripto" | "Ações" | "BDRs" | "ETFs";
  quantity: number;
  price: number;
  change: number;
  sparkData: number[];
}

export const portfolioAssets: PortfolioAsset[] = [
  { ticker: "MXRF11", name: "Maxi Renda", category: "FIIs", quantity: 150, price: 10.23, change: 1.2, sparkData: [10, 10.1, 10.05, 10.15, 10.2, 10.18, 10.23] },
  { ticker: "HGLG11", name: "CSHG Logística", category: "FIIs", quantity: 20, price: 164.50, change: -0.8, sparkData: [166, 165.5, 165, 164.8, 164.2, 164.6, 164.5] },
  { ticker: "AAPL34", name: "Apple BDR", category: "BDRs", quantity: 30, price: 52.80, change: 2.1, sparkData: [50, 50.5, 51, 51.8, 52.2, 52.5, 52.8] },
  { ticker: "PETR4", name: "Petrobras PN", category: "Ações", quantity: 100, price: 38.42, change: -1.5, sparkData: [40, 39.5, 39, 38.8, 38.5, 38.6, 38.42] },
  { ticker: "IVVB11", name: "iShares S&P 500", category: "ETFs", quantity: 45, price: 318.90, change: 0.7, sparkData: [315, 316, 317, 316.5, 318, 318.5, 318.9] },
  { ticker: "VALE3", name: "Vale ON", category: "Ações", quantity: 80, price: 62.15, change: -2.3, sparkData: [65, 64, 63.5, 63, 62.8, 62.5, 62.15] },
];

export const portfolioAssetCategories = ["Todos", "FIIs", "Ações", "BDRs", "ETFs", "Cripto"] as const;