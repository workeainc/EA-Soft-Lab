# Sanity Studio Troubleshooting Guide

## Issue: 404 Error when accessing `/studio`

### Problem
You're getting a 404 error when trying to access `https://easoftlab.com/studio/index.html`

### Root Cause
The Sanity Studio is not properly deployed or configured for web access.

## Solutions

### 1. Deploy Sanity Studio

First, deploy the Sanity Studio to make it accessible:

```bash
# Set your Sanity API token (required for deployment)
export SANITY_API_TOKEN="your_sanity_api_token_here"

# Deploy the studio
npm run deploy:studio
```

### 2. Environment Variables

Make sure these environment variables are set in your Vercel deployment:

- `PUBLIC_SANITY_PROJECT_ID`: `oxjbgkqf`
- `PUBLIC_SANITY_DATASET`: `production`
- `SANITY_API_TOKEN`: Your Sanity API token (for write operations)

### 3. Test Sanity Connection

Test if your Sanity project is accessible:

```bash
# Test the API connection
curl https://oxjbgkqf.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "company"][0]
```

### 4. Alternative Access Methods

If the web studio doesn't work, you can access Sanity Studio through:

#### Option A: Local Development
```bash
npm run studio
```
Then visit `http://localhost:3333`

#### Option B: Sanity Management API
Visit: https://www.sanity.io/manage

### 5. Verify Project Configuration

Check that all files use the correct project ID:

- ✅ `astro.config.mjs`: `oxjbgkqf`
- ✅ `sanity.config.js`: `oxjbgkqf`
- ✅ `src/lib/sanity.js`: `oxjbgkqf`
- ✅ `scripts/seed-content.js`: `oxjbgkqf`

### 6. Seed Content (Optional)

If you need to populate your CMS with sample data:

```bash
npm run test:sanity
```

## Common Issues

### Issue: "Studio not accessible"
**Solution**: Deploy the studio using `npm run deploy:studio`

### Issue: "Authentication failed"
**Solution**: Check your `SANITY_API_TOKEN` is correct and has write permissions

### Issue: "Project not found"
**Solution**: Verify the project ID `oxjbgkqf` exists in your Sanity account

### Issue: "CORS errors"
**Solution**: This is normal for local development. Use the deployed studio instead.

## Next Steps

1. Deploy the studio: `npm run deploy:studio`
2. Test the connection: Visit `/api/sanity-test`
3. Access the studio: Visit `https://easoftlab.com/studio`
4. Start managing content!

## Support

If issues persist:
1. Check Sanity documentation: https://www.sanity.io/docs
2. Verify project settings in Sanity dashboard
3. Check Vercel deployment logs
4. Test with local development first
