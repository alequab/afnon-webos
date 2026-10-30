# Third-party material

The MIT licence in `LICENSE` covers Afnon's own code. These parts belong to others.

| What | Where | Licence |
|---|---|---|
| [adhan-js](https://github.com/batoulapps/adhan-js) by Batoul Apps | `tools/npm` dependency; `tools/sync.ps1` copies its bundle into `app/js/adhan.js` and `service/adhan.js` | MIT |
| [Amiri](https://github.com/aliftype/amiri) by Khaled Hosny | `app/fonts/amiri_*.ttf` | SIL Open Font Licence 1.1 |
| [Alexandria](https://fonts.google.com/specimen/Alexandria) by Mohamed Gaber and Julieta Ulanovsky | `app/fonts/alexandria_*.ttf` | SIL Open Font Licence 1.1 |
| [Marcellus](https://fonts.google.com/specimen/Marcellus) by Astigmatic | `app/fonts/marcellus_regular.ttf` | SIL Open Font Licence 1.1 |
| Adhan recordings from [abodehq/Athan-MP3](https://github.com/abodehq/Athan-MP3) | Not in the source (`tools/fetch-adhans.ps1` downloads them); in the release package, `app/sounds/adhan/` | None stated. Credited here; any recording is removed on request from its rights holder. |
| Adhan recordings «المسجد النبوي» and «راغب مصطفى غلوش» from [meypod/audio_files](https://github.com/meypod/audio_files), as [meypod/al-azan](https://github.com/meypod/al-azan) uses them | Not in the source (`tools/fetch-adhans.ps1` downloads them); in the release package, `app/sounds/adhan/` | None stated. Credited here; any recording is removed on request from its rights holder. |
| Spoken lines («حان الآن موعد صلاة …», «أوشك وقت صلاة … على الانتهاء», «اقترب موعد صلاة …») | Not in the source (`tools/make-voice.ps1` makes them with Windows' Arabic voice); the release package has the maintainer's set, `app/sounds/announce/` and `announce/` in the service | The maintainer's; removed on request from the speaker |
| Live video from Makkah and Madinah: the Saudi Broadcasting Authority's Quran and Sunnah channels, as [Aloula](https://aloula.sba.sa) streams them | Played from the public stream, never stored | Belongs to the Saudi Broadcasting Authority. Afnon is not affiliated with it. |
| The Saudi Broadcasting Authority's radios as [Saudi Radio+](https://radioplus.sba.sa) streams them: إذاعة القرآن الكريم and إذاعة نداء الإسلام | Played from the public stream, never stored | Belong to the Saudi Broadcasting Authority. Afnon is not affiliated with it. |
| Quran radio streams: إذاعة القرآن الكريم in Nablus, Qatar and Jordan, Shabab FM (Nablus), and the reciters' channels of mp3quran.net | Played from each station's public stream, never stored | Belong to the stations. Afnon is not affiliated with any of them. |

The fonts can be renamed or bundled under the OFL, but not sold on their own. The full text is at
https://openfontlicense.org.
