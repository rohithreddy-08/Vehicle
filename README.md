# Vehicle QR Contact - Phase 1

A React + Vite static website for a vehicle QR sticker.

## Features

- Unique vehicle QR ID through a URL query parameter
- Mobile-first UI
- Call owner button
- WhatsApp owner button with pre-filled message
- Invalid QR ID handling
- No backend/database required for Phase 1

## 1. Install

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open the URL shown by Vite.

Example:

```text
http://localhost:5173/?vehicle=ROHIT123
```

## 3. Change owner details

Edit:

```text
src/App.jsx
```

Inside `VEHICLES`:

```js
ROHIT123: {
  ownerName: "Rohit Reddy",
  vehicleNumber: "TG09AB1234",
  phone: "919999999999",
  whatsappMessage: "Hi Rohit, I am contacting you regarding your car parking."
}
```

Use the phone number in international format without `+`, spaces, or dashes.

Example India number:

```text
919876543210
```

## 4. Create a unique QR URL

After GitHub Pages deployment, a QR can point to:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/?vehicle=ROHIT123
```

Another vehicle can use:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/?vehicle=MOUNIKA123
```

## 5. Deploy to GitHub Pages

First create a GitHub repository and push the project.

Then run:

```bash
npm install
npm run deploy
```

The `gh-pages` package publishes the `dist` folder to the `gh-pages` branch.

Enable GitHub Pages in:

```text
Repository
→ Settings
→ Pages
→ Deploy from branch
→ gh-pages
→ / (root)
```

## Important

This Phase 1 stores owner phone numbers in the frontend JavaScript bundle.

That means the phone number is technically visible to anyone who inspects the website source/network files.

For a production version with many users, move owner information to a backend/database in Phase 2.
