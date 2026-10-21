/*
 * Afnon LG: prayer times, places and local time, shared by the page (window.Prayer) and the service (require).
 * Times come from adhan-js with the same methods and parameters as the Android app's adhan-java 1.2.1
 * (checked with tools/compare). ES5 only: the page runs on Chromium 68, the service on Node 8.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./adhan.js'));
  else root.Prayer = factory(root.adhan);
})(this, function (adhan) {
  'use strict';

  var FAJR = 0, SUNRISE = 1, DHUHR = 2, ASR = 3, MAGHRIB = 4, ISHA = 5;

  // Prefs.METHODS order; the names are adhan-java's enum names (kept in settings, as on Android).
  var METHODS = ['EGYPTIAN', 'UMM_AL_QURA', 'MUSLIM_WORLD_LEAGUE', 'KARACHI', 'DUBAI', 'KUWAIT', 'QATAR',
    'NORTH_AMERICA', 'MOON_SIGHTING_COMMITTEE', 'SINGAPORE'];
  var JS_NAME = {
    EGYPTIAN: 'Egyptian', UMM_AL_QURA: 'UmmAlQura', MUSLIM_WORLD_LEAGUE: 'MuslimWorldLeague', KARACHI: 'Karachi',
    DUBAI: 'Dubai', KUWAIT: 'Kuwait', QATAR: 'Qatar', NORTH_AMERICA: 'NorthAmerica',
    MOON_SIGHTING_COMMITTEE: 'MoonsightingCommittee', SINGAPORE: 'Singapore'
  };

  /**
   * Prefs.CITIES: id, Arabic, English, country (Arabic, English), lat, lng, method, time zone. The zone is used
   * when the TV itself reports GMT (as this LG does): the city's own clock, from ZONES below.
   */
  var EG = 'EGYPTIAN', MWL = 'MUSLIM_WORLD_LEAGUE', UQ = 'UMM_AL_QURA', DU = 'DUBAI';
  function c(id, ar, en, car, cen, lat, lng, method, zone) {
    return { id: id, ar: ar, en: en, countryAr: car, countryEn: cen, lat: lat, lng: lng, method: method, zone: zone };
  }
  var CITIES = [
    c('cairo', 'القاهرة', 'Cairo', 'مصر', 'Egypt', 30.0444, 31.2357, EG, 'EG'),
    c('giza', 'الجيزة', 'Giza', 'مصر', 'Egypt', 30.0131, 31.2089, EG, 'EG'),
    c('alexandria', 'الإسكندرية', 'Alexandria', 'مصر', 'Egypt', 31.2001, 29.9187, EG, 'EG'),
    c('mansoura', 'المنصورة', 'Mansoura', 'مصر', 'Egypt', 31.0409, 31.3785, EG, 'EG'),
    c('tanta', 'طنطا', 'Tanta', 'مصر', 'Egypt', 30.7865, 31.0004, EG, 'EG'),
    c('portsaid', 'بورسعيد', 'Port Said', 'مصر', 'Egypt', 31.2653, 32.3019, EG, 'EG'),
    c('suez', 'السويس', 'Suez', 'مصر', 'Egypt', 29.9668, 32.5498, EG, 'EG'),
    c('asyut', 'أسيوط', 'Asyut', 'مصر', 'Egypt', 27.1783, 31.1859, EG, 'EG'),
    c('luxor', 'الأقصر', 'Luxor', 'مصر', 'Egypt', 25.6872, 32.6396, EG, 'EG'),
    c('aswan', 'أسوان', 'Aswan', 'مصر', 'Egypt', 24.0889, 32.8998, EG, 'EG'),
    c('makkah', 'مكة المكرمة', 'Makkah', 'السعودية', 'Saudi Arabia', 21.3891, 39.8579, UQ, 'SA'),
    c('madinah', 'المدينة المنورة', 'Madinah', 'السعودية', 'Saudi Arabia', 24.5247, 39.5692, UQ, 'SA'),
    c('riyadh', 'الرياض', 'Riyadh', 'السعودية', 'Saudi Arabia', 24.7136, 46.6753, UQ, 'SA'),
    c('jeddah', 'جدة', 'Jeddah', 'السعودية', 'Saudi Arabia', 21.5292, 39.1611, UQ, 'SA'),
    c('dammam', 'الدمام', 'Dammam', 'السعودية', 'Saudi Arabia', 26.4333, 50.1000, UQ, 'SA'),
    c('taif', 'الطائف', 'Taif', 'السعودية', 'Saudi Arabia', 21.2667, 40.4167, UQ, 'SA'),
    c('tabuk', 'تبوك', 'Tabuk', 'السعودية', 'Saudi Arabia', 28.3972, 36.5789, UQ, 'SA'),
    c('abha', 'أبها', 'Abha', 'السعودية', 'Saudi Arabia', 18.2167, 42.5000, UQ, 'SA'),
    c('dubai', 'دبي', 'Dubai', 'الإمارات', 'UAE', 25.2048, 55.2708, DU, 'AE'),
    c('abudhabi', 'أبو ظبي', 'Abu Dhabi', 'الإمارات', 'UAE', 24.4511, 54.3969, DU, 'AE'),
    c('sharjah', 'الشارقة', 'Sharjah', 'الإمارات', 'UAE', 25.3375, 55.4119, DU, 'AE'),
    c('alain', 'العين', 'Al Ain', 'الإمارات', 'UAE', 24.2075, 55.7447, DU, 'AE'),
    c('kuwait', 'الكويت', 'Kuwait City', 'الكويت', 'Kuwait', 29.3759, 47.9774, 'KUWAIT', 'KW'),
    c('doha', 'الدوحة', 'Doha', 'قطر', 'Qatar', 25.2854, 51.5310, 'QATAR', 'QA'),
    c('amman', 'عمّان', 'Amman', 'الأردن', 'Jordan', 31.9539, 35.9106, MWL, 'JO'),
    c('irbid', 'إربد', 'Irbid', 'الأردن', 'Jordan', 32.5556, 35.8500, MWL, 'JO'),
    c('zarqa', 'الزرقاء', 'Zarqa', 'الأردن', 'Jordan', 32.0833, 36.1000, MWL, 'JO'),
    c('aqaba', 'العقبة', 'Aqaba', 'الأردن', 'Jordan', 29.5322, 35.0061, MWL, 'JO'),
    c('jerusalem', 'القدس', 'Jerusalem', 'فلسطين', 'Palestine', 31.7789, 35.2256, MWL, 'PS'),
    c('ramallah', 'رام الله', 'Ramallah', 'فلسطين', 'Palestine', 31.8969, 35.2017, MWL, 'PS'),
    c('nablus', 'نابلس', 'Nablus', 'فلسطين', 'Palestine', 32.2211, 35.2608, MWL, 'PS'),
    c('hebron', 'الخليل', 'Hebron', 'فلسطين', 'Palestine', 31.5286, 35.0969, MWL, 'PS'),
    c('bethlehem', 'بيت لحم', 'Bethlehem', 'فلسطين', 'Palestine', 31.7044, 35.2064, MWL, 'PS'),
    c('jenin', 'جنين', 'Jenin', 'فلسطين', 'Palestine', 32.4611, 35.3000, MWL, 'PS'),
    c('tulkarm', 'طولكرم', 'Tulkarm', 'فلسطين', 'Palestine', 32.3111, 35.0308, MWL, 'PS'),
    c('qalqilya', 'قلقيلية', 'Qalqilya', 'فلسطين', 'Palestine', 32.1904, 34.9685, MWL, 'PS'),
    c('salfit', 'سلفيت', 'Salfit', 'فلسطين', 'Palestine', 32.0819, 35.1822, MWL, 'PS'),
    c('tubas', 'طوباس', 'Tubas', 'فلسطين', 'Palestine', 32.3222, 35.3686, MWL, 'PS'),
    c('jericho', 'أريحا', 'Jericho', 'فلسطين', 'Palestine', 31.8561, 35.4600, MWL, 'PS'),
    c('gaza', 'غزة', 'Gaza', 'فلسطين', 'Palestine', 31.5075, 34.4597, MWL, 'PS'),
    c('jabalia', 'جباليا', 'Jabalia', 'فلسطين', 'Palestine', 31.5281, 34.4831, MWL, 'PS'),
    c('deiralbalah', 'دير البلح', 'Deir al-Balah', 'فلسطين', 'Palestine', 31.4167, 34.3500, MWL, 'PS'),
    c('khanyunis', 'خان يونس', 'Khan Yunis', 'فلسطين', 'Palestine', 31.3444, 34.3031, MWL, 'PS'),
    c('rafah', 'رفح', 'Rafah', 'فلسطين', 'Palestine', 31.2725, 34.2586, MWL, 'PS'),
    c('beirut', 'بيروت', 'Beirut', 'لبنان', 'Lebanon', 33.8869, 35.5131, MWL, 'LB'),
    c('tripoli', 'طرابلس', 'Tripoli', 'لبنان', 'Lebanon', 34.4367, 35.8344, MWL, 'LB'),
    c('sidon', 'صيدا', 'Sidon', 'لبنان', 'Lebanon', 33.5606, 35.3758, MWL, 'LB'),
    c('tyre', 'صور', 'Tyre', 'لبنان', 'Lebanon', 33.2667, 35.2000, MWL, 'LB'),
    c('baalbek', 'بعلبك', 'Baalbek', 'لبنان', 'Lebanon', 34.0061, 36.2086, MWL, 'LB'),
    c('damascus', 'دمشق', 'Damascus', 'سوريا', 'Syria', 33.5131, 36.2919, MWL, 'SY'),
    c('aleppo', 'حلب', 'Aleppo', 'سوريا', 'Syria', 36.2000, 37.1600, MWL, 'SY'),
    c('homs', 'حمص', 'Homs', 'سوريا', 'Syria', 34.7333, 36.7167, MWL, 'SY'),
    c('hama', 'حماة', 'Hama', 'سوريا', 'Syria', 35.1350, 36.7500, MWL, 'SY'),
    c('latakia', 'اللاذقية', 'Latakia', 'سوريا', 'Syria', 35.5200, 35.7781, MWL, 'SY'),
    c('deirezzor', 'دير الزور', 'Deir ez-Zor', 'سوريا', 'Syria', 35.3333, 40.1500, MWL, 'SY'),
    c('baghdad', 'بغداد', 'Baghdad', 'العراق', 'Iraq', 33.3153, 44.3661, MWL, 'IQ'),
    c('basra', 'البصرة', 'Basra', 'العراق', 'Iraq', 30.5150, 47.8100, MWL, 'IQ'),
    c('mosul', 'الموصل', 'Mosul', 'العراق', 'Iraq', 36.3417, 43.1292, MWL, 'IQ'),
    c('erbil', 'أربيل', 'Erbil', 'العراق', 'Iraq', 36.1911, 44.0094, MWL, 'IQ'),
    c('najaf', 'النجف', 'Najaf', 'العراق', 'Iraq', 32.0290, 44.3396, MWL, 'IQ'),
    c('karbala', 'كربلاء', 'Karbala', 'العراق', 'Iraq', 32.6167, 44.0333, MWL, 'IQ'),
    c('kirkuk', 'كركوك', 'Kirkuk', 'العراق', 'Iraq', 35.4667, 44.4000, MWL, 'IQ'),
    c('sulaymaniyah', 'السليمانية', 'Sulaymaniyah', 'العراق', 'Iraq', 35.5500, 45.4333, MWL, 'IQ'),
    c('manama', 'المنامة', 'Manama', 'البحرين', 'Bahrain', 26.2167, 50.5833, MWL, 'BH'),
    c('muharraq', 'المحرق', 'Muharraq', 'البحرين', 'Bahrain', 26.2533, 50.6083, MWL, 'BH'),
    c('muscat', 'مسقط', 'Muscat', 'عُمان', 'Oman', 23.6139, 58.5922, MWL, 'OM'),
    c('salalah', 'صلالة', 'Salalah', 'عُمان', 'Oman', 17.0197, 54.0897, MWL, 'OM'),
    c('sohar', 'صحار', 'Sohar', 'عُمان', 'Oman', 24.3420, 56.7299, MWL, 'OM'),
    c('nizwa', 'نزوى', 'Nizwa', 'عُمان', 'Oman', 22.9333, 57.5333, MWL, 'OM'),
    c('sanaa', 'صنعاء', 'Sanaa', 'اليمن', 'Yemen', 15.3500, 44.2000, MWL, 'YE'),
    c('aden', 'عدن', 'Aden', 'اليمن', 'Yemen', 12.8000, 45.0333, MWL, 'YE'),
    c('taiz', 'تعز', 'Taiz', 'اليمن', 'Yemen', 13.5789, 44.0219, MWL, 'YE'),
    c('hodeidah', 'الحديدة', 'Hodeidah', 'اليمن', 'Yemen', 14.8022, 42.9511, MWL, 'YE'),
    c('mukalla', 'المكلا', 'Mukalla', 'اليمن', 'Yemen', 14.5333, 49.1333, MWL, 'YE')
  ];

  function cityById(id) {
    for (var i = 0; i < CITIES.length; i++) if (CITIES[i].id === id) return CITIES[i];
    return CITIES[0];
  }

  // ---------------------------------------------------------------- local time

  /**
   * Standard offset in minutes and the summer-time rule, as of 2026. Written out rather than taken from the
   * engines' time-zone data: Chromium 68 and Node 8 predate Egypt's return to summer time (2023) and Jordan's
   * and Syria's move to +3 all year (2022).
   */
  var ZONES = {
    EG: { std: 120, dst: 'egypt' }, SA: { std: 180 }, AE: { std: 240 }, KW: { std: 180 }, QA: { std: 180 },
    JO: { std: 180 }, PS: { std: 120, dst: 'palestine' }, LB: { std: 120, dst: 'lebanon' }, SY: { std: 180 },
    IQ: { std: 180 }, BH: { std: 180 }, OM: { std: 240 }, YE: { std: 180 }
  };

  /** UTC ms of day `day` (1-based) of month `m` (0-based) in year y at the given UTC hour. */
  function utcAt(y, m, day, hour) { return Date.UTC(y, m, day, hour); }

  /** Day of month of the last given weekday (0 Sunday … 6 Saturday) of a month. */
  function lastWeekday(y, m, weekday) {
    var last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    var wd = new Date(Date.UTC(y, m, last)).getUTCDay();
    return last - ((wd - weekday + 7) % 7);
  }

  /** The last Saturday on or before the 30th. */
  function saturdayOnOrBefore30(y, m) {
    var wd = new Date(Date.UTC(y, m, 30)).getUTCDay();
    return 30 - ((wd - 6 + 7) % 7);
  }

  /** Summer time [start, end) as UTC ms for a rule and year. */
  function dstRange(rule, y) {
    if (rule === 'egypt') {
      // Last Friday of April 00:00 (+2) to the end of the last Thursday of October (24:00, +3).
      return [utcAt(y, 3, lastWeekday(y, 3, 5), 0) - 2 * 3600000, utcAt(y, 9, lastWeekday(y, 9, 4) + 1, 0) - 3 * 3600000];
    }
    if (rule === 'lebanon') {
      // Last Sunday of March 00:00 (+2) to the last Sunday of October 00:00 (+3).
      return [utcAt(y, 2, lastWeekday(y, 2, 0), 0) - 2 * 3600000, utcAt(y, 9, lastWeekday(y, 9, 0), 0) - 3 * 3600000];
    }
    // Palestine: the Saturday on or before 30 March 02:00 (+2) to the Saturday on or before 30 October 02:00 (+3).
    return [utcAt(y, 2, saturdayOnOrBefore30(y, 2), 2) - 2 * 3600000, utcAt(y, 9, saturdayOnOrBefore30(y, 9), 2) - 3 * 3600000];
  }

  /** Minutes east of UTC for a zone code at a moment. */
  function zoneOffset(zone, ms) {
    var z = ZONES[zone] || ZONES.EG;
    if (!z.dst) return z.std;
    var y = new Date(ms).getUTCFullYear();
    var r = dstRange(z.dst, y);
    return ms >= r[0] && ms < r[1] ? z.std + 60 : z.std;
  }

  /** The engine's time zone name, '' when it has none to tell. */
  function deviceZoneName() {
    try { return new Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; }
  }

  /**
   * Whether the engine runs in a real local time zone. This LG's own zone was UTC ("Etc/GMT-0") until it was set,
   * and then the page and the service saw UTC too.
   */
  function deviceHasZone() {
    var name = deviceZoneName();
    if (name && /^(Etc\/)?(UTC|UCT|GMT|Universal|Zulu|Greenwich)([-+]?0)?$/i.test(name)) return false;
    if (name) return true;
    return new Date().getTimezoneOffset() !== 0 || new Date(Date.UTC(new Date().getUTCFullYear(), 6, 1)).getTimezoneOffset() !== 0;
  }

  /** The IANA zones of the cities' countries (Jerusalem as Palestine, as the city list has it). */
  var IANA = {
    'Africa/Cairo': 'EG', 'Egypt': 'EG', 'Asia/Riyadh': 'SA', 'Asia/Dubai': 'AE', 'Asia/Kuwait': 'KW', 'Asia/Qatar': 'QA',
    'Asia/Amman': 'JO', 'Asia/Hebron': 'PS', 'Asia/Gaza': 'PS', 'Asia/Jerusalem': 'PS', 'Asia/Tel_Aviv': 'PS',
    'Israel': 'PS', 'Asia/Beirut': 'LB', 'Asia/Damascus': 'SY', 'Asia/Baghdad': 'IQ', 'Asia/Bahrain': 'BH',
    'Asia/Muscat': 'OM', 'Asia/Aden': 'YE'
  };

  /**
   * The clock for a city on this device: the city's own rules (ZONES, current to 2026), whatever the TV says. This
   * LG first had no zone (UTC), then a fixed "GMT+3:00" (LG lists no zone for Palestine), which won't move to +2 in
   * the winter; a named zone can be years old in Chromium 68, Node 8 and the firmware. Only a TV set to a named
   * zone of another country keeps its own, as Android does: then the viewer lives by the clock the TV shows.
   * Every time is a UTC moment shifted by the chosen offset, so the TV's own offset is never added twice.
   */
  function clockFor(city) {
    var name = deviceZoneName();
    var named = /^[A-Za-z]+\/[A-Za-z_\-]+(\/[A-Za-z_\-]+)?$/.test(name) && !/^Etc\//.test(name);
    var other = named && deviceHasZone() && IANA[name] !== city.zone;
    return new Clock(city, other);
  }

  /**
   * A clock for a city: the TV's own time zone when it has one; when the TV says UTC (no zone set), the city's.
   * Its wall() gives the local wall time of a moment as UTC fields of a shifted Date.
   */
  function Clock(city, device) {
    this.city = city;
    // true (or a non-zero offset, as older callers pass): the device's own zone; else the city's.
    this.useDevice = device === true || (typeof device === 'number' && device !== 0);
  }
  Clock.prototype.offset = function (ms) {
    if (this.useDevice) return -new Date(ms).getTimezoneOffset();
    return zoneOffset(this.city.zone, ms);
  };
  /** A Date whose UTC fields are the local wall time of ms. */
  Clock.prototype.wall = function (ms) {
    return new Date(ms + this.offset(ms) * 60000);
  };
  /** UTC ms of local midnight that starts the local day containing ms, plus `days`. */
  Clock.prototype.dayStart = function (ms, days) {
    var w = this.wall(ms);
    var guess = Date.UTC(w.getUTCFullYear(), w.getUTCMonth(), w.getUTCDate() + (days || 0));
    return guess - this.offset(guess) * 60000;
  };

  // ---------------------------------------------------------------- calculation

  function params(method, madhab) {
    var name = JS_NAME[method] || JS_NAME.EGYPTIAN;
    var p = adhan.CalculationMethod[name]();
    p.madhab = madhab === 'hanafi' ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
    // adhan-java 1.2.1 rounds every method to the nearest minute (adhan-js rounds Singapore up).
    p.rounding = adhan.Rounding.Nearest;
    return p;
  }

  /** Angles for Text.methodAngles: fajr, isha and the Isha interval in minutes (0 when by angle). */
  function angles(method) {
    var p = params(method, 'shafi');
    return { fajr: p.fajrAngle, isha: p.ishaAngle, interval: p.ishaInterval };
  }

  /**
   * The six times (UTC ms) for a local calendar day y, m (0-based), d, as adhan-java's DateComponents does:
   * the calendar day only, whatever the engine's own zone.
   */
  function times(lat, lng, method, madhab, y, m, d) {
    var t = new adhan.PrayerTimes(new adhan.Coordinates(lat, lng), new Date(y, m, d, 12), params(method, madhab));
    return [t.fajr.getTime(), t.sunrise.getTime(), t.dhuhr.getTime(), t.asr.getTime(), t.maghrib.getTime(), t.isha.getTime()];
  }

  /** The six times for the local day containing ms (+ days), in a clock's zone. */
  function timesFor(s, clock, ms, days) {
    var w = clock.wall(clock.dayStart(ms, days || 0) + 12 * 3600000);
    var city = clock.city;
    return times(city.lat, city.lng, s.method || city.method, s.madhab, w.getUTCFullYear(), w.getUTCMonth(), w.getUTCDate());
  }

  function qibla(lat, lng) {
    return adhan.Qibla(new adhan.Coordinates(lat, lng));
  }

  /** Whether the moment falls on a Friday in the clock's zone. */
  function isFriday(clock, ms) {
    return clock.wall(ms).getUTCDay() === 5;
  }

  return {
    FAJR: FAJR, SUNRISE: SUNRISE, DHUHR: DHUHR, ASR: ASR, MAGHRIB: MAGHRIB, ISHA: ISHA,
    METHODS: METHODS, CITIES: CITIES, ZONES: ZONES, cityById: cityById, Clock: Clock, zoneOffset: zoneOffset,
    deviceHasZone: deviceHasZone, deviceZoneName: deviceZoneName, clockFor: clockFor,
    times: times, timesFor: timesFor, qibla: qibla, angles: angles, isFriday: isFriday
  };
});
