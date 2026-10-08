# PunisherGames website

Static website for PunisherGames — a mobile game studio. Pure HTML/CSS/JS, no build step.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, games, services, process, toolkit |
| `contact.html` | Support, contact form and FAQ (use as the Play Console **support** URL) |
| `privacy-policy.html` | Privacy Policy (Play Console **privacy policy** URL) |
| `terms.html` | Terms of Service |
| `delete-account.html` | Account & data deletion (Play Console **delete account** URL) |
| `child-safety.html` | Child Safety Standards / CSAE (required for apps with social features) |
| `app-ads.txt` | Authorised ad sellers for AdMob — add your publisher ID |
| `404.html`, `robots.txt`, `sitemap.xml` | Hosting extras |

## Before publishing

- Replace the sample games (Hex Fury, Neon Drift, Siege Breakers) in `index.html` and the game list in `delete-account.html`.
- Set up the emails used across the site: support@, business@, privacy@, contactpunishergames@gmail.com.
- Add your AdMob publisher ID to `app-ads.txt`.
- Update social links in each page footer (`href="#"`).
- Make sure the third-party services listed in the Privacy Policy match the SDKs your games actually use, and that it matches your Play Console Data safety form.
- Have the legal pages reviewed by a qualified lawyer for your jurisdiction.

## Run locally

```bash
python3 -m http.server 8080
```
