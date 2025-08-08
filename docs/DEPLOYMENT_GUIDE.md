# Deployment Guide - EA Soft Lab Website

This guide covers setting up CI/CD pipeline with GitHub Actions and deploying to Vercel.

## 🚀 Quick Start

### 1. GitHub Repository Setup

1. **Create a new repository on GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/ea-soft-lab-website.git
   git push -u origin main
   ```

2. **Set up GitHub Secrets**
   Go to your repository → Settings → Secrets and variables → Actions
   Add the following secrets:
   - `VERCEL_TOKEN` - Your Vercel API token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

### 2. Vercel Setup

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Get Vercel Configuration**
   - Go to your Vercel dashboard
   - Copy the Project ID and Organization ID
   - Generate a new API token

## 🔧 CI/CD Pipeline Configuration

### GitHub Actions Workflow

The CI/CD pipeline includes:

1. **Lint and Test** - Code quality checks
2. **Security Checks** - Vulnerability scanning
3. **Performance Testing** - Lighthouse CI
4. **Deploy to Production** - Main branch deployments
5. **Deploy Preview** - Pull request previews

### Environment Variables

Set these in your Vercel project:

```bash
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code linted and formatted
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Environment variables configured

### Post-Deployment
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Forms working
- [ ] SEO meta tags present
- [ ] Performance scores acceptable
- [ ] Mobile responsiveness verified

## 🔍 Monitoring and Analytics

### Performance Monitoring
- **Core Web Vitals** - Track LCP, FID, CLS
- **Lighthouse Scores** - Monitor performance, accessibility, SEO
- **Error Tracking** - Set up error monitoring

### Analytics Setup
1. **Google Analytics 4**
2. **Google Search Console**
3. **Vercel Analytics**

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   npm run build
   npm run test
   npm run lint
   ```

2. **Vercel Deployment Issues**
   - Check environment variables
   - Verify build command
   - Check function timeout limits

3. **Sanity CMS Issues**
   - Verify project ID
   - Check API permissions
   - Test content queries

## 🔄 Deployment Workflow

### Development
```bash
npm run dev          # Start development server
npm run test         # Run tests
npm run lint         # Check code quality
npm run build        # Build for production
```

### Production Deployment
1. Push to `main` branch
2. GitHub Actions automatically:
   - Runs tests
   - Performs security checks
   - Deploys to Vercel
   - Runs performance tests

### Preview Deployments
- Every pull request gets a preview deployment
- Automatic testing and quality checks
- Performance monitoring

## 📊 Performance Optimization

### Build Optimization
- Image optimization with Sharp
- CSS and JS minification
- Asset compression
- CDN distribution

### Runtime Optimization
- Lazy loading
- Code splitting
- Caching strategies
- Service worker

## 🔒 Security

### Security Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

### Environment Security
- Secure environment variables
- API key rotation
- Access control
- Regular security audits

## 📈 Scaling

### Performance Scaling
- CDN distribution
- Edge functions
- Database optimization
- Caching strategies

### Traffic Scaling
- Auto-scaling infrastructure
- Load balancing
- Database scaling
- Monitoring and alerts

## 🎯 Best Practices

### Code Quality
- Follow ESLint rules
- Use Prettier formatting
- Write comprehensive tests
- Document code changes

### Deployment
- Use semantic versioning
- Create meaningful commit messages
- Review pull requests
- Monitor deployment health

### Maintenance
- Regular dependency updates
- Security patches
- Performance monitoring
- Backup strategies

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Test locally with `npm run build`
4. Verify environment variables
5. Check Sanity CMS connectivity

---

**Last Updated:** $(date)
**Version:** 1.0.0
