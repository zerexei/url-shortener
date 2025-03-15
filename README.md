# Scalable URL Shortener with Analytics

### Objective:

Create a system similar to Bitly for shortening URLs and tracking analytics.

### Features:

- Shorten long URLs and manage them via a dashboard.
- Analytics on link clicks (e.g., location, device, referrer).
- Expiration dates for shortened URLs.
- Rate-limiting for API requests.

### Tech Stack:

Backend: Flask
Frontend: React
Database: Supabase for persistence; Redis for caching.

### Bonus:

- Add QR code generation for shortened URLs.
- Deploy it using Docker.

```bash
cd client
npm run dev

cd server
pipenv run app.py
```
