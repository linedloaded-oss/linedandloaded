# Lined & Loaded — Static Website

Professional parking lot striping website for Dallas–Fort Worth.  
Built with pure HTML5 / CSS3 / Vanilla JS — zero dependencies, deploys in minutes.

---

## 🚀 Deploy to GitHub Pages

1. **Create a GitHub repository** (public or private with Pages enabled).

2. **Push the files:**
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/YOUR_USERNAME/lined-and-loaded.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Under "Source," select **Deploy from a branch**
   - Branch: `main`, Folder: `/ (root)`
   - Click **Save**

4. Your site will be live at `https://YOUR_USERNAME.github.io/lined-and-loaded/` within a minute or two.

5. **Custom domain** (optional): Add a `CNAME` file containing `linedandloaded.com` and configure your DNS per GitHub's instructions.

---

## 🔗 Connect Your Lead Form

The form submits a JSON POST to a webhook URL. You'll need to set one up:

**Option A — Zapier (easiest):**
1. Create a Zap → Trigger: "Webhooks by Zapier" → Catch Hook
2. Copy the webhook URL
3. Add an action to email you the lead data

**Option B — Make (Integromat):**
1. Create a scenario → Webhook trigger
2. Copy the webhook URL

**Option C — Formspree:**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Note: Formspree expects `multipart/form-data` by default — check their JSON docs

**Where to update in `main.js`:**

Search for:
```
YOUR_WEBHOOK_URL_HERE
```

Replace with your actual webhook URL:
```js
const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/XXXXXX/YYYYYY/';
```

---

## 📞 Update Phone Number

The placeholder phone number is `+12145550100` (not a real number).

**Search for this string in the files:**
```
tel:+12145550100
```

It appears in:
- `index.html` — hero CTA, footer, form error message, mobile sticky bar
- `main.js` — form error fallback link

**Also update the display text** — search for `(214) 555-0100` and replace with your real number.

---

## 🖼️ Swap the Hero Image

The hero uses an Unsplash aerial parking lot photo.

**To replace it**, open `styles.css` and find:
```css
background-image: url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1920&q=80');
```

Replace the URL with:
- A local file: `url('images/hero.jpg')` (add your image to an `images/` folder)
- A different Unsplash URL
- Any hosted image URL

**Recommended dimensions:** At least 1920×1080px. The image has a dark overlay applied in CSS, so it will work with most aerial/outdoor shots.

---

## ✏️ Edit Business Copy

All copy is in `index.html`. Key sections:

| What to change | Search for |
|---|---|
| Company name | `Lined &amp; Loaded` |
| City/region | `Dallas–Fort Worth` |
| Service descriptions | Inside `.service-card` elements |
| Review placeholders | Inside `.review-card` elements |
| Footer copyright | `© 2025 Lined` |

---

## 📁 File Structure

```
lined-and-loaded/
├── index.html      ← Full page HTML (edit copy here)
├── styles.css      ← All styles (edit colors/fonts here)
├── main.js         ← Interactions + form logic (edit webhook here)
└── README.md       ← This file
```

---

## 🎨 Design Tokens

Colors are defined as CSS custom properties in `styles.css`:

```css
:root {
  --color-primary:   #FFC107;  /* Safety Yellow — buttons, accents */
  --color-secondary: #111111;  /* Black — nav, footer, headings */
  --color-bg:        #FFFFFF;
  --color-gray:      #F5F5F5;  /* Section backgrounds */
  --color-text:      #222222;
  --color-muted:     #666666;
}
```

Change `--color-primary` to instantly re-theme the whole site.

---

## ✅ Checklist Before Launch

- [ ] Replace `YOUR_WEBHOOK_URL_HERE` in `main.js`
- [ ] Replace `(214) 555-0100` / `+12145550100` with real phone number
- [ ] Update `canonical` URL in `index.html` `<head>` if domain differs
- [ ] Update Open Graph tags if needed
- [ ] Test the form end-to-end (submit → check webhook → verify email)
- [ ] Add real reviews when you have them
- [ ] Swap hero image with a real job photo if you have one
- [ ] Set up GitHub Pages custom domain
