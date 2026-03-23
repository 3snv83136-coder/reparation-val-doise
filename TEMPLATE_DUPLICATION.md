---
name: Template site réparation canalisation
description: Template complet pour dupliquer un site de réparation canalisation sur n'importe quel département. Inclut stack, structure, design system, SEO, back-office. Zéro erreur au build.
type: template
---

# 🔧 TEMPLATE SITE RÉPARATION CANALISATION — Duplication Express

## 1. STACK TECHNIQUE (ne pas changer)

```
Next.js 16 (App Router) + TypeScript
Prisma + SQLite (local, pas de BDD externe)
Tailwind CSS v4 (ATTENTION : mx-auto/px-6 cassés avec valeurs arbitraires, utiliser classes CSS .container-*)
Zod (validation formulaires)
React Hook Form (formulaires)
bcryptjs (auth admin)
Lucide React (icônes)
@anthropic-ai/sdk (génération IA rapports)
@react-pdf/renderer (export PDF devis)
date-fns (formatage dates FR)
Nodemailer (emails, config SMTP dans Parametres)
```

## 2. DESIGN SYSTEM VERROUILLÉ

### Couleurs
```
Primary (orange) : #F7941D
Primary hover    : #e5850f
Primary light    : #FFF7ED
Dark (texte/sidebar) : #2D3748
Dark sidebar     : #1A202C
Cream            : #FFFBF5
Light grey (bg)  : #F7FAFC
Mid grey (borders) : #E2E8F0
Text primary     : #2D3748
Text secondary   : #718096
Text muted       : #A0AEC0
Green (success)  : #38A169
```

### Fonts
```
Display (titres) : Barlow Condensed (Google Fonts, weights 400-900)
Body (texte)     : DM Sans (Google Fonts, weights 400-700)
```
Chargées dans layout.tsx via `next/font/google`, appliquées via CSS `var(--font-display)` et `var(--font-body)`.

### Containers (CSS pur, PAS Tailwind)
```css
.container-main   { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
.container-narrow { max-width: 900px;  margin: 0 auto; padding: 0 24px; }
.container-tight  { max-width: 700px;  margin: 0 auto; padding: 0 24px; }
.admin-main       { flex: 1; padding: 24px; margin-left: 0; }
@media (min-width: 1024px) { .admin-main { margin-left: 256px; padding: 32px; } }
```

### RÈGLE ABSOLUE
> Tous les styles de layout (centrage, padding, marges) en CSS `.container-*` ou `style={{}}` inline.
> JAMAIS de classes Tailwind `mx-auto`, `px-6`, `max-w-[...]` pour le layout — elles sont cassées en Tailwind v4 avec @theme.
> Les classes Tailwind restent OK pour : `hidden`, `lg:hidden`, `lg:block`, `animate-spin`, `lg:ml-64`.

## 3. STRUCTURE DES FICHIERS

```
src/
├── app/
│   ├── globals.css              # Design system + containers CSS
│   ├── layout.tsx               # Fonts + metadata + JSON-LD LocalBusiness
│   ├── page.tsx                 # Homepage SEO 800+ mots
│   ├── sitemap.ts               # Sitemap XML auto (pages + villes)
│   ├── robots.ts                # robots.txt
│   ├── services/page.tsx        # 3 services E-E-A-T détaillés
│   ├── reservation/page.tsx     # Formulaire 3 étapes
│   ├── reservation/confirmation/page.tsx
│   ├── contact/page.tsx         # Contact + formulaire
│   ├── temoignages/page.tsx     # Avis dynamiques Prisma
│   ├── mentions-legales/page.tsx
│   ├── zone-intervention/page.tsx        # Liste villes
│   ├── zone-intervention/[ville]/page.tsx # Pages ville SEO 500+ mots
│   ├── admin/
│   │   ├── layout.tsx           # Layout admin (sidebar + auth check)
│   │   ├── login/page.tsx
│   │   ├── page.tsx             # Dashboard KPI
│   │   ├── reservations/page.tsx
│   │   ├── messages/page.tsx
│   │   ├── interventions/page.tsx
│   │   ├── interventions/nouveau/page.tsx  # Formulaire + IA
│   │   ├── avis/page.tsx
│   │   ├── devis/page.tsx
│   │   ├── devis/nouveau/page.tsx  # Formulaire BTP poste par poste
│   │   ├── contenu/page.tsx     # CMS
│   │   ├── analytics/page.tsx
│   │   └── parametres/page.tsx
│   └── api/
│       ├── reservation/route.ts
│       ├── creneaux/route.ts
│       ├── contact/route.ts
│       ├── analytics/track/route.ts
│       ├── auth/login/route.ts
│       ├── auth/logout/route.ts
│       └── admin/ (contenu, devis, interventions, generer-rapport)
├── components/
│   ├── layout/header.tsx        # Logo + bouton tel orange arrondi
│   ├── layout/footer.tsx        # Footer 4 colonnes dark
│   ├── layout/cta-banner.tsx    # Barre mobile orange fixe
│   ├── admin/admin-sidebar.tsx  # Sidebar dark + nav orange
│   ├── seo/json-ld.tsx          # LocalBusiness, FAQ, Service, Breadcrumb, AggregateRating
│   └── ui/ (button, input, card, badge)
├── lib/
│   ├── cities.ts                # DONNÉES VILLES (à changer par département)
│   ├── prisma.ts, auth.ts, utils.ts, validators.ts
│   ├── time-slots.ts, analytics.ts, contenu.ts
│   ├── devis.ts, btp-lexique.ts, ai-report.ts
│   └── middleware.ts
├── prisma/schema.prisma         # Schéma BDD complet
└── prisma/seed.ts               # Seed admin + parametres
```

## 4. CE QUI CHANGE PAR DÉPARTEMENT (checklist duplication)

### Fichiers à modifier :

| Fichier | Ce qui change |
|---------|--------------|
| `src/lib/cities.ts` | **TOUTES les villes** — noms, slugs, codes postaux, descriptions locales |
| `src/app/layout.tsx` | Titre, description, nom du site, JSON-LD (téléphone, adresse, areaServed, geo) |
| `src/app/page.tsx` | Nom département dans H1, textes, FAQ localisées, villes dans la grille |
| `src/app/services/page.tsx` | Nom département dans les textes |
| `src/app/zone-intervention/[ville]/page.tsx` | Automatique (utilise cities.ts) |
| `src/app/sitemap.ts` | URL de base du domaine |
| `src/app/robots.ts` | URL sitemap |
| `src/components/seo/json-ld.tsx` | Nom entreprise, téléphone, adresse, geo coordinates |
| `src/components/layout/header.tsx` | Nom du site, numéro de téléphone |
| `src/components/layout/footer.tsx` | Nom, téléphone, email, 5 villes principales |
| `src/components/layout/cta-banner.tsx` | Numéro de téléphone |
| `prisma/seed.ts` | Nom entreprise, téléphone, email |
| `package.json` | Nom du projet |

### Fichiers qui NE changent PAS :
- `globals.css` (design system)
- `src/components/ui/*` (composants UI)
- `src/lib/auth.ts`, `devis.ts`, `btp-lexique.ts`, `analytics.ts`, `time-slots.ts`
- Toutes les pages admin (back-office identique)
- Toutes les API routes
- `prisma/schema.prisma` (schéma BDD identique)

## 5. SERVICES (3 uniquement, pas de débouchage ni curage)

1. **Remplacement de canalisation** — fonte, PVC, PEHD, tranchée/chemisage
2. **Réparation de fuite** — acoustique, corrélation, gaz traceur
3. **Diagnostic caméra** — inspection HD, localisation GPS, rapport vidéo

## 6. SEO CHECKLIST PAR SITE

- [ ] Title tag unique avec [Ville principale] + [Département] + [Code postal]
- [ ] Meta description 150 chars avec mots-clés locaux
- [ ] H1 homepage : "Remplacement de Canalisation en Urgence dans le [Département]"
- [ ] JSON-LD LocalBusiness (nom, tel, adresse, geo, horaires, areaServed)
- [ ] JSON-LD FAQPage (8 questions/réponses détaillées)
- [ ] JSON-LD Service (3 services avec prix)
- [ ] JSON-LD BreadcrumbList (pages intérieures)
- [ ] JSON-LD AggregateRating (témoignages)
- [ ] Sitemap XML avec toutes les villes
- [ ] robots.txt avec lien sitemap
- [ ] Canonical URL sur chaque page
- [ ] Pages ville : 500+ mots, H1 avec nom ville, 3 services localisés, processus 4 étapes, villes proches
- [ ] Homepage : 800+ mots, FAQ, avis dynamiques, section artisans E-E-A-T
- [ ] Services : 200+ mots par service, vocabulaire BTP (DTU, NF, CR8, PEHD)

## 7. COMPOSANT BUTTON — VARIANTS VALIDES

```typescript
variant: "primary" | "blue" | "green" | "outline" | "outlineWhite" | "ghost" | "link"
size: "sm" | "default" | "lg"
```
⚠️ PAS de variant "secondary" — utiliser "outline" à la place. Le build Vercel crashe sinon.

## 8. HERO HOMEPAGE — Structure

```
<section position:relative overflow:hidden>
  <div position:absolute inset:0 backgroundImage hero-canalisation.jpg backgroundSize:cover />
  <div position:absolute inset:0 background:rgba(0,0,0,0.55) />  ← overlay noir 55%
  <div container-narrow position:relative zIndex:2>
    Badge "INTERVENTION [DEPT] — ARRIVÉE SOUS 1H"
    H1 "Remplacement de Canalisation en Urgence dans le [Département]"
    Pill blanc "DEVIS 100% GRATUIT AVANT TRAVAUX"
    Sous-titre
    2 CTA : bouton tel blanc + bouton "Prendre rendez-vous" outline blanc
  </div>
</section>
```

## 9. ADMIN — Identifiants par défaut (seed)

```
Email    : admin@[domaine].fr
Password : admin123
```
À changer en production via la BDD.

## 10. PROCÉDURE DE DUPLICATION RAPIDE

```bash
# 1. Copier le projet
cp -r reparation-val-doise reparation-[nouveau-dept]
cd reparation-[nouveau-dept]

# 2. Supprimer git et BDD
rm -rf .git .next node_modules prisma/*.db*

# 3. Modifier les fichiers (voir section 4)
# → cities.ts, layout.tsx, page.tsx, header.tsx, footer.tsx, json-ld.tsx, seed.ts, sitemap.ts, robots.ts

# 4. Installer et initialiser
npm install
npx prisma db push
npx tsx prisma/seed.ts

# 5. Tester
npm run dev
npm run build  ← DOIT passer sans erreur

# 6. Déployer
git init && git add -A && git commit -m "Initial commit"
git remote add origin https://github.com/[user]/[repo].git
git push -u origin main
# → Connecter sur Vercel
```

## 11. PIÈGES À ÉVITER

1. **Tailwind v4 + @theme** : les classes `mx-auto`, `px-6`, `max-w-[1100px]` ne s'appliquent PAS quand combinées. Utiliser `.container-main` CSS.
2. **Button variant "secondary"** : n'existe pas → crash build. Utiliser "outline".
3. **Inline style `marginLeft: 0`** : override les classes Tailwind `lg:ml-64`. Utiliser la classe CSS `.admin-main`.
4. **Pages admin avec classes `bg-action`, `text-text-primary`** : fonctionnent grâce aux couleurs définies dans `@theme`. Ne pas supprimer le bloc `@theme` du CSS.
5. **Fonts** : chargées dans layout.tsx mais appliquées via CSS `h1-h4 { font-family: var(--font-display) }`. Si on met tout en inline style, les fonts ne s'appliquent pas → ajouter `fontFamily: "var(--font-display)"` dans chaque style inline de titre.
6. **Avis dynamiques** : la homepage fait `prisma.avis.findMany()` côté serveur. Si la BDD est vide, le fallback hardcodé s'affiche. Penser à seeder des avis.
7. **Image hero** : doit exister dans `public/images/hero-canalisation.jpg`. Si absente → fond noir.
