# Afnon for LG webOS (أفنون)

The prayer day on an LG TV: the next prayer and a live countdown in a mihrab arch, offline prayer times, the
Qibla, the adhan at prayer time, reminders before each prayer, Friday and Ramadan modes, and Quran radio.
Arabic (right to left) first, with English.

This is the LG (webOS) version of [Afnon](https://github.com/egyjs/afnon-android-tv-launcher), the Android TV
launcher. It keeps the same look, the same 74 cities and the same prayer times, rebuilt as a light web app for
webOS, so it runs smoothly on low-memory TVs.

Tested on an LG 65UN7240PVG (2020) with webOS TV Lite 5.6.2 and about 1.1 GB of RAM.

## Features

- **Home.** The next prayer and a live countdown inside the mihrab arch, the six times of the day, the Hijri
  and Gregorian dates, and a Quran verse. The prayer whose time it is now stands out.
- **Today's prayers and the Qibla.** An adhan on/off bell for each prayer, the Qibla direction from your city,
  and a one-time setting for which way the TV faces, so the screen can say where the Qibla is from where you sit.
- **The adhan at prayer time.** Afnon opens by itself over whatever is on (an app or an HDMI input), plays the
  adhan, then goes back. 14 voices plus a separate Fajr voice. It closes when the adhan ends, or 1, 5 or 10
  minutes after it appears; Back stops it at any time.
- **Reminders.** 5, 10, 15, 20 or 30 minutes before each prayer, a notice on the TV, with an optional spoken
  reminder («اقترب موعد صلاة العصر»). When a prayer's adhan is off, Afnon can say «حان الآن موعد صلاة …»
  instead.
- **Friday and Ramadan.** Jumu'ah in place of Dhuhr with a Surat al-Kahf reminder; iftar and suhoor in Ramadan.
- **Quran radio.** Broadcast Quran radio from Cairo, Nablus, Qatar (two) and Jordan, Shabab FM Quran, and ten
  reciters' 24/7 channels from mp3quran.net. Each plays the station's own public stream.
- **Screen off while listening.** The panel goes dark while the radio keeps playing; any button brings it
  back. After a while without a key press, a dim screen with the clock and next prayer comes first, moving now
  and then so nothing burns in.
- **Night mode.** The button next to Settings switches every screen to calmer, dimmer colours.
- **74 cities in 13 countries** (Egypt, Saudi Arabia, the UAE, Kuwait, Qatar, Jordan, Palestine, Lebanon, Syria,
  Iraq, Bahrain, Oman and Yemen), each with its usual calculation method and its own time-zone rules. Times
  are calculated on the TV with [adhan-js](https://github.com/batoulapps/adhan-js); they match the Android app's
  adhan-java exactly (12,240 times compared, none differ).
- **No accounts, ads or tracking.** Only the radio uses the internet.

### How it differs from the Android version

webOS doesn't let an app replace the TV's Home screen or read the list of installed apps, so:

- Afnon is an app you open from the Home bar, not your Home screen. There are no favourites or All apps.
  Back on the arch closes Afnon.
- The reminder over other apps is the TV's own notice (a few seconds, top corner). Apps in Developer Mode
  can't show a popup.
- The radio plays while Afnon is open and stops when you leave it.
- Afnon never changes the TV's volume. On Android it turns a muted TV up for the adhan.
- The remote's app buttons stay LG's own.

## Install

You need a free [LG developer account](https://webostv.developer.lge.com), and a Windows PC with
[Node.js](https://nodejs.org) 20 or newer on the same network as the TV. The tools are PowerShell scripts.

1. **On the TV:** from the LG Content Store, install **Developer Mode**, sign in with your LG developer
   account, turn on **Dev Mode Status** (the TV restarts), then open it again and turn on **Key Server**. Note
   the IP address and passphrase it shows.
2. **LG's command-line tools:**
   ```powershell
   npm install -g @webos-tools/cli
   ares-setup-device --add lg -i host=<TV IP> -i port=9922 -i username=prisoner
   ares-novacom --device lg --getkey     # type the passphrase from the Developer Mode app
   ```
3. **Afnon's tools,** from this folder:
   ```powershell
   npm ci --prefix tools/npm             # adhan-js, the prayer-time library
   .\tools\fetch-adhans.ps1              # the 14 adhan recordings (optional; without them the adhan is silent)
   .\tools\make-voice.ps1                # the spoken reminders, with Windows' Arabic voice (optional)
   ```
4. **Build and install:**
   ```powershell
   .\tools\pack.ps1 -Install -Launch
   ```
5. **On the TV:** choose your city in Settings (gear icon) → Location. The first time you use Screen off, the
   TV asks once to allow the connection. Press Allow.

Keep Developer Mode's session alive: open the Developer Mode app and press **Extend** now and then (a session
lasts about 1,000 hours). If it runs out, the TV removes apps installed this way, and you install again with
step 4.

To update, pull the new version and run `.\tools\pack.ps1 -Install` again. Your settings stay on the TV.

## Privacy and network

- **Prayer times, the Qibla, reminders and the adhan** all work offline.
- **The radio** connects only to the station you pick:
  - `stream.radiojar.com`
  - `quran-radio.org`
  - `streaming.zaytonatube.com`
  - `live.kwikmotion.com`
  - `jrtv-live.ercdn.net`
  - `backup.qurango.net`
- **Screen off** asks the TV's own remote-control service, on the TV itself (`127.0.0.1`), to turn the panel
  off. Apps in Developer Mode aren't allowed to do it directly. The key the TV gives for that stays in Afnon's
  storage on the TV.
- **No analytics, crash reports or accounts.**

## Known issues

- **Jordan:** the Quran radio station from Jordan plays nothing on webOS 5; the other stations play.
- **The spoken reminder over another app** may not be heard on every model. The on-screen notice always shows.
- **TVs set to a fixed time offset:** some models only allow one ("Custom" time zone), which doesn't follow
  summer and winter time. Afnon uses your city's own rules, so its times stay right, but the TV's own clock may
  be an hour out after the change.

## Development

There's no build step. The page is plain ES5 for webOS 5's Chromium 68 engine, and the background service runs
on the TV's Node 8. Everything aims to stay fast on a weak TV:
- No frameworks.
- The countdown updates one text node a second.
- Animation uses only transform and opacity.
- Each screen is built once.
- Home uses about 50 MB.

| Folder | What's in it |
|---|---|
| `app/` | The page: `index.html`, `css/afnon.css`, `js/app.js` (all screens), `js/data.js` (stations, voices), `js/ssap.js` (screen off), fonts and icons |
| `service/` | The background service: schedules each next reminder and adhan with the TV's Activity Manager, shows the notices, plays the spoken lines |
| `shared/` | `prayer.js` (cities, methods, times) and `text.js` (every string, Arabic and English), used by both |
| `tools/` | `pack.ps1`, `sync.ps1` (copies `shared/` and adhan-js into `app/` and `service/`), `fetch-adhans.ps1`, `make-voice.ps1`, `serve.js` (desktop preview on http://localhost:8719), `compare/` (checks the times against the Android app's adhan-java) |

**Test hooks.** Run `ares-launch --device lg tv.afnon.lg -p test=<kind>` to try something without waiting:
- Kinds: `call`, `reminder`, `announce`, `voice`, `friday`, `ramadan`, `radio`, `screenoff`, `dream`, `mem`
- `-p seconds=<n>` delays it.
- `-p station=<id>` picks a radio station.

The service logs to `/tmp/afnon-lg.log` on the TV (`ares-novacom --device lg --run "tail /tmp/afnon-lg.log"`).

<div dir="rtl">

## بالعربية

أفنون على تلفاز LG: الصلاة القادمة وعدّ تنازلي في محراب، ومواقيت اليوم دون إنترنت، والقبلة، والأذان في وقته
فوق أي تطبيق، والتنبيه قبل كل صلاة نصًّا وصوتًا، ووضعا الجمعة ورمضان، وإذاعات القرآن الكريم، وإطفاء الشاشة أثناء
الاستماع، والوضع الليلي. ٧٤ مدينة في ١٣ دولة، والعربية أولًا.

يُثبَّت عبر «وضع المطوّر» من LG بحساب مطوّر مجاني، ثم أوامر الخطوات أعلاه. لا حسابات ولا إعلانات ولا تتبّع،
والإذاعة وحدها تستخدم الإنترنت.

</div>

## Credits

- [Afnon](https://github.com/egyjs/afnon-android-tv-launcher) by egyjs: the design, the cities, the strings and
  the Android app this follows.
- Prayer times: [adhan-js](https://github.com/batoulapps/adhan-js) (MIT) by Batoul Apps.
- Adhan recordings: [abodehq/Athan-MP3](https://github.com/abodehq/Athan-MP3). They aren't in the source, and
  `fetch-adhans.ps1` downloads them. If you hold the rights to a recording and want it removed, open an issue.
- Fonts: [Amiri](https://github.com/aliftype/amiri), [Alexandria](https://fonts.google.com/specimen/Alexandria)
  and [Marcellus](https://fonts.google.com/specimen/Marcellus), under the SIL Open Font Licence.
- Screen-off pairing manifest from [lgtv2](https://github.com/hobbyquaker/lgtv2) (MIT).
- Built with [Claude Code](https://claude.com/claude-code) on the real TV.

See [THIRD_PARTY.md](THIRD_PARTY.md). Released under the [MIT licence](LICENSE).
