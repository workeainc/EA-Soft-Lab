# 🔄 Automatic SEO System

## Overview

The EA Soft Lab website now features an **automatic SEO system** that dynamically generates sitemap.xml and robots.txt files. This system automatically detects new pages and includes them in SEO files without manual intervention.

## 🎯 **How It Works**

### **1. Automatic Page Discovery**

The system uses `globby` to scan the `src/pages/` directory and automatically discovers:
- ✅ All `.astro` files
- ✅ All `.js` files  
- ✅ All `.ts` files
- ✅ All `.md` files
- ✅ All `.mdx` files

### **2. CMS Integration**

The system also queries Sanity CMS to discover:
- ✅ Blog posts (`_type == "post" || _type == "blog"`)
- ✅ Case studies (`_type == "caseStudy"`)
- ✅ Any other content types you define

### **3. Smart Priority Assignment**

Pages are automatically assigned priorities based on their path:

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | daily |
| Services/Contact | 0.9 | weekly/monthly |
| About/Portfolio/Industries/Products | 0.8 | monthly/weekly |
| Industry sub-pages | 0.7 | weekly |
| Blog posts | 0.6 | weekly |
| Terms/Privacy | 0.5 | monthly |

## 📁 **File Structure**

```
src/
├── pages/
│   ├── sitemap.xml.js          # Dynamic sitemap generator
│   ├── robots.txt.js           # Dynamic robots.txt generator
│   └── [your pages...]
├── utils/
│   └── pageDiscovery.js        # Core discovery logic
└── scripts/
    └── update-seo-files.js     # Manual update script
```

## 🚀 **Usage**

### **Automatic (Default)**
The system works automatically during build and development. No manual intervention needed.

### **Manual Update**
If you need to manually update SEO files:

```bash
npm run update-seo
```

This will:
- Discover all pages
- Generate new sitemap.xml
- Generate new robots.txt
- Show a list of discovered pages

## 🔧 **Configuration**

### **Adding New Page Types**

To add new CMS content types, edit `src/utils/pageDiscovery.js`:

```javascript
// Add new CMS queries
const newContentType = await client.fetch(`
  *[_type == "yourContentType"] {
    "slug": slug.current,
    "lastmod": _updatedAt,
    "changefreq": "weekly",
    "priority": 0.6
  }
`);
```

### **Custom Priority Rules**

To modify priority rules, edit the `getPriority()` function in `src/utils/pageDiscovery.js`:

```javascript
function getPriority(path) {
  if (path === 'src/pages/index.astro') return 1.0;
  if (path.includes('/your-new-section/')) return 0.8;
  // Add your custom rules
  return 0.6; // Default
}
```

## 📊 **Features**

### **✅ Automatic Detection**
- Scans all page files automatically
- Queries CMS for dynamic content
- Handles nested directories
- Ignores API routes and private files

### **✅ Smart Filtering**
- Excludes API routes (`/api/`)
- Excludes admin areas (`/studio/`, `/admin/`)
- Excludes dynamic routes with parameters
- Includes only public pages

### **✅ SEO Optimization**
- Proper XML sitemap format
- Comprehensive robots.txt rules
- Bot-specific crawling rules
- Security headers for malicious bots

### **✅ Error Handling**
- Graceful fallbacks if CMS is unavailable
- Error logging for debugging
- Continues working even with partial failures

## 🔍 **Testing**

### **Check Sitemap**
Visit: `http://localhost:4321/sitemap.xml`

### **Check Robots.txt**
Visit: `http://localhost:4321/robots.txt`

### **Manual Discovery**
```bash
npm run update-seo
```

## 📈 **Benefits**

### **For Developers**
- ✅ No manual sitemap maintenance
- ✅ Automatic CMS integration
- ✅ Consistent SEO structure
- ✅ Easy to extend

### **For SEO**
- ✅ Always up-to-date sitemap
- ✅ Proper crawl directives
- ✅ Optimized for search engines
- ✅ Supports all major bots

### **For Content Management**
- ✅ New pages automatically included
- ✅ CMS content automatically discovered
- ✅ No manual updates needed
- ✅ Scalable solution

## 🛠 **Troubleshooting**

### **Pages Not Appearing**
1. Check file is in `src/pages/` directory
2. Verify file extension is supported
3. Ensure file is not in excluded directories
4. Check console for error messages

### **CMS Content Not Found**
1. Verify Sanity connection
2. Check content type names in queries
3. Ensure content is published
4. Check API token permissions

### **Build Errors**
1. Check `globby` package is installed
2. Verify file permissions
3. Check for syntax errors in discovery logic
4. Review error logs

## 🔄 **Future Enhancements**

### **Planned Features**
- [ ] Image sitemap generation
- [ ] Video sitemap support
- [ ] News sitemap for blog posts
- [ ] Automatic social media meta tags
- [ ] Structured data generation
- [ ] Performance monitoring integration

### **CMS Extensions**
- [ ] Support for multiple CMS platforms
- [ ] Custom content type definitions
- [ ] Advanced filtering options
- [ ] Content scheduling integration

## 📚 **Related Documentation**

- [Theme Implementation Guide](./THEME_IMPLEMENTATION_GUIDE.md)
- [SEO Improvements Roadmap](./SEO_IMPROVEMENTS_ROADMAP.md)
- [CMS Authentication Fix](./CMS_AUTHENTICATION_FIX.md)

---

**🎯 Status: ✅ ACTIVE - Automatically discovering and including all pages**
**📅 Last Updated: August 9, 2025**
**🔄 Auto-updates: ✅ ENABLED**
