# Changelog

All notable changes to Afnon for LG webOS. Versions match `version` in `app/appinfo.json`.

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

[0.1.0]: https://github.com/OWNER/REPO/releases/tag/v0.1.0
