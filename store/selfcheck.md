# Seller Lounge self-check list (version 5.0, 53 rows)

Every row needs Pass or N/A before Submit. The results are the seller's statement to LG: enter them only from a
real test on a TV (webOS 5, 1.0.1 installed), never from the desktop preview alone.

Seller Lounge saves the list only when all 53 rows have a result ("Please select the select box."), so a
partial list stays in the open tab only.

**State 2026-11-01 01:25:** 36 answered in the open tab (16 N/A; 20 Pass: 1, 2, 3, 5, 6, 7, 8, 10, 11, 13,
14, 26, 31, 32, 33, 35, 36, 37, 40, 41); 17 open: 9, 12, 27–30, 34, 38, 39, 42–45, 47, 50, 51, 53. Not saved (LG
saves only a full list). Lab, second hour: Home key → TV Home and back to Afnon intact (36); Back from the arch
closes Afnon, Launch App opens it fresh (3); colour, number and volume keys change nothing in the app (32, 35,
40). Live never stayed on: the lab replays or drops keys (a stale OK opened Settings, a stale key closed the
panel), and the lab remote has no Exit or Live key.

Already known without the TV (2026-10-31, checked in the 1.0.1 preview): **Pass** on 2 Main Page, 6 Correct
Text, 7 Mouse Over/Focus, 10 UI Button, 41 Change Language.

Seen on a real TV (webOS Cloud Test Lab, webOS 23 OLED65B UK, 1.0.1, 2026-11-01 00:45 GMT+2): launches to
Home at once (1, 2); 1920×1080 fills the screen (5); English text whole and correct (6); gold focus ring on
the arch button, header buttons and prayer rows (7); no flicker (8); OK opens Today's prayers with the Qibla
(10); Back from Today's prayers returns to Home with the focus where it was (11, 37). Also seen: Settings opens and
renders (English, six sections, Prayer times rows) and Back from Settings returns Home; the radio's Play shows
"Connecting…", then "Signal lost · retrying" for Nablus, whose server (quran-radio.org:8899) was down from the
PC too at that hour; the app stayed responsive. The lab's remote lagged 5–30 s and dropped keys (every
click on its remote also shows the TV's pointer, and webOS spends the next arrow hiding it), so the live
video, sound, Exit, Home key, pointer and relaunch were not reached.

**Before Submit:** Nablus is the default station; if its stream is down when LG tests, Play shows "Signal
lost". Consider a default that is up (the Saudi Holy Quran Radio, kwikmotion) or falling back to the next
station. On
that TV (clock in UK time) the Cairo times show in the TV's clock (Fajr 02:41 = 04:41 Cairo) and the countdown
matches it.

## N/A: Afnon LG Lite doesn't have these (16)

| Row | Item | Why |
|---|---|---|
| 4 | Advertisement | no ads |
| 15, 16, 17 | Keyboard | no text input; the city is picked from lists |
| 18 | Terms | no terms screen |
| 19, 20, 21 | Sign Up / Sign In / Sign Out | no accounts |
| 22 | Search | no search box |
| 23 | Adult authentication | no adult content |
| 24, 25 | Payment | free, no purchases |
| 46 | Play Contents / Replay | no series or episodes |
| 48 | Play Contents / subtitle | the live video has none |
| 49 | Play Contents / Play Resume | live only |
| 52 | Contents DRM | no paid or protected video |

## Test on the TV (37; 2, 6, 7, 10 and 41 seen in the preview, the rest need the TV)

| Rows | What to check |
|---|---|
| 1–3 | Launch, main page, close and launch again |
| 5–9 | Resolution and ratio on every screen, text (Arabic and English), focus ring, no flicker, live video full size |
| 10–14 | Every button works, Back, Exit, no freeze, no crash |
| 26–31, 33 | General remote, Magic Remote: pointer, OK, wheel; arrows; OK key |
| 32 | Colour keys: not used; Pass if pressing them breaks nothing |
| 34–35 | Home, Back, Exit, volume work; other keys do nothing harmful |
| 36–40 | Home, Back, Exit, Live, number keys leave or go back properly |
| 41 | Arabic ⇄ English (Settings → Display & language) |
| 42 | Adhan and radio sound; sound stops on leaving the app |
| 43–45, 47 | Live Makkah/Madinah: plays, full screen, its controls, streaming |
| 50–51 | Live quality 360p/480p/1080p, the stream's codec (HLS) plays |
| 53 | Factory reset: don't reset the TV for this. The app keeps only its own settings on the TV and starts fresh on Cairo without them (as in the store screenshots); Pass on that basis is the seller's call |

Install for the test with `tools\pack.ps1 -Install -Launch` (or `ares-install` the release ipk) and remove it
afterwards: the rooted TV runs the launcher, whose service would play a second adhan.
