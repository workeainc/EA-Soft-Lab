# Sanity CMS Quick Start Guide

## 🚀 Phase 1: Initial Setup

### Step 1: Install Dependencies
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Install project dependencies
npm install @sanity/client @sanity/image-url @sanity/astro
npm install --save-dev @sanity/vision
```

### Step 2: Initialize Sanity Project
```bash
# Initialize Sanity in your project
npx sanity@latest init --template clean --create-project "EA Soft Lab CMS" --dataset production
```

### Step 3: Configure Environment Variables
Create `.env.local` file:
```env
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_PREVIEW_SECRET=your-preview-secret
```

## 🏗️ Phase 2: Create Content Schemas

### Step 1: Create Schema Directory
```bash
mkdir -p src/schemas
```

### Step 2: Create Basic Schemas
Create the following files in `src/schemas/`:

1. **post.js** - Blog posts
2. **service.js** - Services
3. **team.js** - Team members
4. **company.js** - Company information
5. **project.js** - Portfolio projects

### Step 3: Update Sanity Config
Update `sanity.config.js` to include your schemas.

## 🔗 Phase 3: Astro Integration

### Step 1: Create Sanity Client
Create `src/lib/sanity.js`:
```javascript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
```

### Step 2: Create Query Functions
Create `src/lib/queries.js` with GROQ queries for each content type.

### Step 3: Update Astro Config
Add Sanity integration to `astro.config.mjs`.

## 📝 Phase 4: Update Pages

### Step 1: Update Layout
Modify `src/layouts/Layout.astro` to fetch company data.

### Step 2: Update Homepage
Modify `src/pages/index.astro` to use CMS data.

### Step 3: Create Dynamic Pages
Create dynamic routes for blog posts and services.

## 🎨 Phase 5: Create Components

### Step 1: SanityImage Component
Create `src/components/SanityImage.astro` for optimized images.

### Step 2: RichText Component
Create `src/components/RichText.astro` for Portable Text.

## 🚀 Phase 6: Test and Deploy

### Step 1: Test Locally
```bash
npm run dev
```

### Step 2: Deploy Sanity Studio
```bash
npx sanity deploy
```

### Step 3: Deploy Website
Deploy to Vercel with environment variables configured.

## 📋 Next Steps

1. Add content to Sanity Studio
2. Test all dynamic pages
3. Implement search functionality
4. Add image optimization
5. Set up preview mode
6. Configure analytics

## 🔧 Troubleshooting

### Common Issues:
- CORS errors: Check CORS origins in Sanity project settings
- Missing environment variables: Ensure all variables are set
- Image loading issues: Check image URL builder configuration
- Build errors: Verify schema syntax and imports

### Useful Commands:
```bash
# Start Sanity Studio
npx sanity dev

# Deploy Sanity Studio
npx sanity deploy

# Check Sanity project status
npx sanity projects list

# Generate TypeScript types
npx sanity codegen
``` 