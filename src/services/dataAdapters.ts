// src/services/dataAdapters.ts
import { TickData, IndicatorR, IndicatorXY, StrategyXYR } from '../types/ParsedData';

export const parseTickData = (data: any[]): TickData[] => {
  return data.map(item => ({
    start_time: item.start_time,
    end_time: item.end_time,
    tick_count: item.tick_count,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
  }));
};

export const parseIndicatorR = (data: any[]): IndicatorR[] => {
  return data.map(item => ({
    start_time: item.start_time,
    end_time: item.end_time,
    tick_count: item.tick_count,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    r: item.r,
    r_mode: item.r_mode,
    r_signal: item.r_signal,
  }));
};

export const parseIndicatorXY = (data: any[]): IndicatorXY[] => {
  return data.map(item => ({
    start_time: item.start_time,
    end_time: item.end_time,
    tick_count: item.tick_count,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    x: item.x,
    y: item.y,
    xy_mode: item.xy_mode,
    xy_signal: item.xy_signal,
  }));
};


// balance
// : 
// 20000
// close
// : 
// 63009.7
// end_time
// : 
// "2024-05-06T19:27:13.636"
// floating_pnl
// : 
// 0
// high
// : 
// 63754.5
// low
// : 
// 62653.7
// max_drawdown
// : 
// 0
// max_negative_excursion
// : 
// 0
// open
// : 
// 63279
// open_position_size
// : 
// 0
// pnl
// : 
// 0
// profitable_longs
// : 
// 0
// profitable_shorts
// : 
// 0
// r
// : 
// 0.9939
// r_mode
// : 
// "SHORT"
// r_signal
// : 
// "NONE"
// source
// : 
// "offline"
// start_time
// : 
// "2024-05-06T15:16:49.602"
// tick_count
// : 
// 50000
// timestamp
// : 
// "2024-05-06T19:27:13.636"
// total_longs
// : 
// 0
// total_shorts
// : 
// 0
// x
// : 
// -86.8444
// xy_mode
// : 
// "LONG"
// xy_signal
// : 
// "NONE"
// xyr_mode
// : 
// "NONE"
// xyr_signal
// : 
// "NONE"
// y
// : 
// -95.9515
export const parseStrategyXYR = (data: any[]): StrategyXYR[] => {
  return data.map(item => ({
    timestamp: item.timestamp,
    tick_count: item.tick_count,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    start_time: item.start_time,
    end_time: item.end_time,
    r: item.r,
    r_mode: item.r_mode,
    r_signal: item.r_signal,
    x: item.x,
    y: item.y,
    xy_mode: item.xy_mode,
    xy_signal: item.xy_signal,
    xyr_mode: item.xyr_mode,
    xyr_signal: item.xyr_signal,
    source: item.source,
    balance: item.balance,
    pnl: item.pnl,
    open_position_size: item.open_position_size,
    floating_pnl: item.floating_pnl,
    total_longs: item.total_longs,
    total_shorts: item.total_shorts,
    profitable_longs: item.profitable_longs,
    profitable_shorts: item.profitable_shorts,
    max_negative_excursion: item.max_negative_excursion,
    max_drawdown: item.max_drawdown,
  }));
};
