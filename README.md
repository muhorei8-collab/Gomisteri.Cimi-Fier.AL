# Gomisteri Cimi — website

Faqja zyrtare e Gomisteri Cimi (goma dhe shërbime automjetesh, Fier, Shqipëri). Sajt statik, pa backend, gati për GitHub Pages.

## Struktura e projektit

```
index.html              faqja kryesore (të gjitha seksionet)
css/style.css            i gjithë stilizimi (ngjyra, tipografi, layout)
js/app.js                logjika: telefoni/emaili, orari hapur/mbyllur, filtrimi i gomave, krahasimi
data/tires.js            katalogu i gomave (të dhëna të pastra, të ndara nga UI)
assets/logo/             logoja SVG (versioni i plotë dhe kompakt)
assets/favicon/          favicon SVG
assets/images/           hapësirë për foto shtesë (bosh për momentin)
README.md                ky dokument
```

## 1. Si ta ekzekutosh lokalisht

Sajti nuk ka nevojë për build apo instalim. Mjafton ta hapësh me një server të thjeshtë lokal (hapja direkte me dyklikim funksionon pjesërisht, por një server lokal shmang probleme me shfletuesin):

```bash
cd gomisteri-cimi
python3 -m http.server 8000
```

Pastaj hap `http://localhost:8000` në shfletues.

## 2. Si të ndryshosh çmimet e gomave

Hap `data/tires.js`. Çdo gomë është një objekt si ky:

```js
{ brand: "Continental", size: "205/55 R16", width: 205, profile: 55, rim: 16,
  season: "Kontaktoni për informacion", price: 105000, currency: "ALL_OLD", availability: true }
```

Ndrysho vetëm fushën `price` (në lekë të vjetra, pa presje). Faqja përditësohet vetë.

## 3. Si të shtosh një gomë të re

Shto një objekt të ri në fund të listës `tires` në `data/tires.js`, duke ndjekur të njëjtin format. Filtrat (gjerësi/profil/rim/markë) dhe krahasimi popullohen automatikisht nga kjo listë — nuk duhet të ndryshosh asgjë tjetër.

## 4. Si të ndryshosh numrin e telefonit

Hap `js/app.js`, objekti `BUSINESS` në krye të skedarit:

```js
phone: "069 350 551",
phoneHref: "tel:069350551",
```

Ndrysho të dyja vlerat (formatin e shfaqur dhe formatin `tel:` pa hapësira). Numri përditësohet automatikisht kudo në faqe (hero, navigim, kontakt, footer, shiriti mobil).

## 5. Si të ndryshosh orarin e punës

Në të njëjtin objekt `BUSINESS`, fusha `hours` (0 = e diel ... 6 = e shtunë):

```js
hours: {
  1: { open: "08:00", close: "18:30" }, // e hënë
  ...
  0: null, // e diel — mbyllur
}
```

Për një ditë të mbyllur, vendos `null`. Statusi "HAPUR TANI / MBYLLUR TANI" llogaritet automatikisht nga këto orare dhe ora aktuale e vizitorit.

## 6. Si të ndryshosh të dhënat e tjera të biznesit

Gjithmonë te `js/app.js` → `BUSINESS`:

- `email` — emaili i kontaktit
- `address` — adresa e shfaqur në tekst
- `mapsUrl` — ndërtohet automatikisht nga adresa; nëse ke koordinata të sakta, mund ta zëvendësosh me një link direkt të Google Maps

## 7. Si ta ngarkosh në GitHub dhe të aktivizosh GitHub Pages

1. Krijo një depo (repository) të re në GitHub, p.sh. `gomisteri-cimi`.
2. Në terminal, brenda folderit të projektit:
   ```bash
   git init
   git add .
   git commit -m "Fillimi i faqes Gomisteri Cimi"
   git branch -M main
   git remote add origin https://github.com/<perdoruesi-yt>/gomisteri-cimi.git
   git push -u origin main
   ```
3. Në GitHub, hap **Settings → Pages**.
4. Te **Source**, zgjidh degën `main` dhe folderin `/ (root)`.
5. Kliko **Save**. Pas pak minutash faqja do të jetë e aksesueshme te:
   `https://<perdoruesi-yt>.github.io/gomisteri-cimi/`

## 8. Përditësime të ardhshme

- Çdo ndryshim çmimi/gome → vetëm `data/tires.js`.
- Çdo ndryshim dizajni/ngjyrash → vetëm `css/style.css` (ngjyrat kryesore janë ndryshore CSS `:root` në krye të skedarit).
- Çdo ndryshim sjelljeje (filtra, orar) → `js/app.js`.
- Për të shtuar foto reale (dyqan, punë, goma), vendosi te `assets/images/` dhe referoji me `<img>` në `index.html`.

## Shënime

- Çmimet janë në **lekë të vjetra**, siç theksohet në disa vende të faqes.
- Nuk përmban recensione (reviews) të rreme — seksioni "Rreth Nesh" ka një hapësirë të gatshme për t'u lidhur më vonë me vlerësime reale.
- Logot e markave të gomave (Continental, Michelin, etj.) shfaqen vetëm si tekst, jo si logo të kopjuara.
