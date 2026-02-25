# Infraforma — Next.js Project

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              ← Homepage (all sections in order)
│   ├── blog/
│   │   ├── page.tsx          ← Blog listing
│   │   └── [slug]/page.tsx   ← Individual blog post
│   └── industries/
│       ├── page.tsx          ← All industries
│       └── [slug]/page.tsx   ← Individual industry page
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx        ← Navigation (from header.html)
│   │   └── Footer.tsx        ← Footer (from footer.html)
│   ├── sections/
│   │   ├── HeroSlider.tsx    ← slider_top.html
│   │   ├── AboutSection.tsx  ← sec1.html (How We Work)
│   │   ├── ServicesSection.tsx ← sec2.html (Service Framework)
│   │   ├── ProcessSection.tsx  ← sec3.html (Delivery Framework)
│   │   ├── CtaSection.tsx    ← sec4.html (We Bridge Design to Reality)
│   │   ├── StakeholderSection.tsx ← sec6.html (Who We Serve)
│   │   ├── BlogSection.tsx   ← sec7.html (From The Field)
│   │   ├── TechTransition.tsx ← sec8.html (Tech ecosystem)
│   │   └── ProofSection.tsx  ← sec10.html (Stats)
│   └── ui/
│       └── HtmlSection.tsx   ← Universal HTML embed renderer
│
├── raw/                      ← Your original HTML files (don't edit)
│   ├── slider_top.html
│   ├── header.html
│   ├── sec1.html ... sec10.html
│   └── footer.html
│
└── lib/
    └── content.ts            ← ALL EDITABLE CONTENT LIVES HERE
```

---

## How to Update Content

### Blog posts
Edit `src/lib/content.ts` → `blogPosts` array.
Add a new object for each post. The site auto-generates the page at `/blog/[slug]`.

### Industries
Edit `src/lib/content.ts` → `industries` array.
The site auto-generates the page at `/industries/[slug]`.

### Section content (headers, body text, stats)
The sections currently render your original HTML files directly.
To make any section's text editable without touching HTML:
1. Open the section's `.tsx` file in `src/components/sections/`
2. Replace `<HtmlSection html={html} />` with the typed component version
   (examples in the `_typed/` folder)

---

## How to Add a New Blog Post

1. Open `src/lib/content.ts`
2. Add to the `blogPosts` array:
```ts
{
  slug: 'your-post-slug',
  title: 'Your Post Title',
  excerpt: 'Short description...',
  category: 'BIM Standards',
  topic: 'ISO 19650 · Standards',
  date: 'Mar 2025',
  readTime: '5 min read',
  type: 'article',
  image: 'https://your-image-url.jpg',
  featured: false,
  body: '<p>Your full article HTML here...</p>',
}
```
3. Save. The post appears at `/blog/your-post-slug` automatically.

---

## Deployment (Vercel — Free)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site is live in 2 minutes.
Custom domain: add it in the Vercel dashboard.

---

## Next Step: Sanity CMS

When you're ready to write posts from a proper editor instead of editing `content.ts`:

```bash
npm install next-sanity @sanity/image-url
npm create sanity@latest
```

We'll connect it so blog posts and industries come from Sanity's visual editor instead of the file.
