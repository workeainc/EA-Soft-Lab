# EA Soft Lab Website

A modern, SEO-optimized website for EA Soft Lab, a software development company. Built with Astro.js for optimal performance and search engine visibility.

## 🚀 Features

- **Ultra-fast Performance**: Built with Astro.js for minimal JavaScript and optimal Core Web Vitals
- **SEO Optimized**: Complete meta tags, structured data, and semantic HTML
- **Mobile-First Design**: Responsive design that works perfectly on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **PWA Ready**: Progressive Web App features for enhanced user experience

## 🛠️ Tech Stack

- **Framework**: [Astro.js](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Astro Icon](https://github.com/natemoo-re/astro-icon) - Icon component library
- **Images**: [@astrojs/image](https://docs.astro.build/en/guides/images/) - Image optimization
- **SEO**: [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Automatic sitemap generation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.astro    # Navigation header
│   └── Footer.astro    # Site footer
├── layouts/            # Page layouts
│   └── Layout.astro    # Main layout with SEO meta tags
└── pages/              # Website pages
    ├── index.astro     # Homepage
    ├── services.astro  # Services page
    └── contact.astro   # Contact page
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ea-soft-lab-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... more shades
    900: '#1e3a8a',
  }
}
```

### Content
- Update company information in `src/layouts/Layout.astro`
- Modify services in `src/pages/services.astro`
- Update contact details in `src/pages/contact.astro`

### SEO
- Update meta tags in `src/layouts/Layout.astro`
- Modify structured data for better search engine understanding
- Update sitemap configuration in `astro.config.mjs`

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Astro.js and deploy
3. Your site will be available at `https://your-project.vercel.app`

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms
The static files in the `dist` folder can be deployed to any static hosting service.

## 📊 Performance Optimization

- **Image Optimization**: All images are automatically optimized using `@astrojs/image`
- **Lazy Loading**: Images and components load only when needed
- **Minification**: CSS and JavaScript are minified in production
- **Caching**: Proper cache headers for static assets

## 🔍 SEO Features

- **Meta Tags**: Complete Open Graph and Twitter Card meta tags
- **Structured Data**: JSON-LD schema markup for better search understanding
- **Sitemap**: Automatic XML sitemap generation
- **Canonical URLs**: Proper canonical URL handling
- **Robots.txt**: Search engine crawling instructions

## 📱 PWA Features

- **Service Worker**: Offline functionality and caching
- **Web App Manifest**: App-like installation experience
- **Responsive Design**: Works on all screen sizes

## 🛡️ Security

- **HTTPS**: Secure connections for all external resources
- **CSP Headers**: Content Security Policy implementation
- **Input Validation**: Form validation and sanitization

## 📈 Analytics

Google Analytics is configured in the layout. Update the `GA_MEASUREMENT_ID` in `src/layouts/Layout.astro` with your actual Google Analytics ID.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: contact@easoftlab.com
- Website: https://easoftlab.com

## 🔄 Updates

Keep your dependencies updated:
```bash
npm update
```

Check for Astro.js updates:
```bash
npm run astro update
```

---

Built with ❤️ by EA Soft Lab 