import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'oxjbgkqf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN // You'll need to set this environment variable
})

const localSEOData = {
  _type: 'localSEO',
  businessInfo: {
    name: "EA Soft Lab",
    address: "123 Business Street, Suite 100",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    email: "contact@easoftlab.com",
    website: "https://easoftlab.com",
    description: "Leading software development company specializing in web applications, mobile apps, and digital transformation solutions.",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    founded: "2020",
    employees: "25-50",
    services: [
      "Web Development",
      "Mobile App Development", 
      "Custom Software Development",
      "UI/UX Design",
      "SaaS Development",
      "Digital Transformation"
    ],
    certifications: [
      "ISO 27001 Information Security",
      "AWS Advanced Consulting Partner",
      "Google Cloud Partner",
      "Microsoft Gold Partner"
    ],
    awards: [
      "Best Software Development Company 2024",
      "Top 10 Web Development Agencies",
      "Excellence in Digital Innovation"
    ],
    serviceAreas: [
      { city: "New York", state: "NY", radius: "50 miles" },
      { city: "Manhattan", state: "NY", radius: "25 miles" },
      { city: "Brooklyn", state: "NY", radius: "30 miles" },
      { city: "Queens", state: "NY", radius: "35 miles" },
      { city: "Bronx", state: "NY", radius: "40 miles" }
    ],
    socialProfiles: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/easoftlab" },
      { platform: "Twitter", url: "https://twitter.com/easoftlab" },
      { platform: "Facebook", url: "https://facebook.com/easoftlab" },
      { platform: "Instagram", url: "https://instagram.com/easoftlab" }
    ]
  },
  googleMyBusiness: {
    views: 15420,
    clicks: 3240,
    calls: 890,
    directionRequests: 1560,
    reviews: 47,
    averageRating: 4.8
  },
  localRankings: [
    {
      keyword: "software development company near me",
      position: 3,
      searchVolume: 1200,
      change: 2
    },
    {
      keyword: "web development services NYC",
      position: 1,
      searchVolume: 890,
      change: 0
    },
    {
      keyword: "mobile app development New York",
      position: 5,
      searchVolume: 650,
      change: -1
    },
    {
      keyword: "custom software development NYC",
      position: 2,
      searchVolume: 450,
      change: 1
    },
    {
      keyword: "UI/UX design services near me",
      position: 4,
      searchVolume: 320,
      change: 3
    }
  ],
  localCompetitors: [
    {
      name: "Tech Solutions NYC",
      distance: 2.5,
      rating: 4.6,
      reviews: 89,
      services: ["Web Development", "Mobile Apps", "Cloud Services"]
    },
    {
      name: "Digital Innovations Lab",
      distance: 4.1,
      rating: 4.4,
      reviews: 67,
      services: ["Software Development", "AI Solutions", "Consulting"]
    },
    {
      name: "Manhattan Web Works",
      distance: 1.8,
      rating: 4.7,
      reviews: 124,
      services: ["Web Design", "E-commerce", "SEO"]
    },
    {
      name: "Brooklyn Tech Studio",
      distance: 3.2,
      rating: 4.3,
      reviews: 45,
      services: ["Mobile Development", "Startup Solutions", "MVP Development"]
    },
    {
      name: "Queens Digital Agency",
      distance: 5.7,
      rating: 4.5,
      reviews: 78,
      services: ["Full-Stack Development", "Digital Marketing", "Analytics"]
    }
  ],
  localContent: [
    {
      title: "Complete Guide to Software Development in NYC",
      type: "Blog Post",
      performance: 85,
      localKeywords: ["NYC software development", "New York tech companies", "Manhattan developers"]
    },
    {
      title: "Top 10 Mobile App Development Companies in New York",
      type: "Landing Page",
      performance: 92,
      localKeywords: ["mobile app development NYC", "iOS development New York", "Android apps NYC"]
    },
    {
      title: "Local Business Software Solutions",
      type: "Service Page",
      performance: 78,
      localKeywords: ["business software NYC", "enterprise solutions New York", "custom software development"]
    }
  ],
  reviews: [
    {
      author: "Sarah Johnson",
      rating: 5,
      review: "EA Soft Lab delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding.",
      date: "2024-01-15",
      platform: "Google"
    },
    {
      author: "Michael Chen",
      rating: 5,
      review: "The team at EA Soft Lab transformed our business with a custom CRM system. Professional, responsive, and highly skilled developers.",
      date: "2024-01-10",
      platform: "Google"
    },
    {
      author: "Emily Rodriguez",
      rating: 5,
      review: "Outstanding mobile app development services. The app they built for us has significantly improved our customer engagement.",
      date: "2024-01-05",
      platform: "Google"
    },
    {
      author: "David Thompson",
      rating: 4,
      review: "Great web development services. The team was professional and delivered on time. Would recommend for any business looking for quality development.",
      date: "2023-12-28",
      platform: "Google"
    },
    {
      author: "Lisa Wang",
      rating: 5,
      review: "Excellent UI/UX design work. They really understood our brand and created a beautiful, functional website that our customers love.",
      date: "2023-12-20",
      platform: "Google"
    }
  ],
  localSEOScore: {
    overallScore: 78,
    gmbScore: 85,
    rankingsScore: 72,
    citationsScore: 65,
    reviewsScore: 88
  },
  recommendations: {
    immediate: [
      "Optimize Google My Business profile with complete information",
      "Add more customer reviews and respond to existing ones",
      "Create location-specific landing pages",
      "Improve local keyword targeting",
      "Add business hours and service areas"
    ],
    longTerm: [
      "Build local citations and directory listings",
      "Create local content strategy",
      "Develop local link building campaign",
      "Implement local schema markup",
      "Monitor and respond to all reviews"
    ]
  },
  lastUpdated: new Date().toISOString()
}

async function seedLocalSEO() {
  try {
    console.log('🌱 Seeding Local SEO data...')
    
    // Check if Local SEO document already exists
    const existingDocs = await client.fetch(`*[_type == "localSEO"]`)
    
    if (existingDocs.length > 0) {
      console.log('📝 Updating existing Local SEO document...')
      const docId = existingDocs[0]._id
      await client.createOrReplace({
        ...localSEOData,
        _id: docId
      })
    } else {
      console.log('📝 Creating new Local SEO document...')
      await client.create(localSEOData)
    }
    
    console.log('✅ Local SEO data seeded successfully!')
    console.log('📊 Dashboard is now available in Sanity Studio')
    console.log('🔗 Access your Local SEO Dashboard at: http://localhost:3333')
    
  } catch (error) {
    console.error('❌ Error seeding Local SEO data:', error)
    console.log('💡 Make sure to set your SANITY_TOKEN environment variable')
  }
}

// Run the seed function
seedLocalSEO()
