# 🚀 Deployment Steps for EA Soft Lab Website

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository name**: `ea-soft-lab-website`
5. **Description**: `EA Soft Lab - Professional Software Development Company Website`
6. **Make it Public** (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. **Click "Create repository"**

## Step 2: Connect Your Local Project to GitHub

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ea-soft-lab-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set Up Vercel Deployment

1. **Go to Vercel.com** and sign in (use your GitHub account)
2. **Click "New Project"**
3. **Import your GitHub repository**: `ea-soft-lab-website`
4. **Framework Preset**: Select "Astro"
5. **Root Directory**: Leave as default (`.`)
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`
9. **Click "Deploy"**

## Step 4: Configure Environment Variables in Vercel

After deployment, go to your Vercel project settings:

1. **Go to Settings → Environment Variables**
2. **Add these variables**:
   - `SANITY_PROJECT_ID`: Your Sanity project ID
   - `SANITY_DATASET`: `production`
   - `SANITY_API_VERSION`: `2024-01-01`
   - `SANITY_TOKEN`: Your Sanity API token

## Step 5: Set Up GitHub Secrets (for CI/CD)

1. **Go to your GitHub repository**
2. **Click Settings → Secrets and variables → Actions**
3. **Add these repository secrets**:
   - `VERCEL_TOKEN`: Get from Vercel dashboard → Settings → Tokens
   - `VERCEL_ORG_ID`: Get from Vercel dashboard → Settings → General
   - `VERCEL_PROJECT_ID`: Get from Vercel dashboard → Settings → General

## Step 6: Test Your Deployment

1. **Visit your Vercel URL** (something like `https://ea-soft-lab-website.vercel.app`)
2. **Check that all pages load correctly**
3. **Test the contact form**
4. **Verify images are loading**

## Step 7: Connect Custom Domain (Optional)

1. **In Vercel dashboard**, go to Settings → Domains
2. **Add your custom domain** (e.g., `easoftlab.com`)
3. **Follow Vercel's DNS instructions**

## ✅ What's Already Set Up

- ✅ **CI/CD Pipeline**: GitHub Actions will automatically test and deploy
- ✅ **SEO Optimization**: Meta tags, structured data, sitemap
- ✅ **Performance**: Optimized images, lazy loading, caching
- ✅ **Security**: HTTPS, security headers
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **PWA Features**: Service worker, web app manifest

## 🎯 Next Steps After Deployment

Once your site is live, we can:
1. **Set up Google Analytics**
2. **Configure Google Search Console**
3. **Add more content and blog posts**
4. **Implement advanced SEO features**
5. **Add more interactive features**

## 📞 Need Help?

If you encounter any issues during these steps, let me know and I'll help you troubleshoot!
