// Compares shared/prayer.js (adhan-js) with adhan-java 1.2.1 (Times.java output on stdin): every city × method ×
// Asr school × date in Times.java, all six times and the Qibla. Run by tools/compare/run.ps1.
'use strict';
const path = require('path');
const fs = require('fs');
const Prayer = require(path.join(__dirname, '../../service/prayer.js'));

const cities = [
  [30.0444, 31.2357], [31.2001, 29.9187], [24.0889, 32.8998], [21.3891, 39.8579], [24.7136, 46.6753],
  [25.2048, 55.2708], [29.3759, 47.9774], [25.2854, 51.5310], [31.9539, 35.9106], [31.5075, 34.4597],
  [33.8869, 35.5131], [36.2000, 37.1600], [36.3417, 43.1292], [26.2167, 50.5833], [23.6139, 58.5922],
  [12.8000, 45.0333], [17.0197, 54.0897]];
const java = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
let lines = 0, diffs = 0, maxQ = 0;
const names = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
for (const line of java) {
  const f = line.split(' ');
  if (f[0] === 'Q') {
    const c = cities[+f[1]];
    maxQ = Math.max(maxQ, Math.abs(Prayer.qibla(c[0], c[1]) - +f[2]));
    continue;
  }
  const c = cities[+f[0]], method = Prayer.METHODS[+f[1]], madhab = f[2] === '1' ? 'hanafi' : 'shafi';
  const d = f[3].split('-').map(Number);
  const js = Prayer.times(c[0], c[1], method, madhab, d[0], d[1] - 1, d[2]);
  lines++;
  for (let i = 0; i < 6; i++) {
    // adhan-java leaves a few stray milliseconds from Calendar; both are whole minutes otherwise.
    const j = Math.floor(+f[4 + i] / 60000) * 60000;
    if (js[i] !== j) {
      diffs++;
      if (diffs <= 20) console.log('DIFF city ' + f[0] + ' ' + method + ' ' + madhab + ' ' + f[3] + ' ' + names[i] +
        ' java ' + new Date(j).toISOString() + ' js ' + new Date(js[i]).toISOString());
    }
  }
}
console.log(lines + ' days compared (' + lines * 6 + ' times), ' + diffs + ' differ; max Qibla difference ' + maxQ.toExponential(2) + '°');
