// src/types/ParsedData.ts
export interface TickData {
  start_time: string;
  end_time: string;
  tick_count: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface IndicatorR {
  start_time: string;
  end_time: string;
  tick_count: number;
  open: number;
  high: number;
  low: number;
  close: number;
  r: number;
  r_mode: string;
  r_signal: string;
}

export interface IndicatorXY {
  start_time: string;
  end_time: string;
  tick_count: number;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
  y: number;
  xy_mode: string;
  xy_signal: string;
}

export interface StrategyXYR {
  timestamp: string;
  tick_count: number;
  open: number;
  high: number;
  low: number;
  close: number;
  start_time: string;
  end_time: string;
  r: number;
  r_mode: string;
  r_signal: string;
  x: number;
  y: number;
  xy_mode: string;
  xy_signal: string;
  xyr_mode: string;
  xyr_signal: string;
  source: string;
  balance: number;
  pnl: number;
  open_position_size: number;
  floating_pnl: number;
  total_longs: number;
  total_shorts: number;
  profitable_longs: number;
  profitable_shorts: number;
  max_negative_excursion: number;
  max_drawdown: number;
}
