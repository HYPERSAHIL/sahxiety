# Sanity.io CMS Guide for Sahxiety

This guide will walk you through setting up Sanity.io as your headless CMS, creating blog posts, and managing content for your Sahxiety website.

---

## Table of Contents

1. [What is Sanity.io?](#what-is-sanityio)
2. [Step 1: Create Your Sanity Project](#step-1-create-your-sanity-project)
3. [Step 2: Set Up Sanity Studio](#step-2-set-up-sanity-studio)
4. [Step 3: Connect to Your Website](#step-3-connect-to-your-website)
5. [Step 4: Create Your First Post](#step-4-create-your-first-post)
6. [Step 5: Deploy to Cloudflare](#step-5-deploy-to-cloudflare)
7. [Common Tasks](#common-tasks)

---

## What is Sanity.io?

Sanity is a **headless CMS** (Content Management System). Think of it as a fancy Google Doc for your website content. You write your blog posts in Sanity's editor (called "Studio"), and your website automatically fetches and displays them.

**Why Sanity?**
- 🆓 **Free Tier**: Generous free plan (unlimited projects, 3 users)
- ⚡ **Fast**: Content delivered via global CDN
- 🎨 **Customizable**: You control how content is structured
- 📱 **Real-time**: Changes appear instantly (or after a quick refresh)

---

## Step 1: Create Your Sanity Project

1. Go to [sanity.io](https://sanity.io) and click **"Get Started"**.
2. Sign up with GitHub, Google, or Email.
3. After logging in, click **"Create new project"**.
4. Choose these settings:
   - **Project Name**: `sahxiety-cms`
   - **Dataset Name**: `production` (default is fine)
   - **Project Path**: You can leave this as default
5. Click **"Create Project"**.

You'll be taken to your project dashboard. Here you'll find your **Project ID** — you'll need this soon!

---

## Step 2: Set Up Sanity Studio

Sanity Studio is the admin panel where you write and manage content. We'll set it up in a separate folder.

### 2.1 Initialize Studio

Open a **new terminal window** (NOT in your sahxiety folder) and run:

```bash
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production --output-path sahxiety-studio
```

Replace `YOUR_PROJECT_ID` with the ID from your Sanity dashboard.

When prompted:
- **Project template**: Choose "Blog (schema + sample content)"
- **TypeScript**: Your choice (No is simpler for beginners)

### 2.2 Navigate to Studio

```bash
cd sahxiety-studio
```

### 2.3 Define Your Content Schema

The schema tells Sanity what your content looks like. Open `schemaTypes/post.js` (or create it):

```javascript
// schemaTypes/post.js
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt (Short Description)',
      type: 'text',
      rows: 3
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent' // Rich text editor
    }
  ]
}
```

Make sure `blockContent` is also defined (the template should include it).

### 2.4 Run Sanity Studio

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) — this is your content editor!

---

## Step 3: Connect to Your Website

Now we link your Sanity project to your Sahxiety website.

### 3.1 Find Your Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click your project
3. Under **API**, copy your **Project ID**

### 3.2 Create Environment File

In your `sahxiety` website folder, create a file named `.env`:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Replace `your_project_id_here` with your actual Project ID.

### 3.3 Restart Your Dev Server

```bash
npm run dev
```

Your website now pulls content from Sanity! If no content exists yet, it falls back to mock data.

---

## Step 4: Create Your First Post

1. Open Sanity Studio ([localhost:3333](http://localhost:3333))
2. Click **"Post"** in the sidebar
3. Click the **"+"** button to create new
4. Fill in:
   - **Title**: "My First CMS Post"
   - **Slug**: Click "Generate" button
   - **Excerpt**: "Testing the CMS integration"
   - **Published At**: Today's date
   - **Body**: Write whatever you want! Use the rich text tools.
5. Click **"Publish"** in the bottom-right

Now refresh your website's `/posts` page — your new article should appear!

---

## Step 5: Deploy to Cloudflare

### 5.1 Deploy Your Website

Your `sahxiety` site deploys as usual:

```bash
npm run build
# Then deploy dist/ to Cloudflare Pages
```

### 5.2 Add Environment Variables to Cloudflare

1. Go to Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = production

### 5.3 Deploy Sanity Studio (Optional)

You can host Studio on Sanity's free hosting:

```bash
cd sahxiety-studio
npx sanity deploy
```

Choose a hostname like `sahxiety-studio.sanity.studio`. Now you can edit content from anywhere!

---

## Common Tasks

### How to Edit an Existing Post

1. Open Sanity Studio
2. Click **Posts** in the sidebar
3. Click the post you want to edit
4. Make changes
5. Click **Publish**

### How to Add Images

1. In your post body, click the **Image** icon in the toolbar
2. Upload or drag an image
3. Publish

### How to Create a New Content Type (e.g., Projects)

1. Create a new schema file: `schemaTypes/project.js`
2. Define fields (similar to post.js)
3. Import and add to `schemaTypes/index.js`
4. Restart Studio

### How to See Changes Immediately

Sanity uses CDN caching. For **instant** updates:

1. In `src/lib/sanity.js`, change `useCdn: true` to `useCdn: false`
2. This bypasses cache but is slightly slower

For production, keep `useCdn: true` and wait ~60 seconds for cache refresh.

---

## Quick Reference

| Action | Where | Command/Steps |
|--------|-------|---------------|
| Start Studio | `sahxiety-studio/` | `npm run dev` |
| Start Website | `sahxiety/` | `npm run dev` |
| Create Post | Studio | Click + → Fill fields → Publish |
| Edit Post | Studio | Click post → Edit → Publish |
| Deploy Studio | `sahxiety-studio/` | `npx sanity deploy` |
| View on Cloudflare | Browser | Your-site.pages.dev |

---

## Troubleshooting

### "No posts showing"
- Check your `.env` file has correct Project ID
- Make sure posts are **Published**, not just saved as draft
- Restart your dev server after changing `.env`

### "CORS error"
- Go to sanity.io/manage → Your Project → API → CORS Origins
- Add your website URLs (localhost:5173, your-site.pages.dev)

### "Content is outdated"
- Set `useCdn: false` temporarily, or wait for CDN cache refresh (~60s)

---

## File Structure After Setup

```
📁 sahxiety/                 # Your website (what you have now)
├── src/
│   ├── lib/
│   │   └── sanity.js       # Sanity client (already created)
│   └── pages/
│       ├── Posts.jsx       # Lists all CMS posts
│       └── DynamicPost.jsx # Renders individual post
├── .env                    # Your Sanity credentials
└── ...

📁 sahxiety-studio/          # Sanity Studio (new folder)
├── schemaTypes/
│   └── post.js             # Defines blog post structure
└── ...
```

---

## Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community Slack](https://slack.sanity.io)
- [GROQ Query Playground](https://www.sanity.io/docs/query-cheat-sheet)

---

**You're all set!** 🎉

Now go create something amazing.
