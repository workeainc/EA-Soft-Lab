# EA Soft Lab Theme System Guide

## Overview

This guide explains how to use the global theme system that automatically applies the dark gradient theme, seamless background, lazy loading, and animations to all pages on your website.

## 🎨 Theme Components

### 1. ThemeWrapper Component
Automatically applies the dark theme background and seamless container to any content.

```astro
---
import ThemeWrapper from '../components/ThemeWrapper.astro';
---

<ThemeWrapper>
  <!-- Your content here -->
</ThemeWrapper>
```

**Props:**
- `showBackground` (boolean): Enable/disable dark background (default: true)
- `showAnimations` (boolean): Enable/disable animations (default: true)
- `class` (string): Additional CSS classes

### 2. ThemeElements Component
Provides pre-styled UI elements that match the theme.

```astro
---
import ThemeElements from '../components/ThemeElements.astro';
---

<!-- Cards -->
<ThemeElements type="card" class="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</ThemeElements>

<!-- Buttons -->
<ThemeElements type="button" variant="primary" href="/contact">
  Get Started
</ThemeElements>

<ThemeElements type="button" variant="secondary">
  Learn More
</ThemeElements>

<!-- Form Inputs -->
<ThemeElements type="input" label="Name" placeholder="Your name" />

<!-- Badges -->
<ThemeElements type="badge" text="New" />

<!-- Dividers -->
<ThemeElements type="divider" />
```

**Available Types:**
- `card`: Themed card with glassmorphism effect
- `button`: Primary or secondary buttons
- `input`: Themed form inputs
- `badge`: Small themed badges
- `divider`: Themed horizontal dividers

## 📄 Layout Options

### 1. ThemeLayout
Extends the base Layout and automatically applies the theme.

```astro
---
import ThemeLayout from '../layouts/ThemeLayout.astro';
---

<ThemeLayout 
  title="Page Title"
  description="Page description"
  showThemeBackground={true}
  showThemeAnimations={true}
>
  <!-- Your page content -->
</ThemeLayout>
```

### 2. PageTemplate
Template for creating new pages with predefined sections.

```astro
---
import PageTemplate from '../templates/PageTemplate.astro';
---

<PageTemplate 
  title="New Page"
  description="Page description"
  heroTitle="Welcome to Our Page"
  heroSubtitle="This is a subtitle"
  sections={[
    {
      id: "about",
      title: "About Us",
      content: "<p>Your content here...</p>",
      type: "text"
    },
    {
      id: "services",
      title: "Our Services",
      content: "",
      type: "cards"
    }
  ]}
>
  <!-- Additional content -->
</PageTemplate>
```

### 3. BlogTemplate
Template for blog posts and articles.

```astro
---
import BlogTemplate from '../templates/BlogTemplate.astro';
---

<BlogTemplate 
  title="Blog Post Title"
  description="Blog post description"
  author="Author Name"
  publishedTime="2024-01-01"
  tags={["technology", "software"]}
  featuredImage="/path/to/image.jpg"
>
  <!-- Blog content -->
  <p>Your blog content here...</p>
</BlogTemplate>
```

### 4. ServiceTemplate
Template for service pages with features, process, pricing, and testimonials.

```astro
---
import ServiceTemplate from '../templates/ServiceTemplate.astro';
---

<ServiceTemplate 
  title="Web Development Service"
  description="Custom web development solutions"
  serviceName="Web Development"
  serviceIcon="/images/services/web-dev.svg"
  features={[
    {
      title: "Responsive Design",
      description: "Mobile-first responsive websites",
      icon: "/images/icons/responsive.svg"
    },
    {
      title: "SEO Optimized",
      description: "Search engine optimized code",
      icon: "/images/icons/seo.svg"
    }
  ]}
  process={[
    {
      step: 1,
      title: "Discovery",
      description: "Understanding your requirements"
    },
    {
      step: 2,
      title: "Design",
      description: "Creating wireframes and mockups"
    }
  ]}
  pricing={[
    {
      plan: "Basic",
      price: "$2,999",
      features: ["5 Pages", "Responsive Design", "Contact Form"],
      popular: false
    },
    {
      plan: "Professional",
      price: "$5,999",
      features: ["10 Pages", "CMS Integration", "SEO Setup"],
      popular: true
    }
  ]}
  testimonials={[
    {
      name: "John Doe",
      role: "CEO",
      company: "TechCorp",
      content: "Excellent service and results!",
      rating: 5
    }
  ]}
>
  <!-- Additional content if needed -->
</ServiceTemplate>
```

### 5. PortfolioTemplate
Template for portfolio project pages with project details, gallery, and results.

```astro
---
import PortfolioTemplate from '../templates/PortfolioTemplate.astro';
---

<PortfolioTemplate 
  title="E-commerce Platform"
  description="Modern e-commerce solution"
  category="Web Development"
  client="Fashion Retailer"
  duration="3 months"
  technologies={["React", "Node.js", "MongoDB"]}
  projectImage="/images/projects/ecommerce.jpg"
  gallery={[
    "/images/projects/ecommerce-1.jpg",
    "/images/projects/ecommerce-2.jpg"
  ]}
  challenge="Client needed a scalable e-commerce platform"
  solution="Built a modern React-based e-commerce solution"
  results={[
    {
      metric: "Conversion Rate",
      value: "+45%",
      description: "Increase in sales conversion"
    },
    {
      metric: "Page Speed",
      value: "2.1s",
      description: "Average page load time"
    }
  ]}
  testimonial={{
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Fashion Retailer",
    content: "The new platform increased our sales significantly!"
  }}
>
  <!-- Additional content if needed -->
</PortfolioTemplate>
```

### 6. ProductTemplate
Template for product pages with features, specifications, and testimonials.

```astro
---
import ProductTemplate from '../templates/ProductTemplate.astro';
---

<ProductTemplate 
  title="AI Content Generator"
  description="Automated content creation tool"
  productName="ContentAI Pro"
  productImage="/images/products/content-ai.jpg"
  price="$99/month"
  category="SaaS"
  features={[
    {
      title: "AI Writing",
      description: "Generate high-quality content",
      icon: "/images/icons/ai.svg"
    },
    {
      title: "SEO Optimization",
      description: "Built-in SEO tools",
      icon: "/images/icons/seo.svg"
    }
  ]}
  specifications={[
    { name: "API Calls", value: "10,000/month" },
    { name: "Languages", value: "15+ supported" },
    { name: "Integrations", value: "WordPress, Shopify" }
  ]}
  benefits={[
    {
      title: "Save Time",
      description: "Generate content 10x faster"
    },
    {
      title: "Improve SEO",
      description: "Optimize for search engines"
    }
  ]}
  demo={{
    url: "/demo",
    title: "Try Demo"
  }}
  screenshots={[
    "/images/products/screenshot-1.jpg",
    "/images/products/screenshot-2.jpg"
  ]}
  testimonials={[
    {
      name: "Mike Chen",
      role: "Content Manager",
      company: "Digital Agency",
      content: "This tool revolutionized our content creation!",
      rating: 5
    }
  ]}
  faq={[
    {
      question: "How does the AI work?",
      answer: "Our AI uses advanced language models to generate human-like content."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time."
    }
  ]}
>
  <!-- Additional content if needed -->
</ProductTemplate>
```

## 🎯 CSS Classes

### Background Classes
- `.theme-dark-bg`: Applies the dark gradient background
- `.theme-seamless-container`: Creates a seamless container

### Text Classes
- `.theme-text-primary`: White text
- `.theme-text-secondary`: Semi-transparent white text
- `.theme-text-muted`: Muted text color
- `.theme-gradient-text`: Gradient text effect

### Component Classes
- `.theme-card`: Themed card with glassmorphism
- `.theme-btn-primary`: Primary button
- `.theme-btn-secondary`: Secondary button
- `.theme-input`: Themed form input
- `.theme-badge`: Themed badge
- `.theme-divider`: Themed divider

### Animation Classes
- `.animate-delay-100` to `.animate-delay-800`: Staggered animation delays
- `data-lazy-load`: Enables lazy loading
- `data-lazy-animate`: Enables lazy animation

## 🚀 Creating New Pages

### Method 1: Using ThemeLayout (Recommended)
```astro
---
import ThemeLayout from '../layouts/ThemeLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<ThemeLayout title="New Page" description="Page description">
  <Header />
  
  <div class="theme-section pt-24 pb-16" data-lazy-load>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold theme-text-primary mb-6" data-lazy-animate>
        Page Title
      </h1>
      <p class="theme-text-secondary" data-lazy-animate>
        Page content here...
      </p>
    </div>
  </div>
  
  <Footer />
</ThemeLayout>
```

### Method 2: Using PageTemplate
```astro
---
import PageTemplate from '../templates/PageTemplate.astro';
---

<PageTemplate 
  title="New Page"
  heroTitle="Welcome"
  heroSubtitle="This is a new page"
  sections={[
    {
      id: "content",
      title: "Main Content",
      content: "<p>Your content here...</p>",
      type: "text"
    }
  ]}
>
  <!-- Additional content if needed -->
</PageTemplate>
```

## 📝 Creating Blog Posts

```astro
---
import BlogTemplate from '../templates/BlogTemplate.astro';
---

<BlogTemplate 
  title="My Blog Post"
  description="This is a blog post about technology"
  author="John Doe"
  publishedTime="2024-01-15"
  tags={["technology", "web development"]}
>
  <h2>Introduction</h2>
  <p>Your blog content here...</p>
  
  <h2>Main Content</h2>
  <p>More content...</p>
</BlogTemplate>
```

## 🛠️ Creating Service Pages

```astro
---
import ServiceTemplate from '../templates/ServiceTemplate.astro';
---

<ServiceTemplate 
  title="Custom Software Development"
  description="End-to-end custom software solutions"
  serviceName="Custom Software Development"
  features={[
    {
      title: "Scalable Architecture",
      description: "Built to grow with your business"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical support"
    }
  ]}
  process={[
    {
      step: 1,
      title: "Requirements Analysis",
      description: "Understanding your business needs"
    },
    {
      step: 2,
      title: "Design & Development",
      description: "Building your custom solution"
    }
  ]}
>
  <!-- Additional service content -->
</ServiceTemplate>
```

## 🎨 Creating Portfolio Pages

```astro
---
import PortfolioTemplate from '../templates/PortfolioTemplate.astro';
---

<PortfolioTemplate 
  title="Healthcare Management System"
  description="Comprehensive healthcare management solution"
  category="Enterprise Software"
  client="Regional Hospital"
  duration="6 months"
  technologies={["React", "Node.js", "PostgreSQL"]}
  challenge="Complex healthcare workflows and compliance requirements"
  solution="Built a comprehensive system with role-based access and audit trails"
  results={[
    {
      metric: "Efficiency Gain",
      value: "+60%",
      description: "Reduced administrative overhead"
    }
  ]}
>
  <!-- Additional project details -->
</PortfolioTemplate>
```

## 📦 Creating Product Pages

```astro
---
import ProductTemplate from '../templates/ProductTemplate.astro';
---

<ProductTemplate 
  title="Project Management Tool"
  description="Streamline your project workflows"
  productName="ProjectFlow"
  price="$29/month"
  category="SaaS"
  features={[
    {
      title: "Task Management",
      description: "Organize and track project tasks"
    },
    {
      title: "Team Collaboration",
      description: "Real-time team communication"
    }
  ]}
  specifications={[
    { name: "Users", value: "Unlimited" },
    { name: "Projects", value: "Unlimited" },
    { name: "Storage", value: "100GB" }
  ]}
>
  <!-- Additional product information -->
</ProductTemplate>
```

## ⚙️ Theme Configuration

The theme configuration is centralized in `src/lib/themeConfig.ts`. You can modify:

- **Colors**: Primary, secondary, and accent color palettes
- **Background**: Gradient colors and positions
- **Components**: Card, button, input, and badge styles
- **Animations**: Duration, easing, and delay settings
- **Typography**: Font families, sizes, and weights

## 🎨 Customization

### Changing Colors
Edit `src/lib/themeConfig.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

### Adding New Components
1. Add styles to `src/styles/global.css`
2. Add component logic to `src/components/ThemeElements.astro`
3. Update `src/lib/themeConfig.ts` if needed

### Custom Animations
Add to `tailwind.config.mjs`:
```javascript
animation: {
  'your-animation': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  }
}
```

## 🔧 Best Practices

1. **Always use theme classes** instead of custom colors
2. **Use lazy loading** for better performance: `data-lazy-load` and `data-lazy-animate`
3. **Stagger animations** using delay classes: `animate-delay-200`
4. **Use ThemeElements** for consistent UI components
5. **Keep sections as divs** for seamless background
6. **Test on mobile** - theme is fully responsive

## 📱 Responsive Design

The theme automatically adapts to different screen sizes:
- Mobile: Optimized spacing and typography
- Tablet: Balanced layout
- Desktop: Full feature set

## ♿ Accessibility

The theme includes:
- High contrast text colors
- Focus indicators for interactive elements
- Reduced motion support for users with motion sensitivity
- Semantic HTML structure

## 🚀 Performance

The theme system is optimized for:
- **Lazy loading**: Content loads as you scroll
- **Smooth animations**: Hardware-accelerated transitions
- **Minimal CSS**: Efficient utility classes
- **Fast rendering**: Optimized selectors and properties

## 📊 SEO Benefits

The theme system provides:
- **Structured data**: Automatic schema markup
- **Fast loading**: Optimized assets and lazy loading
- **Mobile-friendly**: Responsive design
- **Accessibility**: Better user experience signals

## 🎯 Quick Start

1. **For new pages**: Use `ThemeLayout` or `PageTemplate`
2. **For blog posts**: Use `BlogTemplate`
3. **For components**: Use `ThemeElements`
4. **For custom styling**: Use theme CSS classes

## 📞 Support

If you need help with the theme system:
1. Check this guide first
2. Look at existing pages for examples
3. Review the theme configuration files
4. Test changes on different devices

---

**Remember**: The theme system is designed to be consistent, performant, and easy to use. Always use the provided components and classes for the best results!
