import { safeClient } from './sanity.js'

// Company Information Query
export const companyQuery = `*[_type == "company"][0] {
  name,
  tagline,
  description,
  mission,
  vision,
  values[] {
    title,
    description,
    icon
  },
  logo,
  contactInfo {
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    country
  },
  socialMedia {
    linkedin,
    twitter,
    facebook,
    instagram,
    github
  },
  stats {
    projectsCompleted,
    yearsExperience,
    clientSatisfaction,
    happyClients
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage
  }
}`

// Blog Posts Query
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{
    name,
    role,
    photo
  },
  categories[]->{
    title,
    slug
  },
  tags,
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 180 ),
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Single Blog Post Query
export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  author->{
    name,
    role,
    photo,
    bio
  },
  categories[]->{
    title,
    slug
  },
  tags,
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 180 ),
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Services Query
export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  shortDescription,
  icon,
  features[] {
    title,
    description,
    icon
  },
  technologies,
  pricing {
    startingPrice,
    pricingModel,
    pricingDetails
  },
  caseStudies[]->{
    title,
    slug,
    featuredImage
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Single Service Query
export const serviceQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  shortDescription,
  icon,
  features[] {
    title,
    description,
    icon
  },
  technologies,
  pricing {
    startingPrice,
    pricingModel,
    pricingDetails
  },
  caseStudies[]->{
    title,
    slug,
    featuredImage,
    description
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Team Members Query
export const teamQuery = `*[_type == "team" && isActive == true] | order(order asc) {
  _id,
  name,
  role,
  bio,
  shortBio,
  photo,
  email,
  phone,
  socialLinks {
    linkedin,
    twitter,
    github,
    website
  },
  skills,
  experience,
  education,
  certifications
}`

// Projects Query
export const projectsQuery = `*[_type == "project"] | order(isFeatured desc, order asc) {
  _id,
  title,
  slug,
  description,
  shortDescription,
  featuredImage,
  gallery,
  client,
  clientWebsite,
  technologies,
  projectType,
  projectUrl,
  githubUrl,
  timeline {
    startDate,
    endDate,
    duration
  },
  challenges[] {
    challenge,
    solution
  },
  results[] {
    metric,
    value,
    description
  },
  testimonial {
    quote,
    author,
    position,
    company
  },
  isFeatured,
  order,
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Single Project Query
export const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  shortDescription,
  featuredImage,
  gallery,
  client,
  clientWebsite,
  technologies,
  projectType,
  projectUrl,
  githubUrl,
  timeline {
    startDate,
    endDate,
    duration
  },
  challenges[] {
    challenge,
    solution
  },
  results[] {
    metric,
    value,
    description
  },
  testimonial {
    quote,
    author,
    position,
    company
  },
  isFeatured,
  order,
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`

// Featured Projects Query
export const featuredProjectsQuery = `*[_type == "project" && isFeatured == true] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  featuredImage,
  client,
  technologies,
  projectType
}`

// Latest Blog Posts Query
export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{
    name
  },
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 180 )
}`

// Search Posts Query
export const searchPostsQuery = `*[_type == "post" && (
  title match $searchTerm + "*" ||
  excerpt match $searchTerm + "*" ||
  body[].children[].text match $searchTerm + "*"
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{
    name
  },
  publishedAt
}`

// Fetch functions with error handling
export async function getCompanyInfo() {
  return await safeClient.fetch(companyQuery)
}

export async function getPosts() {
  return await safeClient.fetch(postsQuery)
}

export async function getPost(slug) {
  return await safeClient.fetch(postQuery, { slug })
}

export async function getServices() {
  return await safeClient.fetch(servicesQuery)
}

export async function getService(slug) {
  return await safeClient.fetch(serviceQuery, { slug })
}

export async function getTeam() {
  return await safeClient.fetch(teamQuery)
}

export async function getProjects() {
  return await safeClient.fetch(projectsQuery)
}

export async function getProject(slug) {
  return await safeClient.fetch(projectQuery, { slug })
}

export async function getFeaturedProjects() {
  return await safeClient.fetch(featuredProjectsQuery)
}

export async function getLatestPosts() {
  return await safeClient.fetch(latestPostsQuery)
}

export async function searchPosts(searchTerm) {
  return await safeClient.fetch(searchPostsQuery, { searchTerm })
}

export async function getPostsByCategory(category) {
  const query = `*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      name,
      role,
      photo
    },
    categories[]->{
      title,
      slug
    },
    tags,
    publishedAt,
    "readingTime": round(length(pt::text(body)) / 5 / 180 ),
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }`;
  return await safeClient.fetch(query, { category })
} 