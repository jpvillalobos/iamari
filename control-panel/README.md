# ARI Control Panel — Mockup

A bilingual (ES/EN) control panel for families to manage their ARI assistant. Mockup only;
auth and persistence live in `localStorage`.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. The login screen accepts any email/password and lands on
`/dashboard`. Settings persist to `localStorage` under `ari-config`; session under
`ari-session`. Use the `Reset demo data` button on the plan page to wipe and re-seed.
