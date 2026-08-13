# EPS Corner — Coming Soon

Standalone Next.js landing page for `epscorner.com` while the main app is
still in testing on a separate subdomain (e.g. `test.epscorner.com`).

## 1. Install

```powershell
cd eps-coming-soon
npm install
```

## 2. Add the Pretendard font

The page uses [Pretendard](https://github.com/orioncactus/pretendard) (variable woff2).
Download `PretendardVariable.woff2` and place it at:

```
public/fonts/PretendardVariable.woff2
```

Download link: https://github.com/orioncactus/pretendard/releases

## 3. Set up Resend

1. Add `epscorner.com` in the [Resend dashboard](https://resend.com/domains).
2. Add the SPF / DKIM / DMARC DNS records it gives you — same DNS zone as the
   domain, independent of whatever the root domain A/CNAME record points to.
3. Wait for verification (DKIM can take a bit to propagate).
4. Optional: create an **Audience** in Resend to act as your waitlist list,
   and copy its ID.
5. Copy `.env.example` to `.env.local` and fill in:

```powershell
copy .env.example .env.local
```

```
RESEND_API_KEY=re_xxxxxxxx
RESEND_WAITLIST_AUDIENCE_ID=aud_xxxxxxxx   # optional
```

## 4. Run locally

```powershell
npm run dev
```

Visit http://localhost:3000 and submit the form — check your inbox, then use
Gmail's "Show original" to confirm SPF/DKIM/DMARC are passing on the real
domain before you rely on it for the actual app's transactional emails.

## 5. Deploy to Vercel

```powershell
npm i -g vercel
vercel
```

Add the same env vars (`RESEND_API_KEY`, `RESEND_WAITLIST_AUDIENCE_ID`) in
the Vercel project settings, then point `epscorner.com`'s root DNS at this
Vercel deployment, while `test.epscorner.com` keeps pointing at the droplet
running the real app.

## Notes

- No database — waitlist emails are stored as Resend contacts. If you'd
  rather store them in your own Postgres (via Prisma, same as the main app),
  swap the contact-creation block in `app/api/waitlist/route.ts` for a
  `prisma.waitlistEntry.create(...)` call instead.
- `robots` is set to `index: true` in `app/layout.tsx` — this page is meant
  to be crawled, unlike the test subdomain which should stay `noindex`.
