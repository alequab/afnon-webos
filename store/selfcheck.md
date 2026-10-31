# Seller Lounge self-check list (version 5.0, 53 rows)

Every row needs Pass or N/A before Submit. The results are the seller's statement to LG: enter them only from a
real test on a TV (webOS 5, 1.0.1 installed), never from the desktop preview alone.

## N/A: Afnon LG Lite doesn't have these (17)

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

## Test on the TV (36)

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
