/*
 * Reference extract of the ORIGINAL Shadhiya Speaks app (Emergent build).
 * Source: https://shadhiya-trainer.preview.static.emergentagent.com/
 *   (assets/index-DBtZRkkC.js, prettified). Extracted 2026-10-25.
 * Use this to port copy, structure and Tailwind classes. It is NOT part of the
 * build. Library code has been removed; only app code remains.
 *
 * Minified-name legend
 *   z.jsx / z.jsxs   React JSX runtime         R            React
 *   Nl               cn() (clsx + tailwind-merge)
 *   Fl               <Button> (variants in section 1)       ri  <Link>   ii  <NavLink>
 *   $                <Reveal> fade/slide-in on view          GT  <AnimatedHeading lines=[...]>
 *   KT               <Marquee items=[...]> (credentials strip)
 *   WT               motion (framer-motion)                  Fi  Lenis
 *   Zi               toast (sonner)                          ut  useMutation   lt  useQuery
 *   EE               <Input>     DE <Label>     IE <Textarea>     ME <ChoicePills>
 *   Mp/Fp/Ip/Lp      Sheet / SheetContent / SheetHeader / SheetTitle (mobile menu)
 *   zE,BE,VE,HE,UE,WE  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
 *   Bp(text)         WhatsApp deep link   Vp default WhatsApp message
 *   Rp WhatsApp number   zp email   Hp header nav   Up socials   $p/em footer links
 *   Wp,Gp,Kp,qp      Unsplash image URLs
 *   Jp credentials marquee items   Yp testimonials   Xp FAQs
 *   jE(path, body)   POST /api{path}
 *   Pages: YT Home, QT About, rE IELTS, aE Spoken English, cE 1-to-1, NE Free
 *          Assessment, PE Testimonials, FE FAQ, RE Contact, YE Admin, XE App shell,
 *          Zp Header, tm Footer, nm Floating WhatsApp button
 *
 * Brand icons (@icons-pack/react-simple-icons style: title/color/size props):
 *   H    CodeSandbox
 *   po   Dribbble
 *   ho   Facebook
 *   _o   Figma
 *   yo   Framer
 *   xo   GitHub
 *   Co   GitLab
 *   Do   Instagram
 *   ko   TikTok
 *   jo   Trello
 *   No   Twitch
 *   Fo   WhatsApp
 *   Lo   X
 *   zo   YouTube
 *
 * lucide-react icons (minified var -> lucide name):
 *   Sa=arrow-right  Ca=award  wa=badge-check  Ta=book-open  Ea=brain  Da=briefcase
 *   Oa=calendar-clock  ka=circle-check  Aa=clipboard-check  ja=crosshair  Ma=flame  Na=graduation-cap
 *   Pa=handshake  Fa=highlighter  Ia=info  La=keyboard  Ra=loader-circle  za=log-out
 *   Ba=mail  Va=menu  Ha=messages-square  Ua=mic-vocal  Wa=mic  Ga=monitor-smartphone
 *   Ka=monitor  qa=octagon-x  Ja=plane  Ya=plus  Xa=quote  Za=refresh-cw
 *   Qa=rocket  $a=send  eo=sliders-horizontal  to=sparkles  no=target  ro=timer
 *   io=triangle-alert  ao=user-round  oo=users-round  so=users  co=video  lo=x
 *
 * Custom CSS from the original stylesheet:
 *   .marquee-track { animation: 38s linear infinite marquee }
 *   .marquee-track:hover { animation-play-state: paused }
 *   @keyframes marquee { 0% { transform: translate(0) } to { transform: translate(-50%) } }
 *   ::selection { color: #121915; background: #c59b27 }
 *   :root { --background:#faf7f2; --foreground:#141716; --card:#fff; --primary:#0f5132;
 *     --primary-foreground:#fff; --secondary:#f3ede2; --muted:#f3ede2; --muted-foreground:#525c58;
 *     --accent:#eae0d0; --accent-foreground:#2c3e35; --destructive:#991b1b; --border:#e5ded4;
 *     --input:#ddd4c5; --ring:#0f5132; --radius:.75rem }
 */

// ===== 1. Button variants (Pl) and Button (Fl) =====
var Pl = sc(
  `group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/80`,
        outline: `border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground`,
        ghost: `hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50`,
        destructive: `bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40`,
        link: `text-primary underline-offset-4 hover:underline`,
      },
      size: {
        default: `h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,
        xs: `h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3`,
        sm: `h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5`,
        lg: `h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2`,
        icon: `size-8`,
        "icon-xs": `size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3`,
        "icon-sm": `size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg`,
        "icon-lg": `size-9`,
      },
    },
    defaultVariants: { variant: `default`, size: `default` },
  },
);
function Fl({
  className: e,
  variant: t = `default`,
  size: n = `default`,
  nativeButton: r,
  render: i,
  ...a
}) {
  return (0, z.jsx)(nc, {
    "data-slot": `button`,
    render: i,
    nativeButton:
      r ?? (i == null || ((0, R.isValidElement)(i) && i.type === `button`)),
    className: Nl(Pl({ variant: t, size: n, className: e })),
    ...a,
  });
}
var Il = R.createContext(!1),
  Ll = R.createContext(void 0);
function Rl(e) {
  let t = R.useContext(Ll);
  if (e === !1 && t === void 0) throw Error(ks(27));
  return t;
}
var K = (function (e) {
    return (
      (e.startingStyle = `data-starting-style`),
      (e.endingStyle = `data-ending-style`),
      e
    );
  })({}),
  zl = { [K.startingStyle]: `` },
  q = { [K.endingStyle]: `` },
  J = {

// ===== 2. Site constants, Header (Zp), Footer (tm), Floating WhatsApp (nm) =====
var Rp = `971501234567`,
  zp = `hello@shadhiyaspeaks.com`,
  Bp = (e) => `https://wa.me/${Rp}?text=${encodeURIComponent(e)}`,
  Vp = `Hi Shadhiya! I'd like to know more about your IELTS & English training.`,
  Hp = [
    { to: `/`, label: `Home` },
    { to: `/about`, label: `About` },
    { to: `/ielts-preparation`, label: `IELTS Courses` },
    { to: `/spoken-english`, label: `Spoken English` },
    { to: `/one-to-one-coaching`, label: `1-to-1 Coaching` },
    { to: `/free-assessment`, label: `Free Assessment` },
    { to: `/contact`, label: `Contact` },
  ],
  Up = [
    { name: `Instagram`, href: `https://instagram.com/shadhiya.speaks` },
    { name: `YouTube`, href: `https://youtube.com/@shadhiyaspeaks` },
    { name: `Facebook`, href: `https://facebook.com/shadhiyaspeaks` },
    { name: `TikTok`, href: `https://tiktok.com/@shadhiya.speaks` },
  ],
  Wp = `https://images.unsplash.com/photo-1573496527892-904f897eb744?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxmZW1hbGUlMjBlZHVjYXRvciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85`,
  Gp = `https://images.unsplash.com/photo-1590650213165-c1fef80648c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBlZHVjYXRvciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85`,
  Kp = `https://images.unsplash.com/photo-1734009775179-07f428483783?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxhYnUlMjBkaGFiaSUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZSUyMGxhbmRtYXJrfGVufDB8fHx8MTc5MDE3ODQ0NHww&ixlib=rb-4.1.0&q=85`,
  qp = `https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHN0dWR5aW5nJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzkwMTc4NDQ0fDA&ixlib=rb-4.1.0&q=85`,
  Jp = [
    `TESOL UK Certified`,
    `5+ Years UAE IELTS Exam Supervision`,
    `8+ Years Academic Experience`,
    `Band 8.0 Achievers`,
    `Live 1-to-1 & Micro-Batch Classes`,
    `Computer-Based Test Simulation`,
    `Abu Dhabi University Supervision`,
  ],
  Yp = [
    {
      name: `Fathima R.`,
      course: `Academic IELTS`,
      challenge: `Stuck at Band 6.0 in Writing`,
      outcome: `Band 7.5 Overall`,
      quote: `Shadhiya's essay corrections were surgical. She showed me exactly why my Task 2 was capped at 6.0 — three months later I walked out with a 7.5 overall.`,
    },
    {
      name: `Ahmed K.`,
      course: `General Training IELTS`,
      challenge: `Needed CLB 9 for Canada PR`,
      outcome: `L8.5 · R8.0 · W7.5 · S8.0`,
      quote: `The computer-based simulation was identical to my real test day. Nothing surprised me. I hit every score my PR application needed on the first attempt.`,
    },
    {
      name: `Sneha M.`,
      course: `Spoken English`,
      challenge: `Froze in office meetings`,
      outcome: `Now leads client calls`,
      quote: `I understood English perfectly but couldn't speak. The natural-thinking exercises stopped me translating in my head — I presented to our Dubai office last week.`,
    },
    {
      name: `Jaseem P.`,
      course: `1-to-1 Coaching`,
      challenge: `Speaking stuck at 5.5`,
      outcome: `Speaking 7.0 in 6 weeks`,
      quote: `Every session attacked my exact weaknesses — fillers, pacing, topic development. The mock interviews felt harder than the real exam. Six weeks, 5.5 to 7.0.`,
    },
    {
      name: `Mariam S.`,
      course: `Academic IELTS`,
      challenge: `6.5 overall, needed 7.5+ for university`,
      outcome: `Band 8.0 Overall`,
      quote: `Her reading strategies alone took me from 6.5 to 8.5. She supervised real IELTS exams in the UAE — she knows exactly what examiners look for.`,
    },
    {
      name: `Deepak V.`,
      course: `Spoken English`,
      challenge: `Failed two job interviews`,
      outcome: `Hired in Dubai`,
      quote: `We rehearsed interview answers until they sounded natural, not memorised. I cleared my third interview and relocated to Dubai two months later.`,
    },
  ],
  Xp = [
    {
      question: `Do you offer Academic and General IELTS preparation?`,
      answer: `Yes, we provide structured preparation for both Academic and General Training modules — with separate strategies, materials, and mock tests for each track.`,
    },
    {
      question: `Are classes conducted online or in person?`,
      answer: `Currently, all classes are conducted live online, so you can join from anywhere. In-person classes in Al Ain are planned for the future.`,
    },
    {
      question: `Do you offer individual 1-to-1 classes?`,
      answer: `Yes, personalized 1-to-1 coaching is available for both IELTS and Spoken English — built entirely around your schedule, level, and target score.`,
    },
    {
      question: `Do you provide Writing corrections and Speaking feedback?`,
      answer: `Yes. Every student receives personalized evaluations: detailed written essay feedback with band descriptors, plus live speaking practice with real-time correction.`,
    },
    {
      question: `Is computer-based IELTS practice included?`,
      answer: `Yes. We include familiarization and timed practice tailored to the computer-based test layout — on-screen reading, digital listening navigation, and typing practice for Writing.`,
    },
    {
      question: `How do I choose the right course?`,
      answer: `Simply book a free assessment on our website. We will evaluate your current level, identify your gaps, and recommend the study path that reaches your goal fastest.`,
    },
  ];
function Zp() {
  let [e, t] = (0, R.useState)(!1);
  return (0, z.jsxs)(`header`, {
    className: `fixed inset-x-0 top-0 z-50 border-b border-obsidian/10 bg-cream/85 backdrop-blur-xl`,
    children: [
      (0, z.jsxs)(`div`, {
        className: `mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8`,
        children: [
          (0, z.jsxs)(ri, {
            to: `/`,
            "data-testid": `nav-brand-link`,
            className: `flex items-baseline gap-1.5`,
            children: [
              (0, z.jsx)(`span`, {
                className: `font-mono text-xs font-semibold uppercase tracking-[0.28em] text-obsidian`,
                children: `Shadhiya`,
              }),
              (0, z.jsx)(`span`, {
                className: `font-heading text-2xl italic text-emerald`,
                children: `Speaks`,
              }),
            ],
          }),
          (0, z.jsx)(`nav`, {
            className: `hidden items-center gap-6 xl:flex`,
            "data-testid": `nav-desktop-menu`,
            children: Hp.map((e) =>
              (0, z.jsx)(
                ii,
                {
                  to: e.to,
                  "data-testid": `nav-${e.label.toLowerCase().replace(/[^a-z0-9]+/g, `-`)}-link`,
                  className: ({ isActive: e }) =>
                    Nl(
                      `text-sm font-medium transition-colors hover:text-emerald`,
                      e
                        ? `text-emerald underline underline-offset-8 decoration-gold decoration-2`
                        : `text-obsidian/75`,
                    ),
                  children: e.label,
                },
                e.to,
              ),
            ),
          }),
          (0, z.jsxs)(`div`, {
            className: `hidden items-center gap-3 xl:flex`,
            children: [
              (0, z.jsx)(`a`, {
                href: Bp(Vp),
                target: `_blank`,
                rel: `noreferrer`,
                "data-testid": `nav-whatsapp-btn`,
                className: `flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 text-emerald transition-colors hover:border-emerald hover:bg-emerald hover:text-white`,
                children: (0, z.jsx)(Fo, { size: 17 }),
              }),
              (0, z.jsx)(Fl, {
                render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                "data-testid": `nav-assessment-cta`,
                children: `Book Free Assessment`,
              }),
            ],
          }),
          (0, z.jsx)(`button`, {
            type: `button`,
            "data-testid": `nav-mobile-menu-btn`,
            onClick: () => t(!0),
            className: `flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 xl:hidden`,
            "aria-label": `Open menu`,
            children: (0, z.jsx)(Va, { className: `h-5 w-5` }),
          }),
        ],
      }),
      (0, z.jsx)(Mp, {
        open: e,
        onOpenChange: t,
        children: (0, z.jsxs)(Fp, {
          side: `right`,
          className: `bg-cream`,
          "data-testid": `nav-mobile-sheet`,
          children: [
            (0, z.jsx)(Ip, {
              children: (0, z.jsxs)(Lp, {
                className: `flex items-baseline gap-1.5`,
                children: [
                  (0, z.jsx)(`span`, {
                    className: `font-mono text-xs font-semibold uppercase tracking-[0.28em]`,
                    children: `Shadhiya`,
                  }),
                  (0, z.jsx)(`span`, {
                    className: `font-heading text-xl italic text-emerald`,
                    children: `Speaks`,
                  }),
                ],
              }),
            }),
            (0, z.jsxs)(`nav`, {
              className: `mt-6 flex flex-col gap-1 px-2`,
              children: [
                Hp.map((e) =>
                  (0, z.jsx)(
                    ii,
                    {
                      to: e.to,
                      onClick: () => t(!1),
                      "data-testid": `nav-mobile-${e.label.toLowerCase().replace(/[^a-z0-9]+/g, `-`)}-link`,
                      className: ({ isActive: e }) =>
                        Nl(
                          `rounded-lg px-3 py-3 font-heading text-2xl transition-colors`,
                          e ? `text-emerald` : `text-obsidian/80 hover:bg-sand`,
                        ),
                      children: e.label,
                    },
                    e.to,
                  ),
                ),
                (0, z.jsx)(`div`, {
                  className: `mt-6 px-3`,
                  children: (0, z.jsx)(Fl, {
                    render: (0, z.jsx)(ri, {
                      to: `/free-assessment`,
                      onClick: () => t(!1),
                    }),
                    className: `w-full`,
                    "data-testid": `nav-mobile-assessment-cta`,
                    children: `Book Free Assessment`,
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
var Qp = { Instagram: Do, YouTube: zo, Facebook: ho, TikTok: ko },
  $p = [
    { to: `/`, label: `Home` },
    { to: `/about`, label: `About` },
    { to: `/testimonials`, label: `Testimonials` },
    { to: `/free-assessment`, label: `Free Assessment` },
    { to: `/faq`, label: `FAQ & Contact` },
  ],
  em = [
    { to: `/ielts-preparation`, label: `Academic IELTS` },
    { to: `/ielts-preparation`, label: `General IELTS` },
    { to: `/spoken-english`, label: `Spoken English` },
    { to: `/one-to-one-coaching`, label: `1-to-1 Coaching` },
    { to: `/ielts-preparation`, label: `Computer-Based Practice` },
  ];
function tm() {
  return (0, z.jsx)(`footer`, {
    className: `bg-obsidian text-[#FDFCFA]`,
    "data-testid": `site-footer`,
    children: (0, z.jsxs)(`div`, {
      className: `mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8`,
      children: [
        (0, z.jsxs)(`div`, {
          className: `grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4`,
          children: [
            (0, z.jsxs)(`div`, {
              children: [
                (0, z.jsxs)(`div`, {
                  className: `flex items-baseline gap-1.5`,
                  children: [
                    (0, z.jsx)(`span`, {
                      className: `font-mono text-xs font-semibold uppercase tracking-[0.28em]`,
                      children: `Shadhiya`,
                    }),
                    (0, z.jsx)(`span`, {
                      className: `font-heading text-2xl italic text-gold-light`,
                      children: `Speaks`,
                    }),
                  ],
                }),
                (0, z.jsx)(`p`, {
                  className: `mt-3 font-heading text-lg italic text-[#A2B3AB]`,
                  children: `IELTS • English • Confidence`,
                }),
                (0, z.jsx)(`p`, {
                  className: `mt-2 text-sm leading-relaxed text-[#A2B3AB]`,
                  children: `Online IELTS & English training for ambitious learners in the UAE and beyond.`,
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                  children: `Quick Links`,
                }),
                (0, z.jsx)(`ul`, {
                  className: `mt-4 space-y-2.5`,
                  children: $p.map((e) =>
                    (0, z.jsx)(
                      `li`,
                      {
                        children: (0, z.jsx)(ri, {
                          to: e.to,
                          className: `text-sm text-[#A2B3AB] transition-colors hover:text-gold-light`,
                          "data-testid": `footer-${e.label.toLowerCase().replace(/[^a-z0-9]+/g, `-`)}-link`,
                          children: e.label,
                        }),
                      },
                      e.label,
                    ),
                  ),
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                  children: `Services`,
                }),
                (0, z.jsx)(`ul`, {
                  className: `mt-4 space-y-2.5`,
                  children: em.map((e) =>
                    (0, z.jsx)(
                      `li`,
                      {
                        children: (0, z.jsx)(ri, {
                          to: e.to,
                          className: `text-sm text-[#A2B3AB] transition-colors hover:text-gold-light`,
                          "data-testid": `footer-service-${e.label.toLowerCase().replace(/[^a-z0-9]+/g, `-`)}-link`,
                          children: e.label,
                        }),
                      },
                      e.label,
                    ),
                  ),
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                  children: `Connect`,
                }),
                (0, z.jsxs)(`div`, {
                  className: `mt-4 flex items-center gap-3`,
                  children: [
                    (0, z.jsx)(`a`, {
                      href: Bp(Vp),
                      target: `_blank`,
                      rel: `noreferrer`,
                      "data-testid": `footer-whatsapp-link`,
                      "aria-label": `WhatsApp`,
                      className: `flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold-light hover:text-gold-light`,
                      children: (0, z.jsx)(Fo, { size: 16 }),
                    }),
                    Up.map((e) => {
                      let t = Qp[e.name];
                      return (0, z.jsx)(
                        `a`,
                        {
                          href: e.href,
                          target: `_blank`,
                          rel: `noreferrer`,
                          "aria-label": e.name,
                          "data-testid": `footer-social-${e.name.toLowerCase()}-link`,
                          className: `flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold-light hover:text-gold-light`,
                          children: (0, z.jsx)(t, { size: 16 }),
                        },
                        e.name,
                      );
                    }),
                  ],
                }),
                (0, z.jsx)(`a`, {
                  href: `mailto:${zp}`,
                  className: `mt-4 block text-sm text-[#A2B3AB] transition-colors hover:text-gold-light`,
                  "data-testid": `footer-email-link`,
                  children: zp,
                }),
              ],
            }),
          ],
        }),
        (0, z.jsxs)(`div`, {
          className: `mt-14 border-t border-white/10 pt-8`,
          children: [
            (0, z.jsx)(`p`, {
              className: `mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#A2B3AB]/80`,
              children: `Shadhiya Speaks provides independent language training and test preparation. IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia. Shadhiya Speaks is not an official test center or partner. Score improvements depend on individual effort and consistency.`,
            }),
            (0, z.jsxs)(`div`, {
              className: `mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[#A2B3AB] sm:flex-row`,
              children: [
                (0, z.jsx)(`p`, {
                  children: `© 2026 Shadhiya Speaks. All Rights Reserved.`,
                }),
                (0, z.jsxs)(`p`, {
                  className: `flex gap-4`,
                  children: [
                    (0, z.jsx)(`span`, {
                      className: `cursor-pointer transition-colors hover:text-gold-light`,
                      children: `Privacy Policy`,
                    }),
                    (0, z.jsx)(`span`, {
                      className: `text-white/20`,
                      children: `|`,
                    }),
                    (0, z.jsx)(`span`, {
                      className: `cursor-pointer transition-colors hover:text-gold-light`,
                      children: `Terms of Service`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function nm() {
  return (0, z.jsxs)(`a`, {
    href: Bp(Vp),
    target: `_blank`,
    rel: `noreferrer`,
    "data-testid": `whatsapp-floating-cta`,
    "aria-label": `Chat on WhatsApp`,
    className: `group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-xl shadow-emerald/30 transition-transform duration-300 hover:scale-110`,
    children: [
      (0, z.jsx)(`span`, {
        className: `absolute inset-0 animate-ping rounded-full bg-emerald/40 [animation-duration:2.5s]`,
      }),
      (0, z.jsx)(Fo, { size: 24, className: `relative` }),
    ],
  });
}

// ===== 3. Animation helpers, page data, pages, admin, app shell =====
function GT({ lines: e, className: t, lineClassName: n, delay: r = 0.1 }) {
  return (0, z.jsx)(`div`, {
    className: t,
    children: e.map((e, t) =>
      (0, z.jsx)(
        `div`,
        {
          className: `overflow-hidden py-0.5`,
          children: (0, z.jsx)(WT.div, {
            className: n,
            initial: { y: `110%` },
            animate: { y: `0%` },
            transition: {
              duration: 0.9,
              delay: r + t * 0.14,
              ease: [0.16, 1, 0.3, 1],
            },
            children: e,
          }),
        },
        t,
      ),
    ),
  });
}
function KT({ items: e }) {
  let t = (t) =>
    (0, z.jsx)(
      `div`,
      {
        className: `flex shrink-0 items-center`,
        "aria-hidden": t === `b`,
        children: e.map((e, t) =>
          (0, z.jsxs)(
            `span`,
            {
              className: `flex items-center`,
              children: [
                (0, z.jsx)(`span`, {
                  className: `px-6 font-mono text-xs uppercase tracking-[0.22em] text-obsidian/70 sm:text-sm`,
                  children: e,
                }),
                (0, z.jsx)(`span`, { className: `text-gold`, children: `◆` }),
              ],
            },
            t,
          ),
        ),
      },
      t,
    );
  return (0, z.jsx)(`div`, {
    "data-testid": `credentials-marquee`,
    className: `overflow-hidden border-y border-obsidian/10 bg-sand/70 py-4`,
    children: (0, z.jsxs)(`div`, {
      className: `marquee-track flex w-max`,
      children: [t(`a`), t(`b`)],
    }),
  });
}
function $({ children: e, delay: t = 0, className: n }) {
  return (0, z.jsx)(WT.div, {
    className: n,
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: !0, margin: `-60px` },
    transition: { duration: 0.7, delay: t, ease: [0.16, 1, 0.3, 1] },
    children: e,
  });
}
var qT = [
    {
      n: `01`,
      icon: Na,
      title: `IELTS Preparation`,
      pitch: `Complete module coverage (Academic & GT) with computer-based test simulation and feedback.`,
      cta: `Explore IELTS`,
      to: `/ielts-preparation`,
      span: `lg:col-span-7`,
    },
    {
      n: `02`,
      icon: Ha,
      title: `Spoken English`,
      pitch: `Practical training to eliminate hesitation and speak naturally in social & work environments.`,
      cta: `Explore Spoken English`,
      to: `/spoken-english`,
      span: `lg:col-span-5`,
    },
    {
      n: `03`,
      icon: ao,
      title: `1-to-1 Coaching`,
      pitch: `Bespoke private sessions focused strictly on your specific weaknesses and targets.`,
      cta: `Book Private Session`,
      to: `/one-to-one-coaching`,
      span: `lg:col-span-5`,
    },
    {
      n: `04`,
      icon: Ma,
      title: `Confidence Training`,
      pitch: `Integrated speaking practice designed to convert passive knowledge into active fluency.`,
      cta: `Learn More`,
      to: `/spoken-english`,
      span: `lg:col-span-7`,
    },
  ],
  JT = [
    {
      n: `01`,
      icon: wa,
      title: `Supervision Insight`,
      text: `Real experience inside UAE IELTS exam environments — five years of supervision at Abu Dhabi University means you train with someone who has watched thousands of real test days unfold.`,
    },
    {
      n: `02`,
      icon: Ca,
      title: `Targeted Feedback`,
      text: `Detailed essay corrections mapped to band descriptors and real-time speaking evaluation — you always know exactly what is holding your score back and how to fix it.`,
    },
    {
      n: `03`,
      icon: so,
      title: `Small-Group Focus`,
      text: `Micro-batches ensure every learner gets active speaking time in every session. You will never sit silently at the back of a crowded class.`,
    },
  ];
function YT() {
  let e = (0, R.useRef)(null),
    { scrollYProgress: t } = LT({
      target: e,
      offset: [`start start`, `end start`],
    }),
    n = VT(t, [0, 1], [0, 90]);
  return (0, z.jsxs)(`div`, {
    "data-testid": `home-page`,
    children: [
      (0, z.jsxs)(`section`, {
        ref: e,
        className: `relative overflow-hidden`,
        children: [
          (0, z.jsx)(`div`, {
            className: `pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-gold/15 blur-3xl`,
          }),
          (0, z.jsxs)(`div`, {
            className: `mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24`,
            children: [
              (0, z.jsxs)(`div`, {
                className: `lg:col-span-7`,
                children: [
                  (0, z.jsx)($, {
                    children: (0, z.jsxs)(`p`, {
                      className: `inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald`,
                      "data-testid": `hero-eyebrow`,
                      children: [
                        (0, z.jsx)(`span`, {
                          className: `h-1.5 w-1.5 rounded-full bg-gold`,
                        }),
                        `TESOL UK Certified · UAE`,
                      ],
                    }),
                  }),
                  (0, z.jsx)(GT, {
                    className: `mt-6 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
                    lines: [
                      (0, z.jsx)(z.Fragment, {
                        children: `Speak English with Confidence.`,
                      }),
                      (0, z.jsxs)(z.Fragment, {
                        children: [
                          `Prepare for IELTS with `,
                          (0, z.jsx)(`span`, {
                            className: `italic text-emerald`,
                            children: `Purpose.`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, z.jsx)($, {
                    delay: 0.5,
                    children: (0, z.jsx)(`p`, {
                      className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                      "data-testid": `hero-subheadline`,
                      children: `Personalised online IELTS and English training designed to elevate your communication and achieve your band score goals.`,
                    }),
                  }),
                  (0, z.jsx)($, {
                    delay: 0.65,
                    children: (0, z.jsxs)(`div`, {
                      className: `mt-8 flex flex-wrap items-center gap-4`,
                      children: [
                        (0, z.jsxs)(Fl, {
                          render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                          size: `lg`,
                          "data-testid": `hero-book-assessment-btn`,
                          children: [
                            `Book a Free Assessment`,
                            (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                          ],
                        }),
                        (0, z.jsxs)(`a`, {
                          href: Bp(Vp),
                          target: `_blank`,
                          rel: `noreferrer`,
                          "data-testid": `hero-whatsapp-btn`,
                          className: Nl(
                            Pl({ variant: `outline`, size: `lg` }),
                            `gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white`,
                          ),
                          children: [
                            (0, z.jsx)(Fo, { size: 16 }),
                            `Chat on WhatsApp`,
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, z.jsx)($, {
                    delay: 0.8,
                    children: (0, z.jsxs)(`div`, {
                      className: `mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted`,
                      children: [
                        (0, z.jsxs)(`span`, {
                          children: [
                            (0, z.jsx)(`strong`, {
                              className: `font-heading text-xl text-obsidian`,
                              children: `500+`,
                            }),
                            ` learners trained`,
                          ],
                        }),
                        (0, z.jsxs)(`span`, {
                          children: [
                            (0, z.jsx)(`strong`, {
                              className: `font-heading text-xl text-obsidian`,
                              children: `96%`,
                            }),
                            ` hit target band`,
                          ],
                        }),
                        (0, z.jsxs)(`span`, {
                          children: [
                            (0, z.jsx)(`strong`, {
                              className: `font-heading text-xl text-obsidian`,
                              children: `+1.5`,
                            }),
                            ` avg. band jump`,
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, z.jsxs)(`div`, {
                className: `relative lg:col-span-5`,
                children: [
                  (0, z.jsxs)(WT.div, {
                    style: { y: n },
                    className: `relative`,
                    children: [
                      (0, z.jsx)(`div`, {
                        className: `absolute -inset-3 rounded-[2.2rem] border border-gold/50`,
                      }),
                      (0, z.jsx)(`img`, {
                        src: Wp,
                        alt: `Shadhiya Shekkeer — TESOL UK Certified IELTS & English Trainer`,
                        "data-testid": `hero-trainer-photo`,
                        className: `aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20`,
                      }),
                      (0, z.jsx)(`div`, {
                        className: `absolute inset-0 rounded-[2rem] bg-gradient-to-t from-obsidian/45 via-transparent to-transparent`,
                      }),
                      (0, z.jsxs)(`div`, {
                        className: `absolute bottom-5 left-5 right-5 text-white`,
                        children: [
                          (0, z.jsx)(`p`, {
                            className: `font-heading text-xl italic`,
                            children: `Shadhiya Shekkeer`,
                          }),
                          (0, z.jsx)(`p`, {
                            className: `font-mono text-xs uppercase tracking-[0.2em] text-white/80`,
                            children: `English Trainer & IELTS Specialist`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, z.jsxs)(`div`, {
                    className: `float-slow absolute -left-4 top-8 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-8`,
                    "data-testid": `hero-band-badge`,
                    children: [
                      (0, z.jsx)(`p`, {
                        className: `font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted`,
                        children: `Latest result`,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `font-heading text-2xl font-semibold text-emerald`,
                        children: `Band 8.0`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, z.jsx)(KT, { items: Jp }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28`,
        "data-testid": `services-section`,
        children: [
          (0, z.jsxs)($, {
            children: [
              (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `01 — Our Key Services`,
              }),
              (0, z.jsxs)(`h2`, {
                className: `mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                children: [
                  `Four paths. One goal: `,
                  (0, z.jsx)(`span`, {
                    className: `italic text-emerald`,
                    children: `your voice, heard.`,
                  }),
                ],
              }),
            ],
          }),
          (0, z.jsx)(`div`, {
            className: `mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8`,
            children: qT.map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.08,
                  className: e.span,
                  children: (0, z.jsxs)(ri, {
                    to: e.to,
                    "data-testid": `service-card-${e.title.toLowerCase().replace(/[^a-z0-9]+/g, `-`)}`,
                    className: `group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10`,
                    children: [
                      (0, z.jsxs)(`div`, {
                        children: [
                          (0, z.jsxs)(`div`, {
                            className: `flex items-center justify-between`,
                            children: [
                              (0, z.jsx)(e.icon, {
                                className: `h-7 w-7 text-emerald`,
                              }),
                              (0, z.jsx)(`span`, {
                                className: `font-mono text-sm text-gold`,
                                children: e.n,
                              }),
                            ],
                          }),
                          (0, z.jsx)(`h3`, {
                            className: `mt-6 font-heading text-2xl font-semibold text-obsidian`,
                            children: e.title,
                          }),
                          (0, z.jsx)(`p`, {
                            className: `mt-3 leading-relaxed text-ink-muted`,
                            children: e.pitch,
                          }),
                        ],
                      }),
                      (0, z.jsxs)(`span`, {
                        className: `mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald`,
                        children: [
                          e.cta,
                          (0, z.jsx)(Sa, {
                            className: `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5`,
                          }),
                        ],
                      }),
                    ],
                  }),
                },
                e.n,
              ),
            ),
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `bg-obsidian py-20 text-[#FDFCFA] lg:py-28`,
        "data-testid": `why-section`,
        children: (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,
          children: [
            (0, z.jsxs)($, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                  children: `02 — The Manifesto`,
                }),
                (0, z.jsxs)(`h2`, {
                  className: `mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl`,
                  children: [
                    `Why train with `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-gold-light`,
                      children: `Shadhiya?`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)(`div`, {
              className: `mt-14 grid grid-cols-1 gap-10 md:grid-cols-3`,
              children: JT.map((e, t) =>
                (0, z.jsx)(
                  $,
                  {
                    delay: t * 0.1,
                    children: (0, z.jsxs)(`div`, {
                      className: `border-t border-white/15 pt-6`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `flex items-center justify-between`,
                          children: [
                            (0, z.jsx)(`span`, {
                              className: `font-heading text-5xl font-semibold text-gold-light/90`,
                              children: e.n,
                            }),
                            (0, z.jsx)(e.icon, {
                              className: `h-6 w-6 text-gold-light`,
                            }),
                          ],
                        }),
                        (0, z.jsx)(`h3`, {
                          className: `mt-5 font-heading text-xl font-semibold`,
                          children: e.title,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-3 text-sm leading-relaxed text-[#A2B3AB]`,
                          children: e.text,
                        }),
                      ],
                    }),
                  },
                  e.n,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28`,
        "data-testid": `testimonials-teaser`,
        children: [
          (0, z.jsxs)($, {
            children: [
              (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `03 — Success Stories`,
              }),
              (0, z.jsxs)(`h2`, {
                className: `mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                children: [
                  `Real learners. `,
                  (0, z.jsx)(`span`, {
                    className: `italic text-emerald`,
                    children: `Real progress.`,
                  }),
                ],
              }),
            ],
          }),
          (0, z.jsx)(`div`, {
            className: `mt-12 grid grid-cols-1 gap-6 md:grid-cols-3`,
            children: Yp.slice(0, 3).map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.08,
                  children: (0, z.jsxs)(`figure`, {
                    className: `flex h-full flex-col rounded-3xl border border-line bg-white p-8`,
                    children: [
                      (0, z.jsxs)(`blockquote`, {
                        className: `flex-1 font-heading text-lg italic leading-relaxed text-obsidian`,
                        children: [`“`, e.quote, `”`],
                      }),
                      (0, z.jsxs)(`figcaption`, {
                        className: `mt-6 border-t border-line pt-4`,
                        children: [
                          (0, z.jsx)(`p`, {
                            className: `font-medium text-obsidian`,
                            children: e.name,
                          }),
                          (0, z.jsx)(`p`, {
                            className: `text-sm text-ink-muted`,
                            children: e.course,
                          }),
                          (0, z.jsxs)(`p`, {
                            className: `mt-2 inline-block rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald`,
                            children: [e.challenge, ` → `, e.outcome],
                          }),
                        ],
                      }),
                    ],
                  }),
                },
                e.name,
              ),
            ),
          }),
          (0, z.jsx)($, {
            delay: 0.2,
            children: (0, z.jsxs)(ri, {
              to: `/testimonials`,
              "data-testid": `testimonials-read-all-link`,
              className: `mt-10 inline-flex items-center gap-2 font-medium text-emerald transition-colors hover:text-emerald-deep`,
              children: [
                `Read All Success Stories`,
                (0, z.jsx)(Sa, { className: `h-4 w-4` }),
              ],
            }),
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8`,
        children: (0, z.jsx)($, {
          children: (0, z.jsxs)(`div`, {
            className: `relative overflow-hidden rounded-[2.5rem] bg-obsidian px-8 py-16 text-center text-[#FDFCFA] sm:px-16 lg:py-20`,
            "data-testid": `conversion-banner`,
            children: [
              (0, z.jsx)(`div`, {
                className: `pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl`,
              }),
              (0, z.jsx)(`div`, {
                className: `pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald/40 blur-3xl`,
              }),
              (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                children: `Free Assessment`,
              }),
              (0, z.jsxs)(`h2`, {
                className: `mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl`,
                children: [
                  `Unsure of your current `,
                  (0, z.jsx)(`span`, {
                    className: `italic text-gold-light`,
                    children: `English level?`,
                  }),
                ],
              }),
              (0, z.jsx)(`p`, {
                className: `mx-auto mt-4 max-w-xl text-[#A2B3AB]`,
                children: `Take our quick online assessment to get personalized feedback and a recommended study path.`,
              }),
              (0, z.jsxs)(Fl, {
                render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                size: `lg`,
                className: `mt-8 bg-gold text-obsidian hover:bg-gold-light`,
                "data-testid": `banner-book-assessment-btn`,
                children: [
                  `Book Your Free Assessment Now`,
                  (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
var XT = [
    { icon: Ca, label: `Certifications`, value: `TESOL UK Certified Trainer` },
    { icon: Na, label: `Higher Education`, value: `MPhil · MBA · MCom · BBA` },
    {
      icon: Ta,
      label: `Academic Experience`,
      value: `8 Years in Higher Education Teaching`,
    },
    {
      icon: Aa,
      label: `IELTS Expertise`,
      value: `5 Years Training · 5 Years UAE Exam Supervision`,
    },
    {
      icon: Ga,
      label: `Delivery`,
      value: `Individual, small-group, online & offline`,
    },
  ],
  ZT = [`Learn`, `Practise`, `Speak`, `Improve`];
function QT() {
  return (0, z.jsxs)(`div`, {
    "data-testid": `about-page`,
    children: [
      (0, z.jsxs)(`section`, {
        className: `mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24`,
        children: [
          (0, z.jsx)(`div`, {
            className: `lg:col-span-5`,
            children: (0, z.jsx)($, {
              children: (0, z.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, z.jsx)(`div`, {
                    className: `absolute -inset-3 rounded-[2.2rem] border border-gold/50`,
                  }),
                  (0, z.jsx)(`img`, {
                    src: Gp,
                    alt: `Shadhiya Shekkeer conducting a personalized strategy session`,
                    "data-testid": `about-trainer-photo`,
                    className: `aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20`,
                  }),
                  (0, z.jsxs)(`div`, {
                    className: `absolute -bottom-6 -right-4 rounded-2xl bg-obsidian px-5 py-4 text-[#FDFCFA] shadow-xl sm:-right-8`,
                    children: [
                      (0, z.jsx)(`p`, {
                        className: `font-heading text-3xl font-semibold text-gold-light`,
                        children: `13+`,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `font-mono text-[10px] uppercase tracking-[0.2em] text-[#A2B3AB]`,
                        children: `Years in education`,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          (0, z.jsxs)(`div`, {
            className: `lg:col-span-7`,
            children: [
              (0, z.jsx)($, {
                children: (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `About`,
                }),
              }),
              (0, z.jsx)(GT, {
                className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl`,
                lines: [
                  (0, z.jsx)(z.Fragment, { children: `Meet Your Trainer:` }),
                  (0, z.jsx)(`span`, {
                    className: `italic text-emerald`,
                    children: `Shadhiya Shekkeer`,
                  }),
                ],
              }),
              (0, z.jsxs)($, {
                delay: 0.4,
                children: [
                  (0, z.jsx)(`p`, {
                    className: `mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted`,
                    children: `English Language Trainer & IELTS Specialist`,
                  }),
                  (0, z.jsx)(`p`, {
                    className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                    "data-testid": `about-bio`,
                    children: `Shadhiya combines academic rigour with practical coaching to help students navigate both IELTS exams and real-world English communication. Her methodology goes beyond test mechanics to build lasting speaking confidence — shaped by five years supervising real IELTS exams at Abu Dhabi University.`,
                  }),
                ],
              }),
              (0, z.jsx)($, {
                delay: 0.55,
                children: (0, z.jsxs)(Fl, {
                  render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                  size: `lg`,
                  className: `mt-8`,
                  "data-testid": `about-assessment-btn`,
                  children: [
                    `Book a Free Assessment`,
                    (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `bg-sand/70 py-20 lg:py-24`,
        "data-testid": `qualifications-section`,
        children: (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,
          children: [
            (0, z.jsxs)($, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `At a Glance`,
                }),
                (0, z.jsxs)(`h2`, {
                  className: `mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                  children: [
                    `Qualifications & `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-emerald`,
                      children: `Experience`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)(`div`, {
              className: `mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5`,
              children: XT.map((e, t) =>
                (0, z.jsx)(
                  $,
                  {
                    delay: t * 0.07,
                    children: (0, z.jsxs)(`div`, {
                      className: `flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-lg`,
                      children: [
                        (0, z.jsx)(e.icon, {
                          className: `h-6 w-6 text-emerald`,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted`,
                          children: e.label,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-2 font-heading text-lg font-medium leading-snug text-obsidian`,
                          children: e.value,
                        }),
                      ],
                    }),
                  },
                  e.label,
                ),
              ),
            }),
            (0, z.jsx)($, {
              delay: 0.2,
              children: (0, z.jsxs)(`div`, {
                className: `mt-10 flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line bg-white sm:flex-row`,
                children: [
                  (0, z.jsx)(`img`, {
                    src: Kp,
                    alt: `Abu Dhabi modern skyline`,
                    className: `h-44 w-full object-cover sm:h-auto sm:w-64`,
                    "data-testid": `about-abudhabi-photo`,
                  }),
                  (0, z.jsxs)(`div`, {
                    className: `p-6 sm:py-8`,
                    children: [
                      (0, z.jsx)(`p`, {
                        className: `font-mono text-[10px] uppercase tracking-[0.2em] text-gold`,
                        children: `UAE Exam Supervision`,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-2 font-heading text-xl font-medium text-obsidian`,
                        children: `Abu Dhabi University`,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted`,
                        children: `Five years supervising official IELTS exam sessions — seating plans, speaking schedules, examiner rubrics. Your preparation is built on what actually happens inside the test room.`,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28`,
        "data-testid": `philosophy-section`,
        children: [
          (0, z.jsx)($, {
            children: (0, z.jsx)(`p`, {
              className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
              children: `The Teaching Philosophy`,
            }),
          }),
          (0, z.jsx)(`div`, {
            className: `mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`,
            children: ZT.map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.1,
                  children: (0, z.jsxs)(`div`, {
                    className: `relative rounded-3xl border border-line bg-white p-8 text-center`,
                    children: [
                      (0, z.jsxs)(`span`, {
                        className: `font-heading text-5xl font-semibold text-sand-deep`,
                        children: [`0`, t + 1],
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-3 font-heading text-2xl font-semibold text-obsidian`,
                        children: e,
                      }),
                      t < ZT.length - 1 &&
                        (0, z.jsx)(Sa, {
                          className: `absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gold lg:block`,
                        }),
                    ],
                  }),
                },
                e,
              ),
            ),
          }),
          (0, z.jsx)($, {
            delay: 0.3,
            children: (0, z.jsxs)(`blockquote`, {
              className: `mx-auto mt-14 max-w-3xl text-center font-heading text-2xl italic leading-relaxed text-obsidian sm:text-3xl`,
              children: [
                `“True language capability comes from active production, constructive feedback, and continuous practice — `,
                (0, z.jsx)(`span`, {
                  className: `text-emerald`,
                  children: `not passive listening.`,
                }),
                `”`,
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function $T({ items: e, testidPrefix: t }) {
  let [n, r] = (0, R.useState)(0);
  return (0, z.jsx)(`div`, {
    className: `divide-y divide-line border-y border-line`,
    children: e.map((e, i) =>
      (0, z.jsxs)(
        `div`,
        {
          children: [
            (0, z.jsxs)(`button`, {
              type: `button`,
              "data-testid": `${t}-item-${i}`,
              onClick: () => r(n === i ? null : i),
              className: `flex w-full items-center justify-between gap-4 py-5 text-left`,
              children: [
                (0, z.jsx)(`span`, {
                  className: `font-heading text-lg font-medium text-obsidian sm:text-xl`,
                  children: e.question,
                }),
                (0, z.jsx)(Ya, {
                  className: Nl(
                    `h-5 w-5 shrink-0 text-emerald transition-transform duration-300`,
                    n === i && `rotate-45`,
                  ),
                }),
              ],
            }),
            (0, z.jsx)(ZS, {
              initial: !1,
              children:
                n === i &&
                (0, z.jsx)(WT.div, {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: `auto`, opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  className: `overflow-hidden`,
                  children: (0, z.jsx)(`p`, {
                    className: `pb-6 pr-10 text-base leading-relaxed text-ink-muted`,
                    children: e.answer,
                  }),
                }),
            }),
          ],
        },
        i,
      ),
    ),
  });
}
var eE = [
    {
      icon: Na,
      title: `Academic IELTS`,
      text: `Tailored for university admissions, academic registration, and professional licensing.`,
      tag: `For study & licensing`,
    },
    {
      icon: Ja,
      title: `General Training IELTS`,
      text: `Focused on work visas, migration requirements, and employment needs.`,
      tag: `For migration & work`,
    },
  ],
  tE = [
    {
      question: `Listening`,
      answer: `Question-type strategies for every format, note-taking techniques that capture answers the first time, and distraction-avoidance drills for the trickiest Part 3 & 4 recordings.`,
    },
    {
      question: `Reading`,
      answer: `Time management systems, skimming and scanning protocols, and keyword targeting — so you finish all three passages with minutes to spare instead of guessing the last ten.`,
    },
    {
      question: `Writing`,
      answer: `Task 1 & Task 2 structure frameworks, cohesion and coherence training, grammar precision work, and personalized essay marking mapped to the official band descriptors.`,
    },
    {
      question: `Speaking`,
      answer: `Mock interviews under real exam timing, topic development strategies, vocabulary expansion, and real-time pronunciation feedback from a trainer who supervised UAE exam sessions.`,
    },
  ],
  nE = [
    { label: `Format`, value: `Live Online (Interactive)` },
    {
      label: `Batch Size`,
      value: `Small-group micro-batches or 1-to-1 options`,
    },
    {
      label: `Includes`,
      value: `Practice materials, writing feedback, mock speaking tests, computer-based practice`,
    },
  ];
function rE() {
  return (0, z.jsxs)(`div`, {
    "data-testid": `ielts-page`,
    children: [
      (0, z.jsxs)(`section`, {
        className: `relative overflow-hidden`,
        children: [
          (0, z.jsx)(`div`, {
            className: `pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-3xl`,
          }),
          (0, z.jsxs)(`div`, {
            className: `mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24`,
            children: [
              (0, z.jsxs)(`div`, {
                className: `lg:col-span-7`,
                children: [
                  (0, z.jsx)($, {
                    children: (0, z.jsx)(`p`, {
                      className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                      children: `IELTS Preparation`,
                    }),
                  }),
                  (0, z.jsx)(GT, {
                    className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
                    lines: [
                      (0, z.jsx)(z.Fragment, {
                        children: `Structured IELTS Preparation`,
                      }),
                      (0, z.jsxs)(z.Fragment, {
                        children: [
                          `with `,
                          (0, z.jsx)(`span`, {
                            className: `italic text-emerald`,
                            children: `Proven Strategies`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, z.jsx)($, {
                    delay: 0.45,
                    children: (0, z.jsx)(`p`, {
                      className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                      children: `Academic & General Training modules covered through live practice, essay corrections, and full test simulations.`,
                    }),
                  }),
                  (0, z.jsx)($, {
                    delay: 0.6,
                    children: (0, z.jsxs)(`div`, {
                      className: `mt-8 flex flex-wrap gap-4`,
                      children: [
                        (0, z.jsxs)(Fl, {
                          render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                          size: `lg`,
                          "data-testid": `ielts-assessment-btn`,
                          children: [
                            `Book a Free IELTS Assessment`,
                            (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                          ],
                        }),
                        (0, z.jsxs)(`a`, {
                          href: Bp(
                            `Hi Shadhiya! I'd like to enquire about IELTS preparation.`,
                          ),
                          target: `_blank`,
                          rel: `noreferrer`,
                          "data-testid": `ielts-whatsapp-btn`,
                          className: Nl(
                            Pl({ variant: `outline`, size: `lg` }),
                            `gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white`,
                          ),
                          children: [
                            (0, z.jsx)(Fo, { size: 16 }),
                            `Enquire via WhatsApp`,
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, z.jsx)(`div`, {
                className: `lg:col-span-5`,
                children: (0, z.jsx)($, {
                  delay: 0.3,
                  children: (0, z.jsx)(`img`, {
                    src: qp,
                    alt: `Students collaborating in intensive IELTS preparation`,
                    "data-testid": `ielts-hero-photo`,
                    className: `aspect-[4/3] w-full rounded-[2rem] border border-line object-cover shadow-2xl shadow-obsidian/15`,
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8`,
        "data-testid": `tracks-section`,
        children: [
          (0, z.jsx)($, {
            children: (0, z.jsx)(`p`, {
              className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
              children: `01 — Programme Tracks`,
            }),
          }),
          (0, z.jsx)(`div`, {
            className: `mt-8 grid grid-cols-1 gap-6 md:grid-cols-2`,
            children: eE.map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.1,
                  children: (0, z.jsxs)(`div`, {
                    className: `group h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10`,
                    children: [
                      (0, z.jsxs)(`div`, {
                        className: `flex items-center justify-between`,
                        children: [
                          (0, z.jsx)(e.icon, {
                            className: `h-7 w-7 text-emerald`,
                          }),
                          (0, z.jsx)(`span`, {
                            className: `rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald`,
                            children: e.tag,
                          }),
                        ],
                      }),
                      (0, z.jsx)(`h3`, {
                        className: `mt-6 font-heading text-2xl font-semibold text-obsidian`,
                        children: e.title,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-3 leading-relaxed text-ink-muted`,
                        children: e.text,
                      }),
                    ],
                  }),
                },
                e.title,
              ),
            ),
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `bg-sand/70 py-20 lg:py-24`,
        "data-testid": `modules-section`,
        children: (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-4xl px-4 sm:px-6 lg:px-8`,
          children: [
            (0, z.jsxs)($, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `02 — Module Breakdown`,
                }),
                (0, z.jsxs)(`h2`, {
                  className: `mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                  children: [
                    `Every module. `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-emerald`,
                      children: `Mastered.`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)(`div`, {
              className: `mt-10`,
              children: (0, z.jsx)($T, {
                items: tE,
                testidPrefix: `ielts-module`,
              }),
            }),
          ],
        }),
      }),
      (0, z.jsx)(`section`, {
        className: `mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28`,
        "data-testid": `cbt-section`,
        children: (0, z.jsxs)(`div`, {
          className: `grid grid-cols-1 items-center gap-12 lg:grid-cols-12`,
          children: [
            (0, z.jsx)(`div`, {
              className: `lg:col-span-5`,
              children: (0, z.jsxs)($, {
                children: [
                  (0, z.jsx)(`p`, {
                    className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                    children: `03 — Special Feature`,
                  }),
                  (0, z.jsxs)(`h2`, {
                    className: `mt-3 font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                    children: [
                      `Computer-Based `,
                      (0, z.jsx)(`span`, {
                        className: `italic text-emerald`,
                        children: `Test Simulation`,
                      }),
                    ],
                  }),
                  (0, z.jsx)(`ul`, {
                    className: `mt-6 space-y-4`,
                    children: [
                      {
                        icon: Ka,
                        text: `Direct familiarization with the computer-based test interface`,
                      },
                      {
                        icon: Fa,
                        text: `On-screen reading strategies and digital listening navigation`,
                      },
                      {
                        icon: La,
                        text: `Timed typing practice for Writing Task 1 & Task 2`,
                      },
                    ].map((e) =>
                      (0, z.jsxs)(
                        `li`,
                        {
                          className: `flex items-start gap-3 text-ink-muted`,
                          children: [
                            (0, z.jsx)(e.icon, {
                              className: `mt-0.5 h-5 w-5 shrink-0 text-emerald`,
                            }),
                            (0, z.jsx)(`span`, { children: e.text }),
                          ],
                        },
                        e.text,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, z.jsx)(`div`, {
              className: `lg:col-span-7`,
              children: (0, z.jsx)($, {
                delay: 0.15,
                children: (0, z.jsxs)(`div`, {
                  className: `overflow-hidden rounded-3xl border border-white/10 bg-obsidian shadow-2xl`,
                  "data-testid": `cbt-preview`,
                  children: [
                    (0, z.jsxs)(`div`, {
                      className: `flex items-center justify-between border-b border-white/10 px-6 py-4`,
                      children: [
                        (0, z.jsx)(`p`, {
                          className: `font-mono text-xs uppercase tracking-[0.2em] text-[#A2B3AB]`,
                          children: `IELTS CBT — Reading`,
                        }),
                        (0, z.jsxs)(`span`, {
                          className: `flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 font-mono text-xs text-gold-light`,
                          children: [
                            (0, z.jsx)(ro, { className: `h-3.5 w-3.5` }),
                            ` 00:59:32`,
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsxs)(`div`, {
                      className: `grid grid-cols-2 gap-6 p-6`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `space-y-3`,
                          children: [
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-full rounded bg-white/15`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-11/12 rounded bg-white/15`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-full rounded bg-gold/40`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-4/5 rounded bg-white/15`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-full rounded bg-white/15`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-2/3 rounded bg-white/15`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-full rounded bg-gold/40`,
                            }),
                            (0, z.jsx)(`div`, {
                              className: `h-2.5 w-5/6 rounded bg-white/15`,
                            }),
                          ],
                        }),
                        (0, z.jsx)(`div`, {
                          className: `space-y-3`,
                          children: [1, 2, 3].map((e) =>
                            (0, z.jsxs)(
                              `div`,
                              {
                                className: `rounded-xl border border-white/10 p-3`,
                                children: [
                                  (0, z.jsxs)(`p`, {
                                    className: `font-mono text-[10px] text-[#A2B3AB]`,
                                    children: [`Question `, e],
                                  }),
                                  (0, z.jsx)(`div`, {
                                    className: `mt-2 h-2 w-full rounded bg-white/15`,
                                  }),
                                  (0, z.jsxs)(`div`, {
                                    className: `mt-2 flex gap-2`,
                                    children: [
                                      (0, z.jsx)(`span`, {
                                        className: `h-5 w-8 rounded border border-emerald/60 bg-emerald/30`,
                                      }),
                                      (0, z.jsx)(`span`, {
                                        className: `h-5 w-8 rounded border border-white/15`,
                                      }),
                                      (0, z.jsx)(`span`, {
                                        className: `h-5 w-8 rounded border border-white/15`,
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, z.jsx)(`div`, {
                      className: `flex items-center gap-1.5 border-t border-white/10 px-6 py-3`,
                      children: Array.from({ length: 40 }).map((e, t) =>
                        (0, z.jsx)(
                          `span`,
                          {
                            className: Nl(
                              `h-1.5 flex-1 rounded-full`,
                              t < 12
                                ? `bg-emerald`
                                : t < 15
                                  ? `bg-gold`
                                  : `bg-white/15`,
                            ),
                          },
                          t,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
      (0, z.jsx)(`section`, {
        className: `mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8`,
        "data-testid": `course-details`,
        children: (0, z.jsx)($, {
          children: (0, z.jsxs)(`div`, {
            className: `rounded-[2.5rem] border border-line bg-white p-8 sm:p-12`,
            children: [
              (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `04 — Course Details`,
              }),
              (0, z.jsx)(`div`, {
                className: `mt-8 grid grid-cols-1 gap-8 md:grid-cols-3`,
                children: nE.map((e) =>
                  (0, z.jsxs)(
                    `div`,
                    {
                      className: `border-t-2 border-gold/60 pt-4`,
                      children: [
                        (0, z.jsx)(`p`, {
                          className: `font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted`,
                          children: e.label,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-2 font-heading text-lg font-medium leading-snug text-obsidian`,
                          children: e.value,
                        }),
                      ],
                    },
                    e.label,
                  ),
                ),
              }),
              (0, z.jsxs)(Fl, {
                render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                size: `lg`,
                className: `mt-10`,
                "data-testid": `details-assessment-btn`,
                children: [
                  `Book a Free IELTS Assessment`,
                  (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
var iE = [
  {
    icon: Ha,
    title: `Everyday Fluency`,
    text: `Real-life conversational practice and overcoming public hesitation — small talk, opinions, storytelling.`,
  },
  {
    icon: Da,
    title: `Workplace English`,
    text: `Professional etiquette, email articulation, and presentation skills for meetings, interviews, and clients.`,
  },
  {
    icon: Wa,
    title: `Pronunciation & Clarity`,
    text: `Accent reduction strategies and continuous speaking practice so you are understood the first time, every time.`,
  },
  {
    icon: Ea,
    title: `Natural Thinking`,
    text: `Exercises designed to stop internal translation from your native language and start thinking directly in English.`,
  },
];
function aE() {
  return (0, z.jsxs)(`div`, {
    "data-testid": `spoken-english-page`,
    children: [
      (0, z.jsxs)(`section`, {
        className: `relative overflow-hidden`,
        children: [
          (0, z.jsx)(`div`, {
            className: `pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-emerald/10 blur-3xl`,
          }),
          (0, z.jsxs)(`div`, {
            className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24`,
            children: [
              (0, z.jsx)($, {
                children: (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `Spoken English`,
                }),
              }),
              (0, z.jsx)(GT, {
                className: `mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
                lines: [
                  (0, z.jsx)(z.Fragment, {
                    children: `Speak English Clearly,`,
                  }),
                  (0, z.jsxs)(z.Fragment, {
                    children: [
                      `Naturally, and `,
                      (0, z.jsx)(`span`, {
                        className: `italic text-emerald`,
                        children: `Confidently`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, z.jsx)($, {
                delay: 0.45,
                children: (0, z.jsx)(`p`, {
                  className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                  children: `Overcome hesitation, expand your workplace vocabulary, and start thinking directly in English.`,
                }),
              }),
              (0, z.jsx)($, {
                delay: 0.6,
                children: (0, z.jsxs)(Fl, {
                  render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                  size: `lg`,
                  className: `mt-8`,
                  "data-testid": `spoken-start-journey-btn`,
                  children: [
                    `Start Your English Journey`,
                    (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8`,
        "data-testid": `focus-areas-section`,
        children: [
          (0, z.jsx)($, {
            children: (0, z.jsx)(`p`, {
              className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
              children: `01 — Core Focus Areas`,
            }),
          }),
          (0, z.jsx)(`div`, {
            className: `mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2`,
            children: iE.map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.08,
                  children: (0, z.jsxs)(`div`, {
                    className: `group h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10`,
                    children: [
                      (0, z.jsxs)(`div`, {
                        className: `flex items-center justify-between`,
                        children: [
                          (0, z.jsx)(e.icon, {
                            className: `h-7 w-7 text-emerald`,
                          }),
                          (0, z.jsxs)(`span`, {
                            className: `font-mono text-sm text-gold`,
                            children: [`0`, t + 1],
                          }),
                        ],
                      }),
                      (0, z.jsx)(`h3`, {
                        className: `mt-6 font-heading text-2xl font-semibold text-obsidian`,
                        children: e.title,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-3 leading-relaxed text-ink-muted`,
                        children: e.text,
                      }),
                    ],
                  }),
                },
                e.title,
              ),
            ),
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `bg-obsidian py-20 text-[#FDFCFA] lg:py-24`,
        "data-testid": `spoken-details-section`,
        children: (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,
          children: [
            (0, z.jsxs)($, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-gold-light`,
                  children: `02 — Course Details`,
                }),
                (0, z.jsxs)(`h2`, {
                  className: `mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl`,
                  children: [
                    `Built for adults who `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-gold-light`,
                      children: `need English to work.`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)(`div`, {
              className: `mt-12 grid grid-cols-1 gap-8 md:grid-cols-3`,
              children: [
                {
                  icon: co,
                  label: `Format`,
                  value: `Live Interactive Online Sessions`,
                },
                {
                  icon: oo,
                  label: `Who It's For`,
                  value: `Working professionals, job seekers & adult learners`,
                },
                {
                  icon: to,
                  label: `Outcome`,
                  value: `Natural fluency without hesitation or mental translation`,
                },
              ].map((e, t) =>
                (0, z.jsx)(
                  $,
                  {
                    delay: t * 0.1,
                    children: (0, z.jsxs)(`div`, {
                      className: `border-t border-white/15 pt-6`,
                      children: [
                        (0, z.jsx)(e.icon, {
                          className: `h-6 w-6 text-gold-light`,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A2B3AB]`,
                          children: e.label,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-2 font-heading text-xl font-medium leading-snug`,
                          children: e.value,
                        }),
                      ],
                    }),
                  },
                  e.label,
                ),
              ),
            }),
            (0, z.jsx)($, {
              delay: 0.25,
              children: (0, z.jsxs)(Fl, {
                render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                size: `lg`,
                className: `mt-12 bg-gold text-obsidian hover:bg-gold-light`,
                "data-testid": `spoken-details-cta-btn`,
                children: [
                  `Start Your English Journey`,
                  (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
var oE = [
    {
      icon: Qa,
      title: `Full IELTS Fast-Track`,
      text: `Complete Academic or General Training preparation on an accelerated, exam-focused timeline.`,
    },
    {
      icon: no,
      title: `Single-Module Coaching`,
      text: `Targeted work on one module only — Writing Only or Speaking Only are the most requested.`,
    },
    {
      icon: Pa,
      title: `Interview Preparation`,
      text: `Professional communication coaching for job interviews, visa interviews, and workplace presentations.`,
    },
    {
      icon: Ua,
      title: `Confidence Intensive`,
      text: `A public-speaking and confidence bootcamp to convert passive knowledge into active fluency.`,
    },
  ],
  sE = [
    {
      icon: ja,
      title: `Diagnose`,
      text: `A free assessment pinpoints your exact level and weaknesses.`,
    },
    {
      icon: eo,
      title: `Design`,
      text: `A bespoke plan is built around your schedule and target score.`,
    },
    {
      icon: Oa,
      title: `Deliver`,
      text: `Private live sessions with feedback after every single task.`,
    },
  ];
function cE() {
  return (0, z.jsxs)(`div`, {
    "data-testid": `one-to-one-page`,
    children: [
      (0, z.jsxs)(`section`, {
        className: `mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24`,
        children: [
          (0, z.jsxs)(`div`, {
            className: `lg:col-span-7`,
            children: [
              (0, z.jsx)($, {
                children: (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `1-to-1 Coaching`,
                }),
              }),
              (0, z.jsx)(GT, {
                className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
                lines: [
                  (0, z.jsx)(z.Fragment, { children: `Personalized 1-to-1` }),
                  (0, z.jsxs)(z.Fragment, {
                    children: [
                      `IELTS & English `,
                      (0, z.jsx)(`span`, {
                        className: `italic text-emerald`,
                        children: `Coaching`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, z.jsx)($, {
                delay: 0.45,
                children: (0, z.jsx)(`p`, {
                  className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                  children: `Bespoke online instruction tailored entirely to your schedule, skill level, and specific weaknesses.`,
                }),
              }),
              (0, z.jsx)($, {
                delay: 0.6,
                children: (0, z.jsxs)(`a`, {
                  href: Bp(
                    `Hi Shadhiya! I'd like to enquire about 1-to-1 coaching.`,
                  ),
                  target: `_blank`,
                  rel: `noreferrer`,
                  "data-testid": `coaching-enquire-btn`,
                  className: Nl(Pl({ size: `lg` }), `mt-8 gap-2`),
                  children: [
                    (0, z.jsx)(Fo, { size: 16 }),
                    `Enquire About 1-to-1 Coaching`,
                  ],
                }),
              }),
            ],
          }),
          (0, z.jsx)(`div`, {
            className: `lg:col-span-5`,
            children: (0, z.jsx)($, {
              delay: 0.3,
              children: (0, z.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, z.jsx)(`div`, {
                    className: `absolute -inset-3 rounded-[2.2rem] border border-gold/50`,
                  }),
                  (0, z.jsx)(`img`, {
                    src: Gp,
                    alt: `Shadhiya in a personalized coaching session`,
                    "data-testid": `coaching-hero-photo`,
                    className: `aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-obsidian/20`,
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      (0, z.jsx)(`section`, {
        className: `bg-sand/70 py-20 lg:py-24`,
        "data-testid": `pathways-section`,
        children: (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,
          children: [
            (0, z.jsxs)($, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `01 — Custom Coaching Pathways`,
                }),
                (0, z.jsxs)(`h2`, {
                  className: `mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl`,
                  children: [
                    `Your goal sets `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-emerald`,
                      children: `the syllabus.`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)(`div`, {
              className: `mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2`,
              children: oE.map((e, t) =>
                (0, z.jsx)(
                  $,
                  {
                    delay: t * 0.08,
                    children: (0, z.jsxs)(`div`, {
                      className: `h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `flex items-center justify-between`,
                          children: [
                            (0, z.jsx)(e.icon, {
                              className: `h-7 w-7 text-emerald`,
                            }),
                            (0, z.jsxs)(`span`, {
                              className: `font-mono text-sm text-gold`,
                              children: [`0`, t + 1],
                            }),
                          ],
                        }),
                        (0, z.jsx)(`h3`, {
                          className: `mt-6 font-heading text-2xl font-semibold text-obsidian`,
                          children: e.title,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `mt-3 leading-relaxed text-ink-muted`,
                          children: e.text,
                        }),
                      ],
                    }),
                  },
                  e.title,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, z.jsxs)(`section`, {
        className: `mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28`,
        "data-testid": `how-it-works-section`,
        children: [
          (0, z.jsx)($, {
            children: (0, z.jsx)(`p`, {
              className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
              children: `02 — How It Works`,
            }),
          }),
          (0, z.jsx)(`div`, {
            className: `mt-10 grid grid-cols-1 gap-6 md:grid-cols-3`,
            children: sE.map((e, t) =>
              (0, z.jsx)(
                $,
                {
                  delay: t * 0.1,
                  children: (0, z.jsxs)(`div`, {
                    className: `rounded-3xl border border-line bg-white p-8 text-center`,
                    children: [
                      (0, z.jsxs)(`span`, {
                        className: `font-heading text-5xl font-semibold text-sand-deep`,
                        children: [`0`, t + 1],
                      }),
                      (0, z.jsx)(e.icon, {
                        className: `mx-auto mt-4 h-6 w-6 text-emerald`,
                      }),
                      (0, z.jsx)(`h3`, {
                        className: `mt-3 font-heading text-2xl font-semibold text-obsidian`,
                        children: e.title,
                      }),
                      (0, z.jsx)(`p`, {
                        className: `mt-2 text-sm leading-relaxed text-ink-muted`,
                        children: e.text,
                      }),
                    ],
                  }),
                },
                e.title,
              ),
            ),
          }),
          (0, z.jsx)($, {
            delay: 0.3,
            children: (0, z.jsxs)(`div`, {
              className: `mt-14 flex flex-wrap items-center gap-4`,
              children: [
                (0, z.jsxs)(Fl, {
                  render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                  size: `lg`,
                  "data-testid": `coaching-assessment-btn`,
                  children: [
                    `Start with a Free Assessment`,
                    (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                  ],
                }),
                (0, z.jsxs)(`a`, {
                  href: Bp(
                    `Hi Shadhiya! I'd like to enquire about 1-to-1 coaching.`,
                  ),
                  target: `_blank`,
                  rel: `noreferrer`,
                  "data-testid": `coaching-whatsapp-btn`,
                  className: Nl(
                    Pl({ variant: `outline`, size: `lg` }),
                    `gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white`,
                  ),
                  children: [
                    (0, z.jsx)(Fo, { size: 16 }),
                    `Enquire via WhatsApp`,
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
var lE = (function (e) {
    return (
      (e.disabled = `data-disabled`),
      (e.valid = `data-valid`),
      (e.invalid = `data-invalid`),
      (e.touched = `data-touched`),
      (e.dirty = `data-dirty`),
      (e.filled = `data-filled`),
      (e.focused = `data-focused`),
      e
    );
  })({}),
  uE = {
    badInput: !1,
    customError: !1,
    patternMismatch: !1,
    rangeOverflow: !1,
    rangeUnderflow: !1,
    stepMismatch: !1,
    tooLong: !1,
    tooShort: !1,
    typeMismatch: !1,
    valid: null,
    valueMissing: !1,
  },
  dE = { valid: null, touched: !1, dirty: !1, filled: !1, focused: !1 },
  fE = { disabled: !1, ...dE },
  pE = {
    valid(e) {
      return e === null ? null : e ? { [lE.valid]: `` } : { [lE.invalid]: `` };
    },
  },
  mE = {
    invalid: void 0,
    name: void 0,
    validityData: {
      state: uE,
      errors: [],
      error: ``,
      value: ``,
      initialValue: null,
    },
    setValidityData: Gs,
    disabled: void 0,
    touched: dE.touched,
    setTouched: Gs,
    dirty: dE.dirty,
    setDirty: Gs,
    filled: dE.filled,
    setFilled: Gs,
    focused: dE.focused,
    setFocused: Gs,
    validate: () => null,
    validationMode: `onSubmit`,
    validationDebounceTime: 0,
    shouldValidateOnChange: () => !1,
    state: fE,
    markedDirtyRef: { current: !1 },
    registerFieldControl: Gs,
    validation: {
      getValidationProps: (e, t = Ks) => t,
      inputRef: { current: null },
      registerInput: Gs,
      commit: async () => {},
      change: Gs,
    },
  },
  hE = R.createContext(mE);
function gE(e = !0) {
  let t = R.useContext(hE);
  if (t.setValidityData === Gs && !e) throw Error(ks(28));
  return t;
}
var _E = R.createContext({
  formRef: { current: { fields: new Map() } },
  errors: {},
  clearErrors: Gs,
  validationMode: `onSubmit`,
  submitAttemptedRef: { current: !1 },
});
function vE() {
  return R.useContext(_E);
}
var yE = R.createContext({
  controlId: void 0,
  registerControlId: Gs,
  labelId: void 0,
  setLabelId: Gs,
  messageIds: [],
  setMessageIds: Gs,
  getDescriptionProps: (e) => e,
});
function bE() {
  return R.useContext(yE);
}
function xE(e = {}) {
  let { id: t, implicit: n = !1, controlRef: r } = e,
    { controlId: i, registerControlId: a } = bE(),
    o = ou(t),
    s = n ? i : void 0,
    c = as(() => Symbol(`labelable-control`)),
    l = R.useRef(!1),
    u = R.useRef(t != null),
    d = cs(() => {
      !l.current || a === Gs || ((l.current = !1), a(c.current, void 0));
    });
  return (
    ds(() => {
      if (a === Gs) return;
      let e;
      if (n) {
        let n = r?.current;
        e = Xo(n) && n.closest(`label`) != null ? (t ?? null) : (s ?? o);
      } else if (t != null) (u.current = !0), (e = t);
      else if (u.current) e = o;
      else {
        d();
        return;
      }
      if (e === void 0) {
        d();
        return;
      }
      (l.current = !0), a(c.current, e);
    }, [t, r, s, a, n, o, c, d]),
    R.useEffect(() => d, [d]),
    i ?? o
  );
}
function SE({ controlled: e, default: t, name: n, state: r = `value` }) {
  let { current: i } = R.useRef(e !== void 0),
    [a, o] = R.useState(t);
  return [
    i ? e : a,
    R.useCallback((e) => {
      i || o(e);
    }, []),
  ];
}
function CE(e, t, n, r, i = !0, a) {
  let { registerFieldControl: o } = gE(),
    s = R.useRef(null);
  (s.current ||= Symbol()),
    ds(() => {
      let c = s.current;
      if (!(!c || !i))
        return (
          o(c, { controlRef: e, getValue: r, id: t, name: a, value: n }),
          () => {
            o(c, void 0);
          }
        );
    }, [e, i, r, t, a, o, n]);
}
var wE = R.forwardRef(function (e, t) {
    let {
        render: n,
        className: r,
        id: i,
        name: a,
        value: o,
        disabled: s = !1,
        onValueChange: c,
        defaultValue: l,
        autoFocus: u = !1,
        style: d,
        ...f
      } = e,
      {
        state: p,
        name: m,
        disabled: h,
        setTouched: g,
        setDirty: _,
        validityData: v,
        setFocused: y,
        setFilled: b,
        validationMode: x,
        validation: S,
      } = gE(),
      { clearErrors: C } = vE(),
      w = h || s,
      T = m ?? a,
      E = { ...p, disabled: w },
      { labelId: ee } = bE(),
      D = xE({ id: i });
    ds(() => {
      let e = o != null;
      S.inputRef.current?.value || (e && o !== ``)
        ? b(!0)
        : e && o === `` && b(!1);
    }, [S.inputRef, b, o]);
    let O = R.useRef(null);
    ds(() => {
      u && O.current === Mu(qu(O.current)) && y(!0);
    }, [u, y]);
    let [k] = SE({
        controlled: o,
        default: l,
        name: `FieldControl`,
        state: `value`,
      }),
      A = o !== void 0,
      j = A ? k : void 0,
      te = cs(() => S.inputRef.current?.value);
    return (
      CE(S.inputRef, D, j, te, !w, a),
      Xs(`input`, e, {
        ref: [t, O],
        state: E,
        props: [
          {
            id: D,
            disabled: w,
            name: T,
            ref: S.inputRef,
            "aria-labelledby": ee,
            autoFocus: u,
            ...(A ? { value: j } : { defaultValue: l }),
            onChange(e) {
              let t = e.currentTarget.value;
              c?.(t, eu(ql, e.nativeEvent)),
                _(t !== v.initialValue),
                b(t !== ``),
                e.nativeEvent.defaultPrevented || (C(T), S.change(t));
            },
            onFocus() {
              y(!0);
            },
            onBlur(e) {
              g(!0), y(!1), x === `onBlur` && S.commit(e.currentTarget.value);
            },
            onKeyDown(e) {
              e.currentTarget.tagName === `INPUT` &&
                e.key === `Enter` &&
                (g(!0), S.commit(e.currentTarget.value));
            },
          },
          f,
          (e) => S.getValidationProps(w, e),
        ],
        stateAttributesMapping: pE,
      })
    );
  }),
  TE = R.forwardRef(function (e, t) {
    return (0, z.jsx)(wE, { ref: t, ...e });
  });
function EE({ className: e, type: t, ...n }) {
  return (0, z.jsx)(TE, {
    type: t,
    "data-slot": `input`,
    className: Nl(
      `h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
      e,
    ),
    ...n,
  });
}
function DE({ className: e, ...t }) {
  return (0, z.jsx)(`label`, {
    "data-slot": `label`,
    className: Nl(
      `flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
      e,
    ),
    ...t,
  });
}
var OE = `/api`,
  kE = class extends Error {
    status;
    body;
    constructor(e, t) {
      super(`request failed with ${e}`),
        (this.name = `ApiError`),
        (this.status = e),
        (this.body = t);
    }
  };
async function AE(e, t, n) {
  let r = await fetch(`${OE}${t}`, {
    method: e,
    headers: n === void 0 ? void 0 : { "Content-Type": `application/json` },
    body: n === void 0 ? void 0 : JSON.stringify(n),
  });
  if (!r.ok) {
    let e = await r.json().catch(() => null);
    throw new kE(r.status, e);
  }
  if (r.status !== 204) return await r.json();
}
var jE = (e, t) => AE(`POST`, e, t ?? null);
function ME({ options: e, value: t, onChange: n, testidPrefix: r }) {
  return (0, z.jsx)(`div`, {
    className: `flex flex-wrap gap-2`,
    children: e.map((e) =>
      (0, z.jsx)(
        `button`,
        {
          type: `button`,
          "data-testid": `${r}-${e.value}`,
          onClick: () => n(e.value),
          className: Nl(
            `rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200`,
            t === e.value
              ? `border-emerald bg-emerald text-white shadow-md shadow-emerald/20`
              : `border-line bg-white text-obsidian/75 hover:border-emerald/50 hover:text-emerald`,
          ),
          children: e.label,
        },
        e.value,
      ),
    ),
  });
}
function NE() {
  let [e, t] = (0, R.useState)(``),
    [n, r] = (0, R.useState)(``),
    [i, a] = (0, R.useState)(``),
    [o, s] = (0, R.useState)(`group`),
    [c, l] = (0, R.useState)(`academic`),
    [u, d] = (0, R.useState)(``),
    [f, p] = (0, R.useState)(``),
    [m, h] = (0, R.useState)(`writing`),
    [g, _] = (0, R.useState)(!1),
    v = ut({
      mutationFn: (e) => jE(`/assessments`, e),
      onSuccess: () => _(!0),
      onError: () =>
        Zi.error(
          `Could not submit — please try again or reach us on WhatsApp.`,
        ),
    }),
    y = (t) => {
      t.preventDefault(),
        v.mutate({
          full_name: e,
          whatsapp: n,
          email: i,
          class_format: o,
          program: c,
          target_band: u || void 0,
          test_date: f || void 0,
          difficulty: m,
        });
    },
    b = Bp(
      `Hi Shadhiya! I just booked my free assessment.\n\nName: ${e}\nProgram: ${c === `academic` ? `Academic IELTS` : c === `general` ? `General IELTS` : `Spoken English`}\nFormat: ${o === `group` ? `Small Group` : `1-to-1`}\nTarget: ${u || `Not sure yet`}\nTest date: ${f || `Not scheduled`}\nBiggest difficulty: ${m}`,
    );
  return (0, z.jsx)(`div`, {
    "data-testid": `free-assessment-page`,
    children: (0, z.jsxs)(`section`, {
      className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20`,
      children: [
        (0, z.jsxs)(`div`, {
          className: `mx-auto max-w-3xl text-center`,
          children: [
            (0, z.jsx)($, {
              children: (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `Free Assessment`,
              }),
            }),
            (0, z.jsx)(GT, {
              className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl`,
              lines: [
                (0, z.jsxs)(z.Fragment, {
                  children: [
                    `Book Your `,
                    (0, z.jsx)(`span`, {
                      className: `italic text-emerald`,
                      children: `Free Assessment`,
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsx)($, {
              delay: 0.35,
              children: (0, z.jsx)(`p`, {
                className: `mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                children: `Discover your current band level, identify language gaps, and receive a customized learning path.`,
              }),
            }),
          ],
        }),
        (0, z.jsx)($, {
          delay: 0.2,
          children: (0, z.jsx)(`div`, {
            className: `mx-auto mt-12 max-w-3xl rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-obsidian/5 sm:p-10`,
            children: g
              ? (0, z.jsxs)(`div`, {
                  className: `py-8 text-center`,
                  "data-testid": `assessment-success-panel`,
                  children: [
                    (0, z.jsx)(ka, {
                      className: `mx-auto h-14 w-14 text-emerald`,
                    }),
                    (0, z.jsx)(`h2`, {
                      className: `mt-5 font-heading text-3xl font-semibold text-obsidian`,
                      children: `You're booked in.`,
                    }),
                    (0, z.jsx)(`p`, {
                      className: `mx-auto mt-3 max-w-md text-ink-muted`,
                      children: `Your assessment request has been received. Tap below to send your summary to Shadhiya on WhatsApp and get the fastest response.`,
                    }),
                    (0, z.jsxs)(`a`, {
                      href: b,
                      target: `_blank`,
                      rel: `noreferrer`,
                      "data-testid": `assessment-whatsapp-send-btn`,
                      className: `mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 font-medium text-white transition-transform duration-300 hover:scale-105`,
                      children: [
                        (0, z.jsx)(Fo, { size: 18 }),
                        `Send to Shadhiya on WhatsApp`,
                      ],
                    }),
                  ],
                })
              : (0, z.jsxs)(`form`, {
                  onSubmit: y,
                  "data-testid": `assessment-form`,
                  className: `space-y-7`,
                  children: [
                    (0, z.jsxs)(`div`, {
                      className: `grid grid-cols-1 gap-6 sm:grid-cols-2`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              htmlFor: `full-name`,
                              children: `Full Name`,
                            }),
                            (0, z.jsx)(EE, {
                              id: `full-name`,
                              "data-testid": `assessment-name-input`,
                              required: !0,
                              value: e,
                              onChange: (e) => t(e.target.value),
                              placeholder: `Your full name`,
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              htmlFor: `whatsapp`,
                              children: `WhatsApp Number`,
                            }),
                            (0, z.jsx)(EE, {
                              id: `whatsapp`,
                              "data-testid": `assessment-whatsapp-input`,
                              required: !0,
                              value: n,
                              onChange: (e) => r(e.target.value),
                              placeholder: `+971 5X XXX XXXX`,
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              htmlFor: `email`,
                              children: `Email Address`,
                            }),
                            (0, z.jsx)(EE, {
                              id: `email`,
                              type: `email`,
                              "data-testid": `assessment-email-input`,
                              required: !0,
                              value: i,
                              onChange: (e) => a(e.target.value),
                              placeholder: `you@example.com`,
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              children: `Preferred Class Format`,
                            }),
                            (0, z.jsx)(ME, {
                              testidPrefix: `assessment-format`,
                              value: o,
                              onChange: s,
                              options: [
                                { value: `group`, label: `Small Group` },
                                { value: `one-to-one`, label: `1-to-1` },
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, z.jsx)(DE, { children: `Program Interest` }),
                        (0, z.jsx)(ME, {
                          testidPrefix: `assessment-program`,
                          value: c,
                          onChange: l,
                          options: [
                            { value: `academic`, label: `Academic IELTS` },
                            { value: `general`, label: `General IELTS` },
                            { value: `spoken`, label: `Spoken English` },
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsxs)(`div`, {
                      className: `grid grid-cols-1 gap-6 sm:grid-cols-2`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              htmlFor: `target-band`,
                              children: `Target Band Score / Goal`,
                            }),
                            (0, z.jsx)(EE, {
                              id: `target-band`,
                              "data-testid": `assessment-target-input`,
                              value: u,
                              onChange: (e) => d(e.target.value),
                              placeholder: `e.g. Band 7.5 / Fluent speech`,
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(DE, {
                              htmlFor: `test-date`,
                              children: `Planned Test Date`,
                            }),
                            (0, z.jsx)(EE, {
                              id: `test-date`,
                              type: `date`,
                              "data-testid": `assessment-date-input`,
                              value: f,
                              onChange: (e) => p(e.target.value),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, z.jsx)(DE, { children: `Primary Difficulty Area` }),
                        (0, z.jsx)(ME, {
                          testidPrefix: `assessment-difficulty`,
                          value: m,
                          onChange: h,
                          options: [
                            { value: `writing`, label: `Writing` },
                            { value: `speaking`, label: `Speaking` },
                            { value: `reading`, label: `Reading` },
                            { value: `listening`, label: `Listening` },
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsxs)(Fl, {
                      type: `submit`,
                      size: `lg`,
                      className: `w-full`,
                      disabled: v.isPending,
                      "data-testid": `assessment-submit-btn`,
                      children: [
                        v.isPending ? `Booking…` : `Book My Free Assessment`,
                        !v.isPending &&
                          (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                      ],
                    }),
                  ],
                }),
          }),
        }),
      ],
    }),
  });
}
function PE() {
  return (0, z.jsx)(`div`, {
    "data-testid": `testimonials-page`,
    children: (0, z.jsxs)(`section`, {
      className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20`,
      children: [
        (0, z.jsxs)(`div`, {
          className: `max-w-3xl`,
          children: [
            (0, z.jsx)($, {
              children: (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `Testimonials`,
              }),
            }),
            (0, z.jsx)(GT, {
              className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
              lines: [
                (0, z.jsx)(z.Fragment, { children: `Real Learners.` }),
                (0, z.jsx)(`span`, {
                  className: `italic text-emerald`,
                  children: `Real Progress.`,
                }),
              ],
            }),
            (0, z.jsx)($, {
              delay: 0.4,
              children: (0, z.jsx)(`p`, {
                className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                children: `Authentic stories, score improvements, and experiences from past students.`,
              }),
            }),
          ],
        }),
        (0, z.jsx)(`div`, {
          className: `mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`,
          "data-testid": `testimonials-grid`,
          children: Yp.map((e, t) =>
            (0, z.jsx)(
              $,
              {
                delay: (t % 3) * 0.08,
                children: (0, z.jsxs)(`figure`, {
                  className: `flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10`,
                  children: [
                    (0, z.jsx)(Xa, { className: `h-6 w-6 text-gold` }),
                    (0, z.jsxs)(`blockquote`, {
                      className: `mt-4 flex-1 font-heading text-lg italic leading-relaxed text-obsidian`,
                      children: [`“`, e.quote, `”`],
                    }),
                    (0, z.jsxs)(`figcaption`, {
                      className: `mt-6 border-t border-line pt-4`,
                      children: [
                        (0, z.jsx)(`p`, {
                          className: `font-medium text-obsidian`,
                          children: e.name,
                        }),
                        (0, z.jsx)(`p`, {
                          className: `text-sm text-ink-muted`,
                          children: e.course,
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `mt-3 flex flex-wrap items-center gap-2 text-xs`,
                          children: [
                            (0, z.jsx)(`span`, {
                              className: `rounded-full bg-sand px-3 py-1 font-mono text-ink-muted`,
                              children: e.challenge,
                            }),
                            (0, z.jsx)(Sa, {
                              className: `h-3.5 w-3.5 text-gold`,
                            }),
                            (0, z.jsx)(`span`, {
                              className: `rounded-full bg-emerald/10 px-3 py-1 font-mono font-medium text-emerald`,
                              children: e.outcome,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              },
              e.name,
            ),
          ),
        }),
        (0, z.jsx)($, {
          delay: 0.2,
          children: (0, z.jsxs)(`div`, {
            className: `mt-16 rounded-[2.5rem] bg-obsidian px-8 py-14 text-center text-[#FDFCFA] sm:px-16`,
            children: [
              (0, z.jsxs)(`h2`, {
                className: `mx-auto max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl`,
                children: [
                  `Your story could be `,
                  (0, z.jsx)(`span`, {
                    className: `italic text-gold-light`,
                    children: `next.`,
                  }),
                ],
              }),
              (0, z.jsxs)(Fl, {
                render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                size: `lg`,
                className: `mt-8 bg-gold text-obsidian hover:bg-gold-light`,
                "data-testid": `testimonials-cta-btn`,
                children: [
                  `Book Your Free Assessment`,
                  (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function FE() {
  return (0, z.jsx)(`div`, {
    "data-testid": `faq-page`,
    children: (0, z.jsx)(`section`, {
      className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20`,
      children: (0, z.jsxs)(`div`, {
        className: `mx-auto max-w-3xl`,
        children: [
          (0, z.jsxs)(`div`, {
            className: `text-center`,
            children: [
              (0, z.jsx)($, {
                children: (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `FAQ`,
                }),
              }),
              (0, z.jsx)(GT, {
                className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl`,
                lines: [
                  (0, z.jsxs)(z.Fragment, {
                    children: [
                      `Questions, `,
                      (0, z.jsx)(`span`, {
                        className: `italic text-emerald`,
                        children: `Answered.`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, z.jsx)($, {
                delay: 0.35,
                children: (0, z.jsx)(`p`, {
                  className: `mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                  children: `Everything you need to know before booking your first session.`,
                }),
              }),
            ],
          }),
          (0, z.jsx)($, {
            delay: 0.2,
            children: (0, z.jsx)(`div`, {
              className: `mt-12 rounded-[2rem] border border-line bg-white px-6 shadow-xl shadow-obsidian/5 sm:px-10`,
              children: (0, z.jsx)($T, { items: Xp, testidPrefix: `faq` }),
            }),
          }),
          (0, z.jsx)($, {
            delay: 0.3,
            children: (0, z.jsxs)(`div`, {
              className: `mt-10 flex flex-col items-center gap-4 rounded-3xl bg-sand/70 p-8 text-center`,
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-heading text-xl font-medium text-obsidian`,
                  children: `Still unsure which course fits you?`,
                }),
                (0, z.jsxs)(`div`, {
                  className: `flex flex-wrap justify-center gap-4`,
                  children: [
                    (0, z.jsxs)(Fl, {
                      render: (0, z.jsx)(ri, { to: `/free-assessment` }),
                      "data-testid": `faq-assessment-btn`,
                      children: [
                        `Book a Free Assessment`,
                        (0, z.jsx)(Sa, { className: `ml-1 h-4 w-4` }),
                      ],
                    }),
                    (0, z.jsxs)(`a`, {
                      href: Bp(
                        `Hi Shadhiya! I have a question about your courses.`,
                      ),
                      target: `_blank`,
                      rel: `noreferrer`,
                      "data-testid": `faq-whatsapp-btn`,
                      className: Nl(
                        Pl({ variant: `outline` }),
                        `gap-2 border-emerald/40 text-emerald hover:bg-emerald hover:text-white`,
                      ),
                      children: [
                        (0, z.jsx)(Fo, { size: 15 }),
                        `Ask on WhatsApp`,
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
function IE({ className: e, ...t }) {
  return (0, z.jsx)(`textarea`, {
    "data-slot": `textarea`,
    className: Nl(
      `flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
      e,
    ),
    ...t,
  });
}
var LE = { Instagram: Do, YouTube: zo, Facebook: ho, TikTok: ko };
function RE() {
  let [e, t] = (0, R.useState)(``),
    [n, r] = (0, R.useState)(``),
    [i, a] = (0, R.useState)(``),
    o = ut({
      mutationFn: (e) => jE(`/contact`, e),
      onSuccess: () => {
        Zi.success(`Enquiry sent — Shadhiya will get back to you shortly.`),
          t(``),
          r(``),
          a(``);
      },
      onError: () => Zi.error(`Could not send — please try WhatsApp instead.`),
    });
  return (0, z.jsx)(`div`, {
    "data-testid": `contact-page`,
    children: (0, z.jsxs)(`section`, {
      className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20`,
      children: [
        (0, z.jsxs)(`div`, {
          className: `max-w-3xl`,
          children: [
            (0, z.jsx)($, {
              children: (0, z.jsx)(`p`, {
                className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                children: `Contact`,
              }),
            }),
            (0, z.jsx)(GT, {
              className: `mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-obsidian sm:text-5xl lg:text-6xl`,
              lines: [
                (0, z.jsx)(z.Fragment, { children: `Start Your English &` }),
                (0, z.jsx)(`span`, {
                  className: `italic text-emerald`,
                  children: `IELTS Journey`,
                }),
              ],
            }),
            (0, z.jsx)($, {
              delay: 0.4,
              children: (0, z.jsx)(`p`, {
                className: `mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg`,
                children: `Have questions about our upcoming batches or coaching options? Reach out to us directly.`,
              }),
            }),
          ],
        }),
        (0, z.jsxs)(`div`, {
          className: `mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12`,
          children: [
            (0, z.jsxs)(`div`, {
              className: `space-y-5 lg:col-span-5`,
              "data-testid": `contact-channels`,
              children: [
                (0, z.jsx)($, {
                  children: (0, z.jsxs)(`a`, {
                    href: Bp(Vp),
                    target: `_blank`,
                    rel: `noreferrer`,
                    "data-testid": `contact-whatsapp-card`,
                    className: `flex items-center gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:shadow-lg`,
                    children: [
                      (0, z.jsx)(`span`, {
                        className: `flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald`,
                        children: (0, z.jsx)(Fo, { size: 22 }),
                      }),
                      (0, z.jsxs)(`span`, {
                        children: [
                          (0, z.jsx)(`span`, {
                            className: `block font-heading text-xl font-semibold text-obsidian`,
                            children: `WhatsApp`,
                          }),
                          (0, z.jsx)(`span`, {
                            className: `text-sm text-ink-muted`,
                            children: `Quickest response for quick questions`,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, z.jsx)($, {
                  delay: 0.08,
                  children: (0, z.jsxs)(`a`, {
                    href: `mailto:${zp}`,
                    "data-testid": `contact-email-card`,
                    className: `flex items-center gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:shadow-lg`,
                    children: [
                      (0, z.jsx)(`span`, {
                        className: `flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold`,
                        children: (0, z.jsx)(Ba, { className: `h-5 w-5` }),
                      }),
                      (0, z.jsxs)(`span`, {
                        children: [
                          (0, z.jsx)(`span`, {
                            className: `block font-heading text-xl font-semibold text-obsidian`,
                            children: `Email`,
                          }),
                          (0, z.jsxs)(`span`, {
                            className: `text-sm text-ink-muted`,
                            children: [zp, ` — formal inquiries & support`],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, z.jsx)($, {
                  delay: 0.16,
                  children: (0, z.jsxs)(`div`, {
                    className: `rounded-3xl border border-line bg-white p-6`,
                    children: [
                      (0, z.jsx)(`p`, {
                        className: `font-heading text-xl font-semibold text-obsidian`,
                        children: `Socials`,
                      }),
                      (0, z.jsx)(`div`, {
                        className: `mt-4 flex gap-3`,
                        children: Up.map((e) => {
                          let t = LE[e.name];
                          return (0, z.jsx)(
                            `a`,
                            {
                              href: e.href,
                              target: `_blank`,
                              rel: `noreferrer`,
                              "aria-label": e.name,
                              "data-testid": `contact-social-${e.name.toLowerCase()}-link`,
                              className: `flex h-11 w-11 items-center justify-center rounded-full border border-obsidian/15 text-obsidian/70 transition-colors hover:border-emerald hover:bg-emerald hover:text-white`,
                              children: (0, z.jsx)(t, { size: 17 }),
                            },
                            e.name,
                          );
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, z.jsx)($, {
              delay: 0.1,
              className: `lg:col-span-7`,
              children: (0, z.jsxs)(`form`, {
                onSubmit: (t) => {
                  t.preventDefault(),
                    o.mutate({ name: e, contact: n, message: i });
                },
                "data-testid": `contact-form`,
                className: `h-full space-y-6 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-obsidian/5 sm:p-10`,
                children: [
                  (0, z.jsx)(`p`, {
                    className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                    children: `Enquiry Form`,
                  }),
                  (0, z.jsxs)(`div`, {
                    className: `grid grid-cols-1 gap-6 sm:grid-cols-2`,
                    children: [
                      (0, z.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, z.jsx)(DE, {
                            htmlFor: `contact-name`,
                            children: `Name`,
                          }),
                          (0, z.jsx)(EE, {
                            id: `contact-name`,
                            "data-testid": `contact-name-input`,
                            required: !0,
                            value: e,
                            onChange: (e) => t(e.target.value),
                            placeholder: `Your name`,
                          }),
                        ],
                      }),
                      (0, z.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, z.jsx)(DE, {
                            htmlFor: `contact-detail`,
                            children: `WhatsApp / Email`,
                          }),
                          (0, z.jsx)(EE, {
                            id: `contact-detail`,
                            "data-testid": `contact-detail-input`,
                            required: !0,
                            value: n,
                            onChange: (e) => r(e.target.value),
                            placeholder: `How do we reach you?`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, z.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, z.jsx)(DE, {
                        htmlFor: `contact-message`,
                        children: `Message`,
                      }),
                      (0, z.jsx)(IE, {
                        id: `contact-message`,
                        "data-testid": `contact-message-input`,
                        required: !0,
                        value: i,
                        onChange: (e) => a(e.target.value),
                        placeholder: `Tell us about your goal — target band, timeline, or what you're struggling with.`,
                        rows: 6,
                      }),
                    ],
                  }),
                  (0, z.jsxs)(Fl, {
                    type: `submit`,
                    size: `lg`,
                    disabled: o.isPending,
                    "data-testid": `contact-submit-btn`,
                    children: [
                      o.isPending ? `Sending…` : `Send Enquiry`,
                      !o.isPending &&
                        (0, z.jsx)($a, { className: `ml-1 h-4 w-4` }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function zE({ className: e, ...t }) {
  return (0, z.jsx)(`div`, {
    "data-slot": `table-container`,
    className: `relative w-full overflow-x-auto`,
    children: (0, z.jsx)(`table`, {
      "data-slot": `table`,
      className: Nl(`w-full caption-bottom text-sm`, e),
      ...t,
    }),
  });
}
function BE({ className: e, ...t }) {
  return (0, z.jsx)(`thead`, {
    "data-slot": `table-header`,
    className: Nl(`[&_tr]:border-b`, e),
    ...t,
  });
}
function VE({ className: e, ...t }) {
  return (0, z.jsx)(`tbody`, {
    "data-slot": `table-body`,
    className: Nl(`[&_tr:last-child]:border-0`, e),
    ...t,
  });
}
function HE({ className: e, ...t }) {
  return (0, z.jsx)(`tr`, {
    "data-slot": `table-row`,
    className: Nl(
      `border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted`,
      e,
    ),
    ...t,
  });
}
function UE({ className: e, ...t }) {
  return (0, z.jsx)(`th`, {
    "data-slot": `table-head`,
    className: Nl(
      `h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0`,
      e,
    ),
    ...t,
  });
}
function WE({ className: e, ...t }) {
  return (0, z.jsx)(`td`, {
    "data-slot": `table-cell`,
    className: Nl(
      `p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0`,
      e,
    ),
    ...t,
  });
}
var GE = `ss_admin_token`;
async function KE(e) {
  let t = await fetch(`/api/admin/leads`, {
    headers: { Authorization: `Bearer ${e}` },
  });
  if (!t.ok) throw Error(String(t.status));
  return t.json();
}
var qE = (e) =>
    new Date(e).toLocaleDateString(`en-GB`, {
      day: `numeric`,
      month: `short`,
      year: `numeric`,
    }),
  JE = {
    academic: `Academic IELTS`,
    general: `General IELTS`,
    spoken: `Spoken English`,
  };
function YE() {
  let [e, t] = (0, R.useState)(() => localStorage.getItem(GE)),
    [n, r] = (0, R.useState)(``),
    [i, a] = (0, R.useState)(``),
    [o, s] = (0, R.useState)(``),
    [c, l] = (0, R.useState)(!1),
    u = () => {
      localStorage.removeItem(GE), t(null);
    },
    d = async (e) => {
      e.preventDefault(), l(!0), s(``);
      try {
        let e = await fetch(`/api/auth/login`, {
          method: `POST`,
          headers: { "Content-Type": `application/json` },
          body: JSON.stringify({ email: n, password: i }),
        });
        if (!e.ok) throw Error(`Invalid email or password`);
        let r = await e.json();
        localStorage.setItem(GE, r.token), t(r.token);
      } catch (e) {
        s(e instanceof Error ? e.message : `Login failed`);
      } finally {
        l(!1);
      }
    },
    {
      data: f,
      isLoading: p,
      refetch: m,
      isFetching: h,
    } = lt({
      queryKey: [`admin-leads`, e],
      queryFn: () => KE(e),
      enabled: !!e,
      retry: !1,
    });
  return e
    ? (0, z.jsxs)(`div`, {
        className: `mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8`,
        "data-testid": `admin-dashboard`,
        children: [
          (0, z.jsxs)(`div`, {
            className: `flex flex-wrap items-center justify-between gap-4`,
            children: [
              (0, z.jsxs)(`div`, {
                children: [
                  (0, z.jsx)(`p`, {
                    className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                    children: `Admin`,
                  }),
                  (0, z.jsx)(`h1`, {
                    className: `mt-2 font-heading text-3xl font-semibold text-obsidian sm:text-4xl`,
                    children: `Leads Dashboard`,
                  }),
                ],
              }),
              (0, z.jsxs)(`div`, {
                className: `flex gap-3`,
                children: [
                  (0, z.jsxs)(Fl, {
                    variant: `outline`,
                    onClick: () => m(),
                    disabled: h,
                    "data-testid": `admin-refresh-btn`,
                    children: [
                      (0, z.jsx)(Za, { className: `mr-1 h-4 w-4` }),
                      `Refresh`,
                    ],
                  }),
                  (0, z.jsxs)(Fl, {
                    variant: `outline`,
                    onClick: u,
                    "data-testid": `admin-logout-btn`,
                    children: [
                      (0, z.jsx)(za, { className: `mr-1 h-4 w-4` }),
                      `Logout`,
                    ],
                  }),
                ],
              }),
            ],
          }),
          p
            ? (0, z.jsx)(`p`, {
                className: `mt-16 text-center text-ink-muted`,
                "data-testid": `admin-loading`,
                children: `Loading leads…`,
              })
            : f
              ? (0, z.jsxs)(z.Fragment, {
                  children: [
                    (0, z.jsxs)(`div`, {
                      className: `mt-8 flex flex-wrap gap-4`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `rounded-2xl border border-line bg-white px-6 py-4`,
                          "data-testid": `admin-stat-assessments`,
                          children: [
                            (0, z.jsx)(`p`, {
                              className: `font-heading text-3xl font-semibold text-emerald`,
                              children: f.assessments.length,
                            }),
                            (0, z.jsx)(`p`, {
                              className: `font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted`,
                              children: `Assessment Bookings`,
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `rounded-2xl border border-line bg-white px-6 py-4`,
                          "data-testid": `admin-stat-contacts`,
                          children: [
                            (0, z.jsx)(`p`, {
                              className: `font-heading text-3xl font-semibold text-gold`,
                              children: f.contacts.length,
                            }),
                            (0, z.jsx)(`p`, {
                              className: `font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted`,
                              children: `Contact Enquiries`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, z.jsx)(`h2`, {
                      className: `mt-12 font-heading text-2xl font-semibold text-obsidian`,
                      children: `Free Assessment Bookings`,
                    }),
                    (0, z.jsx)(`div`, {
                      className: `mt-4 rounded-2xl border border-line bg-white`,
                      "data-testid": `admin-assessments-table`,
                      children: (0, z.jsxs)(zE, {
                        children: [
                          (0, z.jsx)(BE, {
                            children: (0, z.jsxs)(HE, {
                              children: [
                                (0, z.jsx)(UE, { children: `Date` }),
                                (0, z.jsx)(UE, { children: `Name` }),
                                (0, z.jsx)(UE, { children: `Program` }),
                                (0, z.jsx)(UE, { children: `Format` }),
                                (0, z.jsx)(UE, { children: `Target` }),
                                (0, z.jsx)(UE, { children: `Difficulty` }),
                                (0, z.jsx)(UE, { children: `Contact` }),
                              ],
                            }),
                          }),
                          (0, z.jsx)(VE, {
                            children:
                              f.assessments.length === 0
                                ? (0, z.jsx)(HE, {
                                    children: (0, z.jsx)(WE, {
                                      colSpan: 7,
                                      className: `py-10 text-center text-ink-muted`,
                                      children: `No bookings yet.`,
                                    }),
                                  })
                                : f.assessments.map((e) =>
                                    (0, z.jsxs)(
                                      HE,
                                      {
                                        children: [
                                          (0, z.jsx)(WE, {
                                            className: `whitespace-nowrap`,
                                            children: qE(e.created_at),
                                          }),
                                          (0, z.jsx)(WE, {
                                            className: `font-medium`,
                                            children: e.full_name,
                                          }),
                                          (0, z.jsx)(WE, {
                                            children:
                                              JE[e.program] ?? e.program,
                                          }),
                                          (0, z.jsx)(WE, {
                                            children:
                                              e.class_format === `group`
                                                ? `Group`
                                                : `1-to-1`,
                                          }),
                                          (0, z.jsx)(WE, {
                                            children: e.target_band || `—`,
                                          }),
                                          (0, z.jsx)(WE, {
                                            className: `capitalize`,
                                            children: e.difficulty || `—`,
                                          }),
                                          (0, z.jsx)(WE, {
                                            children: (0, z.jsx)(`a`, {
                                              href: `https://wa.me/${e.whatsapp.replace(/[^0-9]/g, ``)}`,
                                              target: `_blank`,
                                              rel: `noreferrer`,
                                              "aria-label": `WhatsApp ${e.full_name}`,
                                              "data-testid": `admin-lead-whatsapp-${e.id}`,
                                              className: `inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-emerald transition-colors hover:bg-emerald hover:text-white`,
                                              children: (0, z.jsx)(Fo, {
                                                size: 14,
                                              }),
                                            }),
                                          }),
                                        ],
                                      },
                                      e.id,
                                    ),
                                  ),
                          }),
                        ],
                      }),
                    }),
                    (0, z.jsx)(`h2`, {
                      className: `mt-12 font-heading text-2xl font-semibold text-obsidian`,
                      children: `Contact Enquiries`,
                    }),
                    (0, z.jsx)(`div`, {
                      className: `mt-4 rounded-2xl border border-line bg-white`,
                      "data-testid": `admin-contacts-table`,
                      children: (0, z.jsxs)(zE, {
                        children: [
                          (0, z.jsx)(BE, {
                            children: (0, z.jsxs)(HE, {
                              children: [
                                (0, z.jsx)(UE, { children: `Date` }),
                                (0, z.jsx)(UE, { children: `Name` }),
                                (0, z.jsx)(UE, { children: `Contact` }),
                                (0, z.jsx)(UE, { children: `Message` }),
                              ],
                            }),
                          }),
                          (0, z.jsx)(VE, {
                            children:
                              f.contacts.length === 0
                                ? (0, z.jsx)(HE, {
                                    children: (0, z.jsx)(WE, {
                                      colSpan: 4,
                                      className: `py-10 text-center text-ink-muted`,
                                      children: `No enquiries yet.`,
                                    }),
                                  })
                                : f.contacts.map((e) =>
                                    (0, z.jsxs)(
                                      HE,
                                      {
                                        children: [
                                          (0, z.jsx)(WE, {
                                            className: `whitespace-nowrap`,
                                            children: qE(e.created_at),
                                          }),
                                          (0, z.jsx)(WE, {
                                            className: `font-medium`,
                                            children: e.name,
                                          }),
                                          (0, z.jsx)(WE, {
                                            children: e.contact,
                                          }),
                                          (0, z.jsx)(WE, {
                                            className: `max-w-md truncate`,
                                            children: e.message,
                                          }),
                                        ],
                                      },
                                      e.id,
                                    ),
                                  ),
                          }),
                        ],
                      }),
                    }),
                  ],
                })
              : (0, z.jsxs)(`div`, {
                  className: `mt-16 text-center`,
                  "data-testid": `admin-error`,
                  children: [
                    (0, z.jsx)(`p`, {
                      className: `text-ink-muted`,
                      children: `Session expired or failed to load. Please sign in again.`,
                    }),
                    (0, z.jsx)(Fl, {
                      className: `mt-4`,
                      onClick: u,
                      "data-testid": `admin-relogin-btn`,
                      children: `Back to Login`,
                    }),
                  ],
                }),
        ],
      })
    : (0, z.jsx)(`div`, {
        className: `mx-auto flex max-w-md flex-col justify-center px-4 py-24`,
        "data-testid": `admin-login-page`,
        children: (0, z.jsxs)(`form`, {
          onSubmit: d,
          className: `space-y-6 rounded-[2rem] border border-line bg-white p-8 shadow-xl shadow-obsidian/5`,
          children: [
            (0, z.jsxs)(`div`, {
              children: [
                (0, z.jsx)(`p`, {
                  className: `font-mono text-xs uppercase tracking-[0.22em] text-emerald`,
                  children: `Admin`,
                }),
                (0, z.jsx)(`h1`, {
                  className: `mt-2 font-heading text-3xl font-semibold text-obsidian`,
                  children: `Leads Dashboard`,
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, z.jsx)(DE, { htmlFor: `admin-email`, children: `Email` }),
                (0, z.jsx)(EE, {
                  id: `admin-email`,
                  type: `email`,
                  "data-testid": `admin-email-input`,
                  required: !0,
                  value: n,
                  onChange: (e) => r(e.target.value),
                  placeholder: `admin@shadhiyaspeaks.com`,
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              className: `space-y-2`,
              children: [
                (0, z.jsx)(DE, {
                  htmlFor: `admin-password`,
                  children: `Password`,
                }),
                (0, z.jsx)(EE, {
                  id: `admin-password`,
                  type: `password`,
                  "data-testid": `admin-password-input`,
                  required: !0,
                  value: i,
                  onChange: (e) => a(e.target.value),
                  placeholder: `••••••••`,
                }),
              ],
            }),
            o &&
              (0, z.jsx)(`p`, {
                className: `text-sm text-destructive`,
                "data-testid": `admin-login-error`,
                children: o,
              }),
            (0, z.jsx)(Fl, {
              type: `submit`,
              className: `w-full`,
              disabled: c,
              "data-testid": `admin-login-btn`,
              children: c ? `Signing in…` : `Sign In`,
            }),
          ],
        }),
      });
}
function XE() {
  let { pathname: e } = Rn();
  return (
    (0, R.useEffect)(() => {
      let e = new Fi({ duration: 1.15, smoothWheel: !0 }),
        t = 0,
        n = (r) => {
          e.raf(r), (t = requestAnimationFrame(n));
        };
      return (
        (t = requestAnimationFrame(n)),
        () => {
          cancelAnimationFrame(t), e.destroy();
        }
      );
    }, []),
    (0, R.useEffect)(() => {
      window.scrollTo(0, 0);
    }, [e]),
    (0, z.jsxs)(`div`, {
      className: `min-h-screen bg-cream text-foreground`,
      children: [
        (0, z.jsx)(Zp, {}),
        (0, z.jsx)(`main`, {
          className: `pt-20`,
          children: (0, z.jsxs)(mr, {
            children: [
              (0, z.jsx)(fr, { path: `/`, element: (0, z.jsx)(YT, {}) }),
              (0, z.jsx)(fr, { path: `/about`, element: (0, z.jsx)(QT, {}) }),
              (0, z.jsx)(fr, {
                path: `/ielts-preparation`,
                element: (0, z.jsx)(rE, {}),
              }),
              (0, z.jsx)(fr, {
                path: `/spoken-english`,
                element: (0, z.jsx)(aE, {}),
              }),
              (0, z.jsx)(fr, {
                path: `/one-to-one-coaching`,
                element: (0, z.jsx)(cE, {}),
              }),
              (0, z.jsx)(fr, {
                path: `/free-assessment`,
                element: (0, z.jsx)(NE, {}),
              }),
              (0, z.jsx)(fr, {
                path: `/testimonials`,
                element: (0, z.jsx)(PE, {}),
              }),
              (0, z.jsx)(fr, { path: `/faq`, element: (0, z.jsx)(FE, {}) }),
              (0, z.jsx)(fr, { path: `/contact`, element: (0, z.jsx)(RE, {}) }),
              (0, z.jsx)(fr, { path: `/admin`, element: (0, z.jsx)(YE, {}) }),
            ],
          }),
        }),
        (0, z.jsx)(tm, {}),
        (0, z.jsx)(nm, {}),
        (0, z.jsx)(Wo, {}),
      ],
    })
  );
}
var ZE = new We();
(0, xi.createRoot)(document.getElementById(`root`)).render(
  (0, z.jsx)(R.StrictMode, {
    children: (0, z.jsx)(Ye, {

// ===== 4. Brand icon SVG paths (24x24 viewBox, fill=currentColor) =====
export const BRAND_ICON_PATHS = {
  WhatsApp: `M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z`,
  Instagram: `M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077`,
  YouTube: `M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z`,
  Facebook: `M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z`,
  TikTok: `M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z`,
};
