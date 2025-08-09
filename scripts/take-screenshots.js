import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Define the pages to screenshot
const pages = [
  {
    name: 'homepage',
    url: 'https://www.easoftlab.com',
    description: 'Homepage with hero section'
  },
  {
    name: 'services',
    url: 'https://www.easoftlab.com/services',
    description: 'Services overview page'
  },
  {
    name: 'portfolio',
    url: 'https://www.easoftlab.com/portfolio',
    description: 'Portfolio and work showcase'
  },
  {
    name: 'about',
    url: 'https://www.easoftlab.com/about',
    description: 'About page with company info'
  },
  {
    name: 'contact',
    url: 'https://www.easoftlab.com/contact',
    description: 'Contact page with form'
  },
  {
    name: 'web-development',
    url: 'https://www.easoftlab.com/services/web-development',
    description: 'Web development service page'
  },
  {
    name: 'mobile-development',
    url: 'https://www.easoftlab.com/services/mobile-development',
    description: 'Mobile development service page'
  },
  {
    name: 'ui-ux-design',
    url: 'https://www.easoftlab.com/services/ui-ux-design',
    description: 'UI/UX design service page'
  },
  {
    name: 'blog',
    url: 'https://www.easoftlab.com/blog',
    description: 'Blog page'
  },
  {
    name: 'industries',
    url: 'https://www.easoftlab.com/industries',
    description: 'Industries page'
  }
];

// Define viewport sizes
const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

async function takeScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const page of pages) {
      console.log(`📸 Capturing ${page.name}...`);
      
      const pageInstance = await browser.newPage();
      
      // Set viewport and user agent
      await pageInstance.setViewport({ width: 1920, height: 1080 });
      await pageInstance.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      try {
        // Navigate to the page
        await pageInstance.goto(page.url, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        
        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Take screenshot for each viewport
        for (const viewport of viewports) {
          await pageInstance.setViewport({ 
            width: viewport.width, 
            height: viewport.height 
          });
          
          // Wait for responsive layout to adjust
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const filename = `${page.name}-${viewport.name}.png`;
          const filepath = path.join(screenshotsDir, filename);
          
          await pageInstance.screenshot({
            path: filepath,
            fullPage: true
          });
          
          console.log(`  ✅ Saved: ${filename}`);
        }
        
        // For mobile viewport, also capture hamburger menu
        if (page.name === 'homepage') {
          await pageInstance.setViewport({ width: 375, height: 667 });
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Click hamburger menu
          const hamburgerButton = await pageInstance.$('#mobile-menu-button');
          if (hamburgerButton) {
            await hamburgerButton.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const filename = `${page.name}-mobile-menu-open.png`;
            const filepath = path.join(screenshotsDir, filename);
            
            await pageInstance.screenshot({
              path: filepath,
              fullPage: true
            });
            
            console.log(`  ✅ Saved: ${filename}`);
          }
        }
        
      } catch (error) {
        console.error(`❌ Error capturing ${page.name}:`, error.message);
      } finally {
        await pageInstance.close();
      }
    }
    
    console.log('\n🎉 Screenshot capture completed!');
    console.log(`📁 Screenshots saved in: ${screenshotsDir}`);
    
    // Generate a summary report
    const report = generateReport();
    const reportPath = path.join(screenshotsDir, 'screenshot-report.md');
    fs.writeFileSync(reportPath, report);
    console.log(`📋 Report generated: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
}

function generateReport() {
  const timestamp = new Date().toISOString();
  let report = `# Website Screenshots Report\n\n`;
  report += `**Generated:** ${timestamp}\n\n`;
  report += `## 📸 Screenshots Captured\n\n`;
  
  for (const page of pages) {
    report += `### ${page.description}\n`;
    report += `- **Page:** ${page.name}\n`;
    report += `- **URL:** ${page.url}\n`;
    report += `- **Screenshots:**\n`;
    
    for (const viewport of viewports) {
      report += `  - \`${page.name}-${viewport.name}.png\` (${viewport.width}x${viewport.height})\n`;
    }
    
    if (page.name === 'homepage') {
      report += `  - \`${page.name}-mobile-menu-open.png\` (Mobile menu open)\n`;
    }
    
    report += '\n';
  }
  
  report += `## 📱 Viewport Sizes\n\n`;
  report += `- **Desktop:** 1920x1080\n`;
  report += `- **Tablet:** 768x1024\n`;
  report += `- **Mobile:** 375x667\n\n`;
  
  report += `## 🎯 LinkedIn Post Recommendations\n\n`;
  report += `### Key Screenshots for LinkedIn:\n`;
  report += `1. **homepage-desktop.png** - Hero section and main value proposition\n`;
  report += `2. **services-desktop.png** - Showcase all your services\n`;
  report += `3. **portfolio-desktop.png** - Highlight your best work\n`;
  report += `4. **homepage-mobile.png** - Show mobile responsiveness\n`;
  report += `5. **homepage-mobile-menu-open.png** - Demonstrate mobile UX\n`;
  report += `6. **contact-desktop.png** - Professional contact page\n\n`;
  
  report += `### LinkedIn Post Content:\n`;
  report += `\`\`\`\n`;
  report += `🚀 Excited to announce the launch of our new website!\n\n`;
  report += `After months of hard work, EA Soft Lab is now live with a modern, responsive design that showcases our innovative software solutions.\n\n`;
  report += `✨ What's new:\n`;
  report += `• Modern, mobile-first design\n`;
  report += `• Comprehensive service showcase\n`;
  report += `• Portfolio of successful projects\n`;
  report += `• Easy contact and consultation booking\n\n`;
  report += `🌐 Check it out: www.easoftlab.com\n\n`;
  report += `#SoftwareDevelopment #WebDevelopment #Innovation #TechStartup #DigitalTransformation\n`;
  report += `\`\`\`\n`;
  
  return report;
}

// Run the script
takeScreenshots().catch(console.error);
