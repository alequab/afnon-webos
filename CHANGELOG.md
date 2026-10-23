# Changelog

All notable changes to Afnon for LG webOS. Versions match `version` in `app/appinfo.json`.

## [Unreleased]

### Added
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

[0.1.0]: https://github.com/alequab/afnon-webos/releases/tag/v0.1.0
