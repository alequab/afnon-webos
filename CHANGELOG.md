# Changelog

All notable changes to Afnon for LG webOS. Versions match `version` in `app/appinfo.json`.

## [Unreleased]

## [1.0.0] - 2026-10-30

The version for the LG Content Store, with what Islamic Launcher for LG TV (up to its 1.2.0) has that a store
app can have.

### Added
- **Settings → Adjust the times** (from Islamic Launcher for LG TV): each of the six times moved by whole
  minutes, 30 earlier to 30 later, each row saying what the time is today with it. Home, Prayer day, the
  reminders and the adhan all follow it.
- **«أوشك وقت صلاة … على الانتهاء» in the page too,** with its row in Settings → Reminders (5 to 30 minutes
  before the current prayer's time ends, or off; 15 by default). Fajr ends at sunrise, Isha at Fajr. In front,
  the page says it after any line already playing; otherwise the service does.
- **Updates from the LG Content Store:** the TV's store installs updates (with its automatic updates on); Afnon
  never downloads or installs anything. Once a day it reads `store.json` in this repository, the version the
  store has, and when that is newer than its own it puts a gold dot on Settings and on What's new, and a line at
  the top of What's new whose OK opens the LG Content Store. `test=update` (`version=<x.y.z>` to pretend) tries it.
- **After a power cut,** while the TV's clock isn't set yet (`getSystemTime`'s `timeValid`), Home says «جارٍ
  ضبط الوقت…» instead of wrong times, and nothing is called or spoken. When the clock is set, or jumps by more
  than a minute, everything is worked out again and the service reschedules.
- **62 more cities, now 136 in 43 countries,** as in Afnon 0.4:
  - India, Pakistan, Bangladesh, Sri Lanka, the Maldives, Indonesia, Malaysia, Singapore, Brunei, Thailand,
    Japan, South Korea and Turkey.
  - The United Kingdom, France, Germany, the Netherlands, Belgium, Austria, Switzerland, Italy, Spain, and
    Bosnia and Herzegovina.
  - The United States, Canada, Kenya, Nigeria, South Africa, Australia and New Zealand.
  - Each city has its mosques' calculation method and its own time-zone rules, including summer time in North
    America, Europe, Australia and New Zealand.
- **Two Saudi Quran stations,** from the Saudi Broadcasting Authority's own streams (as Saudi Radio+ plays
  them): Holy Quran Radio and Nida Al-Islam Radio.
- **Settings → What's new,** a short list per release, in the app's language.
- **Live from Makkah and Madinah** (as on the TCL build):
  - A «مباشر» / Live pill on Home, beside night mode, picks Makkah or Madinah: the Saudi Broadcasting
    Authority's Quran and Sunnah channels on Aloula, H.264 over HLS in a plain `<video>`.
  - It plays in a 16:9 panel where the prayer strip and the radio card were; the arch, clock and dates stay.
    Under it: the place and state, Full screen, the other mosque, and Stop.
  - Full screen: ▲▼ open the quality list (360p, 480p, 1080p, with the data per hour); 480p at first, the
    choice remembered. Back leaves the list, then full screen, then stops the video.
  - Each start asks Aloula for a fresh address and plays the rendition's live list (three segments) rather
    than its six-hour DVR list. It stops on leaving Home or Afnon and with the radio, and the `<video>` is
    removed, so nothing stays in memory.
  - On the tested TV: playing in 2.8–3.7 s; about 57 MB more memory while it plays, all back when it stops.
  - `ares-launch … -p live=makkah|madinah|off` (with `quality=<height>`, `full=1`) tries it.

### Changed
- **From Afnon 0.7, in the shared prayer code:** the Oman Ministry of Awqaf's method (`OMAN_AWQAF`: 18°, +5
  minutes on Dhuhr, Asr and Maghrib, now named in Settings with its 5 minutes) and 56 more cities (192),
  Indonesia's in its three time zones.
- **The service warns before a prayer's time ends:** event `end` («أوشك وقت صلاة … على الانتهاء», clips
  `end_<prayer>`), `endRemind` minutes before Fajr's sunrise, the next prayer, or Isha's Fajr. On Friday it says
  Dhuhr's line, since Jumu'ah has no recording of its own. The spoken lines may be anyone's recordings; not in
  the repo.
- **Minutes added to each time:** the prayer code and the service take `adjust` (six minutes, -30 to 30) with
  the settings; the reminders and the adhan follow it.
- **The reminder before a prayer says «حان الآن موعد صلاة …»** (`BEFORE_AS_NOW`, in the page and the service),
  the maintainer's choice over «اقترب موعد صلاة …». Jumu'ah's lines are said with Dhuhr's recordings for now
  (`JUMUAH_CLIPS`), as in Islamic Launcher for LG TV.
- **The Hijri day begins at Maghrib:** from then until midnight the Hijri date and its weekday are the next
  day's, Ramadan's nights follow it, Jumu'ah names Dhuhr only until Friday's Maghrib, and the Surat al-Kahf line
  shows from Thursday's Maghrib to Friday's. The weekday moved from the Gregorian date to the Hijri one.
- **Settings keys** (the TCL build's fix): the arrows only move; OK opens a list, flips a switch, or starts
  editing a choice or a stepper, where ◀▶ change it, OK saves and Back cancels. «✓ تم الحفظ» shows for 2 s after
  each change. With the Magic Remote, − / + and a choice's parts act at once.
- **The Live pill plays Makkah at once;** with a mosque on, it goes to the buttons under the panel (Full
  screen, the other mosque, Stop).
- **Reminders aren't lost** when Afnon starts or comes back just as one begins (30 s of grace), after a change of
  minutes (5 → 10 → 5 reminds again), or after the page was closed (the service trusts its "in front" for 90 s,
  was 3 min).
- **Smaller fixes from the launcher:** holding Back or OK acts once; a countdown of 10 hours or more shrinks to fit
  the arch; the Magic Remote's pointer is no longer hidden; Arabic letters below the line (ي ج ع) are no longer
  clipped in one-line text; the focus ring in lists is no longer covered by the chosen item; Home's fonts start
  loading with the page.
- **Two more adhan voices,** 16 in all: «المسجد النبوي» (Madinah, Al-Masjid an-Nabawi) and «راغب مصطفى غلوش», the
  recordings meypod/al-azan uses. Like the others they aren't in the repo; `tools/fetch-adhans.ps1` downloads them.
- **Isha in Ramadan for the Saudi cities** (Umm al-Qura): 2 hours after Maghrib instead of 1½, from the first
  night of Ramadan to the last, as Saudi Arabia's calendar and [meypod/al-azan](https://github.com/meypod/al-azan)
  have it. The adhan comes at that time too.
- **Fajr and Isha in summer above 48°** (London, Birmingham, Manchester, Paris, Berlin, Frankfurt, Amsterdam,
  Brussels, Vienna): a seventh of the night from Maghrib and before sunrise, as al-azan has it, where these
  nights never get dark enough for the angles (London, 21 June: Isha 22:25 and Fajr 03:40, both 01:02 before).
  Every city now matches al-azan's times all year, except the Singapore method's, which round to the nearest
  minute as the Android app does.
- **Location is picked by region first** (Arab world, Asia, Europe, Americas, Africa, Oceania), then country (A
  to Z), then city, so no list is longer than 16. Back goes one step back.
- **Picking a city also sets its usual Asr school:** Hanafi for Pakistan, Bangladesh and most Indian cities,
  while Kerala and Chennai stay Shafi'i. The Asr row can still change it.
- **Arabic with Western digits: the big numbers in Marcellus,** as in English: Home's clock, the arch
  countdown, the call screen's time, the dim screen's clock, Today's prayers' times and the Qibla degrees.
  ص/م stay in Amiri. The countdown in Marcellus no longer shifts sideways each second.

### Removed
- **The Cairo Quran radio station.** The radio now starts on Nablus.
- **Turning the TV's panel off,** which a store app can't do: it went through the TV's own remote-control
  connection (with the TV's «Allow» prompt) or LG's private power service. Screen off and the dim screen's dark
  step are now Afnon's own black screen. `app/js/ssap.js` and its lgtv2 pairing manifest are gone, and so are the
  service's `screenOff` / `screenOn` and `test=lunaoff`.
- **The service no longer asks which app is in front** (a private call) and no longer opens another app for the
  call to prayer: Islamic Launcher for LG TV has its own service since its 1.1.0, so the call always opens Afnon.

## [0.1.0] - 2026-10-21

First version, following the Android app's features and look.

### Added
- **Home:**
  - The next prayer and a live countdown in the mihrab arch.
  - The day's six times.
  - The Hijri date above the Gregorian date.
  - A Quran verse with its reference in the app's digits.
- **Today's prayers:** an adhan bell per prayer, the Qibla dial and the room direction.
- **The adhan:**
  - It opens over other apps or an HDMI input at prayer time, through the TV's Activity Manager.
  - 14 voices plus a Fajr voice.
  - It closes when the adhan ends, or after 1, 5 or 10 minutes.
- **Reminders:**
  - 5–30 minutes before each prayer, as a TV notice with an optional spoken line.
  - «حان الآن موعد صلاة …» when a prayer's adhan is off.
  - Friday uses the Jumu'ah names and clips.
- **Friday and Ramadan modes.**
- **Quran radio:** 16 stations and reciters' channels.
- **Screen off while listening,** through the TV's own remote-control service, plus a dim screen while the
  radio plays.
- **Night mode,** from a button next to Settings or Settings → Display.
- **Locations:** 74 cities in 13 countries, each with its calculation method and its own time-zone rules, so
  the times are right whatever the TV's clock is set to.
- **Settings for all of the above:** location, method, Asr school, Hijri adjustment, voices, reminders,
  radio, language, digits and the 12/24-hour clock.
- **Tools:**
  - `tools/pack.ps1`, `tools/fetch-adhans.ps1` and `tools/make-voice.ps1`.
  - A desktop preview.
  - A comparison of every time against the Android app's adhan-java.

[Unreleased]: https://github.com/alequab/afnon-webos/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/alequab/afnon-webos/releases/tag/v1.0.0
[0.1.0]: https://github.com/alequab/afnon-webos/releases/tag/v0.1.0
