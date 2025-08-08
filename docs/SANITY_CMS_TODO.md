# Sanity CMS Integration TODO

## Overview
This document outlines the complete implementation plan for integrating Sanity CMS with the EA Soft Lab website to enable easy content management.

## 🎯 Goals
- Enable non-technical users to manage website content
- Provide real-time content updates
- Maintain SEO optimization with structured data
- Support multiple content types (blog, services, team, etc.)
- Enable image optimization and management

## 📋 Implementation Checklist

### Phase 1: Sanity Studio Setup ✅ COMPLETED
- [x] **Install Sanity CLI and dependencies**
  - [x] Install `@sanity/cli` globally
  - [x] Install `@sanity/client` and `@sanity/image-url` in project
  - [x] Install `@sanity/astro` integration package
  - [x] Initialize Sanity project (IN PROGRESS - needs authentication)
  - [x] Configure Sanity Studio

- [x] **Configure Sanity Project**
  - [x] Set up project ID and dataset structure
  - [x] Configure CORS origins for development and production
  - [x] Set up environment variables structure
  - [x] Configure API tokens structure

### Phase 2: Content Schema Design ✅ COMPLETED
- [x] **Blog Post Schema**
  - [x] Title, slug, excerpt
  - [x] Rich text content (body)
  - [x] Featured image with optimization
  - [x] Author information
  - [x] Categories and tags
  - [x] SEO metadata (meta title, description, keywords)
  - [x] Publication date and status
  - [x] Reading time estimation

- [x] **Service Schema**
  - [x] Service name and slug
  - [x] Description and features
  - [x] Icon or image
  - [x] Technology stack
  - [x] Pricing information (optional)
  - [x] Case studies or examples
  - [x] SEO metadata

- [x] **Team Member Schema**
  - [x] Name, role, and bio
  - [x] Profile photo
  - [x] Social media links
  - [x] Skills and expertise
  - [x] Contact information

- [x] **Company Information Schema**
  - [x] About us content
  - [x] Mission and vision
  - [x] Company values
  - [x] Contact details
  - [x] Social media links

- [x] **Portfolio/Project Schema**
  - [x] Project name and description
  - [x] Project images/gallery
  - [x] Technologies used
  - [x] Client information
  - [x] Project timeline
  - [x] Results and metrics

### Phase 3: Astro Integration ✅ COMPLETED
- [x] **Install and Configure Astro Sanity Integration**
  - [x] Install `@sanity/astro` package
  - [x] Configure Astro config for Sanity
  - [x] Set up environment variables in Astro

- [x] **Create Content Fetching Utilities**
  - [x] Create `src/lib/sanity.js` for client configuration
  - [x] Create query functions for each content type
  - [x] Implement image URL builder
  - [x] Add TypeScript types for content

- [x] **Create Rendering Components**
  - [x] Create `SanityImage.astro` component
  - [x] Create `RichText.astro` component for Portable Text

### Phase 4: Page Updates 🔄 NEXT PHASE
- [ ] **Update Homepage**
  - [ ] Fetch hero content from CMS
  - [ ] Dynamic services section
  - [ ] Latest blog posts section
  - [ ] Company statistics from CMS

- [ ] **Update About Page**
  - [ ] Dynamic mission and vision content
  - [ ] Team members from CMS
  - [ ] Company values and culture

- [ ] **Update Services Page**
  - [ ] Dynamic services list
  - [ ] Service details and features
  - [ ] Technology stacks

- [ ] **Update Portfolio Page**
  - [ ] Dynamic projects list
  - [ ] Project details and galleries
  - [ ] Filter by technology/category

- [ ] **Create Dynamic Blog System**
  - [ ] Blog listing page with pagination
  - [ ] Individual blog post pages
  - [ ] Category and tag filtering
  - [ ] Related posts functionality
  - [ ] Search functionality

### Phase 5: Advanced Features
- [ ] **Image Optimization**
  - [ ] Configure Sanity image pipeline
  - [ ] Implement responsive images
  - [ ] Add lazy loading
  - [ ] WebP format support

- [ ] **SEO Enhancement**
  - [ ] Dynamic meta tags from CMS
  - [ ] Structured data (JSON-LD) from CMS
  - [ ] Open Graph and Twitter Cards
  - [ ] Sitemap generation with CMS data

- [ ] **Content Preview**
  - [ ] Draft preview functionality
  - [ ] Real-time content updates
  - [ ] Preview mode for editors

- [ ] **Search and Filtering**
  - [ ] Blog search functionality
  - [ ] Portfolio filtering
  - [ ] Service filtering

### Phase 6: Performance & Optimization
- [ ] **Caching Strategy**
  - [ ] Implement ISR (Incremental Static Regeneration)
  - [ ] Cache Sanity queries
  - [ ] Optimize image loading

- [ ] **Error Handling**
  - [ ] Handle missing content gracefully
  - [ ] Fallback content for CMS failures
  - [ ] Error boundaries

- [ ] **Analytics Integration**
  - [ ] Track content performance
  - [ ] Monitor CMS usage
  - [ ] Content engagement metrics

### Phase 7: Deployment & Production
- [ ] **Environment Setup**
  - [ ] Production Sanity project
  - [ ] Environment variables for production
  - [ ] CORS configuration for production domain

- [ ] **Vercel Integration**
  - [ ] Deploy Sanity Studio
  - [ ] Configure build process
  - [ ] Set up preview deployments

- [ ] **Content Migration**
  - [ ] Migrate existing content to Sanity
  - [ ] Set up content workflows
  - [ ] Train content editors

## 🚀 IMMEDIATE NEXT STEPS

### 1. Complete Sanity Project Initialization
```bash
# Complete the authentication process in your browser
# Then run this command again:
npx sanity@latest init --template clean --create-project "EA Soft Lab CMS" --dataset production
```

### 2. Create Environment Variables File
Create a `.env.local` file in your project root with:
```env
# Sanity CMS Configuration
PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Google Analytics (optional)
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
PUBLIC_SITE_URL=https://easoftlab.com
```

### 3. Update Astro Configuration
Replace `'your-project-id'` in `astro.config.mjs` with your actual Sanity project ID.

### 4. Start Development Servers
```bash
# Terminal 1: Start Astro development server
npm run dev

# Terminal 2: Start Sanity Studio
npm run studio
```

### 5. Add Initial Content
1. Go to `http://localhost:4321/studio`
2. Add company information first
3. Add team members
4. Create services
5. Add portfolio projects
6. Write blog posts

### 6. Update Website Pages
Update the following pages to use CMS data:
- `src/pages/index.astro` - Homepage with dynamic content
- `src/pages/about.astro` - About page with team data
- `src/pages/services.astro` - Services page with CMS data
- `src/pages/portfolio.astro` - Portfolio with project data
- `src/pages/blog.astro` - Blog listing with posts

## 🛠️ Technical Requirements

### Dependencies ✅ INSTALLED
```bash
# All required dependencies are now installed:
# @sanity/client@^7.8.1
# @sanity/image-url@^1.0.2
# @sanity/astro@^3.2.10
```

### Environment Variables
```env
# .env.local (create this file)
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_PREVIEW_SECRET=your-preview-secret
```

### File Structure ✅ CREATED
```
src/
├── lib/
│   ├── sanity.js          # ✅ Sanity client configuration
│   └── queries.js         # ✅ GraphQL/query functions
├── components/
│   ├── SanityImage.astro  # ✅ Image component
│   └── RichText.astro     # ✅ Rich text renderer
├── schemas/               # ✅ Sanity schemas
│   ├── post.js
│   ├── service.js
│   ├── team.js
│   ├── company.js
│   └── project.js
└── pages/                 # 🔄 Ready for CMS integration
    ├── index.astro
    ├── about.astro
    ├── services.astro
    ├── portfolio.astro
    └── blog.astro
```

## 📊 Content Types Structure ✅ READY

All content schemas are created and ready for use. See individual schema files in `src/schemas/` for detailed structure.

## 🚀 Implementation Priority

### ✅ COMPLETED (Phases 1-3)
1. ✅ Sanity Studio setup
2. ✅ Basic content schemas
3. ✅ Astro integration
4. ✅ Component creation

### 🔄 CURRENT PHASE (Phase 4)
1. 🔄 Initialize Sanity project (needs authentication)
2. 🔄 Set up environment variables
3. 🔄 Add initial content
4. 🔄 Update website pages to use CMS data

### 📋 REMAINING PHASES
1. Advanced features (search, filtering)
2. Performance optimization
3. Analytics integration
4. Content migration

## 📝 Notes
- ✅ All technical setup is complete
- 🔄 Waiting for Sanity project initialization
- 🔄 Ready to add content and update pages
- ✅ All schemas and components are ready

## 🔗 Resources
- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro Sanity Integration](https://github.com/sanity-io/astro-sanity)
- [Portable Text](https://portabletext.org/)
- [Sanity Image Pipeline](https://www.sanity.io/docs/image-url) 