# Trellis Digital — Agency Website

Professional agency website for Trellis Digital, built with Next.js 16, Tailwind CSS v4, Framer Motion, and React Hook Form.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first configuration)
- **Framer Motion 12** (scroll-triggered animations)
- **React Hook Form 7** (contact form validation)
- **Google Apps Script** (form → Google Sheets integration)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Copy the example env file and fill in your Google Apps Script URL:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and set:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Google Sheets Form Integration

The contact form on `/contact` posts submissions to a Google Apps Script webhook. To set this up:

### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name the first row columns to match the form fields:
   `Full Name | Business Name | Email | Phone | Website URL | Looking For | Budget | Business Description | Timestamp`

### Step 2 — Deploy a Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**.
2. Replace the default code with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.fullName,
    data.businessName,
    data.email,
    data.phone || "",
    data.websiteUrl || "",
    data.lookingFor,
    data.budget,
    data.businessDescription,
    new Date().toISOString(),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**.
4. Set type to **Web app**, execute as **Me**, access to **Anyone**.
5. Copy the deployed web app URL.

### Step 3 — Add the URL to your environment

Paste the URL into `.env.local`:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> **Note:** Google Apps Script supports CORS for POST requests. If you encounter CORS errors, verify your deployment settings allow access from "Anyone."

---

## Project Structure

```
site/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Home page
│   ├── services/page.tsx   # Services & pricing
│   ├── work/page.tsx       # Portfolio
│   ├── about/page.tsx      # About
│   └── contact/page.tsx    # Contact page
├── components/
│   ├── Navbar.tsx          # Fixed responsive navbar
│   ├── Footer.tsx          # Site footer
│   ├── AnimatedSection.tsx # Framer Motion scroll-animation wrapper
│   ├── Hero.tsx            # Home hero section
│   ├── ServicesOverview.tsx
│   ├── WhyTrellis.tsx
│   ├── CTABanner.tsx
│   └── ContactForm.tsx     # React Hook Form contact form
└── .env.local.example
```

## Deploying

The site is ready to deploy on [Vercel](https://vercel.com). Connect your GitHub repo, add the `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` environment variable in Vercel's project settings, and deploy.
