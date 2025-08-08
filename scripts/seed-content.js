import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'oxjbgkqf',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Required for write operations
})

// Sample company information
const companyData = {
  _type: 'company',
  name: 'EA Soft Lab',
  tagline: 'Innovative Software Solutions for Modern Businesses',
  description: 'We specialize in custom software development, web applications, and digital transformation services that drive business growth and operational efficiency.',
  mission: 'To transform businesses through innovative software solutions that drive growth, efficiency, and competitive advantage.',
  vision: 'To be the trusted technology partner for businesses worldwide, known for our innovative solutions, exceptional service, and commitment to client success.',
  values: [
    {
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.',
      icon: 'lightbulb'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and close collaboration with our clients.',
      icon: 'users'
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in everything we do.',
      icon: 'star'
    }
  ],
  contactInfo: {
    email: 'contact@easoftlab.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA'
  },
  socialMedia: {
    linkedin: 'https://linkedin.com/company/easoftlab',
    twitter: 'https://twitter.com/easoftlab',
    facebook: 'https://facebook.com/easoftlab',
    instagram: 'https://instagram.com/easoftlab',
    github: 'https://github.com/easoftlab'
  },
  stats: {
    projectsCompleted: 50,
    yearsExperience: 5,
    clientSatisfaction: 100,
    happyClients: 30
  },
  seo: {
    metaTitle: 'EA Soft Lab - Innovative Software Solutions',
    metaDescription: 'Leading software development company specializing in custom solutions, web development, and digital transformation services.',
    keywords: 'software development, web applications, custom software, digital transformation',
    ogImage: null
  }
}

// Sample services data
const servicesData = [
  {
    _type: 'service',
    title: 'Web Development',
    slug: { current: 'web-development' },
    description: 'Professional web development services including custom web applications, e-commerce sites, and responsive websites built with modern technologies.',
    shortDescription: 'We create modern, responsive web applications that drive business growth and deliver exceptional user experiences.',
    icon: null,
    features: [
      {
        title: 'Custom Web Applications',
        description: 'Tailored web applications designed to meet your specific business requirements and workflows.',
        icon: null
      },
      {
        title: 'E-commerce Solutions',
        description: 'Complete e-commerce platforms with secure payment processing and inventory management.',
        icon: null
      },
      {
        title: 'Responsive Design',
        description: 'Mobile-first responsive designs that work seamlessly across all devices and screen sizes.',
        icon: null
      }
    ],
    technologies: ['React', 'Vue.js', 'Node.js', 'Python', 'PHP', 'WordPress'],
    pricing: {
      startingPrice: '$5,000',
      pricingModel: 'Project-based',
      pricingDetails: 'Custom pricing based on project scope and requirements'
    },
    order: 1,
    seo: {
      metaTitle: 'Web Development Services | EA Soft Lab - Custom Web Applications',
      metaDescription: 'Professional web development services including custom web applications, e-commerce sites, and responsive websites. Modern technologies and best practices.',
      keywords: 'web development, custom web applications, responsive websites, e-commerce'
    }
  },
  {
    _type: 'service',
    title: 'Mobile Development',
    slug: { current: 'mobile-development' },
    description: 'Native and cross-platform mobile app development for iOS and Android platforms with modern frameworks and best practices.',
    shortDescription: 'Native and cross-platform mobile apps that deliver exceptional user experiences across iOS and Android platforms.',
    icon: null,
    features: [
      {
        title: 'Native iOS Development',
        description: 'High-performance iOS applications built with Swift and SwiftUI.',
        icon: null
      },
      {
        title: 'Native Android Development',
        description: 'Robust Android applications using Kotlin and modern Android architecture.',
        icon: null
      },
      {
        title: 'Cross-Platform Development',
        description: 'Efficient cross-platform solutions using React Native and Flutter.',
        icon: null
      }
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
    pricing: {
      startingPrice: '$8,000',
      pricingModel: 'Project-based',
      pricingDetails: 'Pricing varies based on platform requirements and app complexity'
    },
    order: 2,
    seo: {
      metaTitle: 'Mobile App Development | EA Soft Lab - iOS & Android Apps',
      metaDescription: 'Professional mobile app development for iOS and Android platforms. Native and cross-platform solutions with modern technologies.',
      keywords: 'mobile app development, iOS development, Android development, React Native, Flutter'
    }
  },
  {
    _type: 'service',
    title: 'Custom Software',
    slug: { current: 'custom-software' },
    description: 'Tailored software solutions designed to streamline your business processes and boost productivity.',
    shortDescription: 'Tailored software solutions designed to streamline your business processes and boost productivity.',
    icon: null,
    features: [
      {
        title: 'Business Process Automation',
        description: 'Automate repetitive tasks and streamline workflows for increased efficiency.',
        icon: null
      },
      {
        title: 'Custom CRM Systems',
        description: 'Customer relationship management systems tailored to your business needs.',
        icon: null
      },
      {
        title: 'Enterprise Software',
        description: 'Scalable enterprise solutions for large organizations.',
        icon: null
      }
    ],
    technologies: ['Java', 'C#', '.NET', 'Python', 'Node.js', 'PostgreSQL'],
    pricing: {
      startingPrice: '$15,000',
      pricingModel: 'Project-based',
      pricingDetails: 'Enterprise pricing based on complexity and scale'
    },
    order: 3,
    seo: {
      metaTitle: 'Custom Software Development | EA Soft Lab - Enterprise Solutions',
      metaDescription: 'Custom software development services for enterprise businesses. Tailored solutions to streamline processes and boost productivity.',
      keywords: 'custom software, enterprise software, business automation, CRM systems'
    }
  }
]

// Sample team members data
const teamData = [
  {
    _type: 'team',
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    bio: 'Experienced technology leader with 10+ years in software development and business strategy.',
    shortBio: 'Technology leader with 10+ years of experience',
    photo: null,
    email: 'alex@easoftlab.com',
    phone: '+1 (555) 123-4567',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: 'https://twitter.com/alexjohnson',
      github: 'https://github.com/alexjohnson',
      website: 'https://alexjohnson.dev'
    },
    skills: ['Leadership', 'Strategy', 'Software Development', 'Business Development'],
    experience: '10+ years',
    education: 'BS Computer Science, Stanford University',
    certifications: ['PMP', 'AWS Solutions Architect'],
    isActive: true,
    order: 1
  },
  {
    _type: 'team',
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'Technical expert with deep knowledge in scalable architecture, cloud solutions, and emerging technologies.',
    shortBio: 'Technical expert specializing in scalable architecture',
    photo: null,
    email: 'sarah@easoftlab.com',
    phone: '+1 (555) 123-4568',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
      github: 'https://github.com/sarahchen',
      website: null
    },
    skills: ['Architecture', 'Cloud Computing', 'DevOps', 'System Design'],
    experience: '8+ years',
    education: 'MS Computer Science, MIT',
    certifications: ['AWS Solutions Architect', 'Kubernetes Administrator'],
    isActive: true,
    order: 2
  },
  {
    _type: 'team',
    name: 'Mike Rodriguez',
    role: 'Lead Developer',
    bio: 'Full-stack developer with expertise in modern web technologies and best practices.',
    shortBio: 'Full-stack developer with expertise in modern technologies',
    photo: null,
    email: 'mike@easoftlab.com',
    phone: '+1 (555) 123-4569',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mikerodriguez',
      twitter: 'https://twitter.com/mikerodriguez',
      github: 'https://github.com/mikerodriguez',
      website: null
    },
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    experience: '6+ years',
    education: 'BS Software Engineering, UC Berkeley',
    certifications: ['React Developer', 'Node.js Developer'],
    isActive: true,
    order: 3
  }
]

// Function to seed content
async function seedContent() {
  try {
    console.log('Starting content seeding...')

    // Create company information
    console.log('Creating company information...')
    const company = await client.create(companyData)
    console.log('✅ Company information created:', company._id)

    // Create services
    console.log('Creating services...')
    for (const service of servicesData) {
      const createdService = await client.create(service)
      console.log('✅ Service created:', createdService.title, createdService._id)
    }

    // Create team members
    console.log('Creating team members...')
    for (const member of teamData) {
      const createdMember = await client.create(member)
      console.log('✅ Team member created:', createdMember.name, createdMember._id)
    }

    console.log('🎉 Content seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
  }
}

// Run the seeding function
seedContent() 