/**
 * GOMISTERI CIMI — Katalogu i gomave
 * -----------------------------------
 * Për të shtuar një gomë të re, thjesht shto një objekt të ri në fund
 * të listës `tires` më poshtë, duke ndjekur të njëjtin format.
 *
 * Fushat:
 *   brand        - marka e gomës (tekst)
 *   size         - madhësia e plotë, si shfaqet te klienti (tekst)
 *   width        - gjerësia, p.sh. 205 (numër)
 *   profile      - profili, p.sh. 55 (numër)
 *   rim          - diametri i buzëve, p.sh. 16 (numër)
 *   season       - stina ("Kontaktoni për informacion" nëse nuk dihet)
 *   price        - çmimi në lekë të vjetra (numër, pa presje/pika)
 *   currency     - gjithmonë "ALL_OLD" (lekë të vjetra)
 *   availability - true/false
 *
 * SHËNIM: Çmimet janë në LEKË TË VJETRA, jo lekë të reja.
 */

const tires = [
  // ---- 185/65 R14 ----
  { brand: "Green Max",   size: "185/65 R14", width: 185, profile: 65, rim: 14, season: "Kontaktoni për informacion", price: 50000, currency: "ALL_OLD", availability: true },
  { brand: "Matador",     size: "185/65 R14", width: 185, profile: 65, rim: 14, season: "Kontaktoni për informacion", price: 65000, currency: "ALL_OLD", availability: true },
  { brand: "Continental", size: "185/65 R14", width: 185, profile: 65, rim: 14, season: "Kontaktoni për informacion", price: 105000, currency: "ALL_OLD", availability: true },
  { brand: "Barum",       size: "185/65 R14", width: 185, profile: 65, rim: 14, season: "Kontaktoni për informacion", price: 70000, currency: "ALL_OLD", availability: true },

  // ---- 195/65 R15 ----
  { brand: "Green Max",   size: "195/65 R15", width: 195, profile: 65, rim: 15, season: "Kontaktoni për informacion", price: 50000, currency: "ALL_OLD", availability: true },
  { brand: "Matador",     size: "195/65 R15", width: 195, profile: 65, rim: 15, season: "Kontaktoni për informacion", price: 65000, currency: "ALL_OLD", availability: true },
  { brand: "Continental", size: "195/65 R15", width: 195, profile: 65, rim: 15, season: "Kontaktoni për informacion", price: 85000, currency: "ALL_OLD", availability: true },
  { brand: "Barum",       size: "195/65 R15", width: 195, profile: 65, rim: 15, season: "Kontaktoni për informacion", price: 70000, currency: "ALL_OLD", availability: true },

  // ---- 205/55 R16 ----
  { brand: "Green Max",   size: "205/55 R16", width: 205, profile: 55, rim: 16, season: "Kontaktoni për informacion", price: 50000, currency: "ALL_OLD", availability: true },
  { brand: "Matador",     size: "205/55 R16", width: 205, profile: 55, rim: 16, season: "Kontaktoni për informacion", price: 65000, currency: "ALL_OLD", availability: true },
  { brand: "Michelin",    size: "205/55 R16", width: 205, profile: 55, rim: 16, season: "Kontaktoni për informacion", price: 105000, currency: "ALL_OLD", availability: true },
  { brand: "Continental", size: "205/55 R16", width: 205, profile: 55, rim: 16, season: "Kontaktoni për informacion", price: 105000, currency: "ALL_OLD", availability: true },

  // ---- 225/45 R17 (vetëm një herë) ----
  { brand: "Green Max",   size: "225/45 R17", width: 225, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 55000, currency: "ALL_OLD", availability: true },
  { brand: "Matador",     size: "225/45 R17", width: 225, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 75000, currency: "ALL_OLD", availability: true },
  { brand: "Continental", size: "225/45 R17", width: 225, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 110000, currency: "ALL_OLD", availability: true },
  { brand: "Barum",       size: "225/45 R17", width: 225, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 85000, currency: "ALL_OLD", availability: true },

  // ---- 245/45 R17 ----
  { brand: "Linglong",    size: "245/45 R17", width: 245, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 70000, currency: "ALL_OLD", availability: true },
  { brand: "Matador",     size: "245/45 R17", width: 245, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 95000, currency: "ALL_OLD", availability: true },
  { brand: "Continental", size: "245/45 R17", width: 245, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 165000, currency: "ALL_OLD", availability: true },
  { brand: "Barum",       size: "245/45 R17", width: 245, profile: 45, rim: 17, season: "Kontaktoni për informacion", price: 115000, currency: "ALL_OLD", availability: true },
];
