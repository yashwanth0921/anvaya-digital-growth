import {
  Instagram,
  Megaphone,
  Globe,
  Search,
  Smartphone,
  Palette,
  TrendingUp,
  Mail,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  heroImage: string;
  features: string[];
  benefits: { title: string; description: string }[];
  deliverables: string[];
}

export const services: ServiceData[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Build a brand people remember.",
    description:
      "Build a powerful brand presence across Instagram, Facebook, LinkedIn, and more. We create scroll-stopping content that drives engagement and builds loyal communities.",
    longDescription:
      "Social media is where your customers spend their time — and where first impressions are formed. We develop a cohesive content strategy tailored to your brand voice, audience demographics, and business goals. From eye-catching Reels and carousel posts to community management and hashtag strategy, every piece of content is designed to stop the scroll and start a conversation. We don't just post — we build ecosystems of engaged followers who become paying customers.",
    icon: Instagram,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",

    heroImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&h=600&fit=crop",
    features: [
      "Content Strategy",
      "Community Management",
      "Reels & Stories",
      "Analytics & Reporting",
    ],
    benefits: [
      {
        title: "Consistent Brand Voice",
        description:
          "Every post, story, and comment reflects your brand identity, building recognition and trust across platforms.",
      },
      {
        title: "Engaged Community",
        description:
          "We don't just chase followers — we cultivate genuine engagement that converts passive viewers into active customers.",
      },
      {
        title: "Data-Driven Content",
        description:
          "Every piece of content is informed by analytics, ensuring we double down on what resonates with your audience.",
      },
    ],
    deliverables: [
      "Monthly content calendar",
      "Custom graphics and video content",
      "Hashtag and caption strategy",
      "Community management and response",
      "Monthly performance report",
      "Competitor analysis",
    ],

  },
  {
    slug: "meta-google-ads",
    title: "Meta & Google Ads",
    tagline: "Turn every click into a measurable result.",
    description:
      "Maximize your ROI with precision-targeted ad campaigns. We handle everything from creative to bidding strategy to bring qualified leads straight to your business.",
    longDescription:
      "Advertising done right is about working smarter, not harder. We design and manage high-performing campaigns across Meta (Facebook & Instagram) and Google, targeting your ideal customers with precision. From audience research and creative development to A/B testing and performance optimization, we manage every detail so you see measurable growth. Our approach is built on continuous testing, transparent reporting, and relentless optimization.",
    icon: Megaphone,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",

    heroImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop",
    features: [
      "Facebook & Instagram Ads",
      "Google Search & Display",
      "Retargeting Campaigns",
      "A/B Testing",
    ],
    benefits: [
      {
        title: "Maximized ROI",
        description:
          "We continuously optimize bids, audiences, and creatives to ensure every part of your campaign works harder.",
      },
      {
        title: "Precision Targeting",
        description:
          "Reach the right people at the right time with hyper-targeted audiences based on demographics, interests, and behavior.",
      },
      {
        title: "Transparent Reporting",
        description:
          "Clear, jargon-free reports showing exactly what's working, what we're testing, and where to focus next.",
      },
    ],
    deliverables: [
      "Campaign strategy and setup",
      "Custom ad creative design",
      "Audience research and targeting",
      "Landing page recommendations",
      "Weekly optimization",
      "Monthly ROI report",
    ],

  },
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Your digital storefront, built to convert.",
    description:
      "Get a fast, beautiful, conversion-optimized website that turns visitors into customers. Mobile-first designs built for speed and search engine visibility.",
    longDescription:
      "Your website is often the first interaction a potential customer has with your brand — and it needs to make an impression. We build modern, responsive websites that look exceptional and perform even better. Every site is designed with conversion in mind: fast load times, intuitive navigation, clear calls-to-action, and mobile-first layouts. Whether you need a landing page, an e-commerce store, or a full business website, we deliver a digital presence that works as hard as you do.",
    icon: Globe,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",

    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    features: [
      "Custom Design",
      "E-Commerce Solutions",
      "Landing Pages",
      "Speed Optimized",
    ],
    benefits: [
      {
        title: "Conversion-Focused Design",
        description:
          "Every layout, button, and page flow is designed to guide visitors toward taking action — whether that's buying, calling, or signing up.",
      },
      {
        title: "Lightning Fast",
        description:
          "Optimized images, clean code, and modern hosting ensure your site loads in under two seconds on any device.",
      },
      {
        title: "Built to Scale",
        description:
          "Our websites grow with your business — easy to update, simple to extend, and ready for whatever comes next.",
      },
    ],
    deliverables: [
      "Custom UI/UX design",
      "Responsive development",
      "SEO foundation setup",
      "Contact forms and integrations",
      "Speed optimization",
      "Post-launch support",
    ],

  },
  {
    slug: "seo-analytics",
    title: "SEO & Analytics",
    tagline: "Get found by the people already looking for you.",
    description:
      "Dominate search results with data-driven SEO strategies. We optimize your website to rank higher, attract organic traffic, and convert browsers into buyers.",
    longDescription:
      "Most customers start their journey on Google. If your business isn't showing up when they search, you're invisible to the people who need you most. Our SEO strategies combine technical optimization, high-quality content, and authoritative link-building to push your website to the top of search results. We pair this with deep analytics so you can see exactly how organic traffic translates to leads, sales, and business growth.",
    icon: Search,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",

    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Local SEO",
      "Performance Reports",
    ],
    benefits: [
      {
        title: "Sustainable Organic Growth",
        description:
          "Unlike paid ads, SEO builds lasting visibility. We create foundations that keep driving traffic long after the initial work is done.",
      },
      {
        title: "Local Search Dominance",
        description:
          'Show up in local searches, Google Maps, and near-me results to capture customers in your area who are ready to buy.',
      },
      {
        title: "Actionable Insights",
        description:
          "Our analytics reports don't just show numbers — they tell you what's working, what to improve, and where the biggest opportunities are.",
      },
    ],
    deliverables: [
      "Technical SEO audit",
      "Keyword research and strategy",
      "On-page optimization",
      "Local SEO setup",
      "Monthly ranking reports",
      "Analytics dashboard setup",
    ],

  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Your business, in your customers' pockets.",
    description:
      "Native and cross-platform mobile apps for iOS and Android. We build fast, beautiful apps that keep your customers engaged and coming back.",
    longDescription:
      "Mobile apps aren't just for big corporations anymore. We build custom mobile applications for businesses of all sizes — from booking apps and e-commerce stores to loyalty programs and internal tools. Using modern frameworks, we deliver apps that feel native, load fast, and provide seamless experiences across iOS and Android. Every app is designed with your users in mind, ensuring intuitive navigation and beautiful design that reflects your brand.",
    icon: Smartphone,
    color: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500",

    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop",
    features: [
      "iOS & Android Apps",
      "Cross-Platform",
      "UI/UX Design",
      "App Store Launch",
    ],
    benefits: [
      {
        title: "Direct Customer Connection",
        description:
          "Push notifications, in-app messaging, and personalized experiences keep your brand on your customers' home screens.",
      },
      {
        title: "Streamlined Operations",
        description:
          "Custom apps can automate bookings, orders, and customer service — saving your team hours every week.",
      },
      {
        title: "Competitive Edge",
        description:
          "A well-built app sets you apart from competitors who only have a website, positioning you as an industry leader.",
      },
    ],
    deliverables: [
      "App strategy and wireframing",
      "Custom UI/UX design",
      "iOS and Android development",
      "API and backend integration",
      "App Store submission",
      "Post-launch maintenance",
    ],

  },
  {
    slug: "brand-identity",
    title: "Brand Identity & Design",
    tagline: "Make your first impression unforgettable.",
    description:
      "Complete brand identity systems — logo, colors, typography, and guidelines that make your business instantly recognizable and professionally positioned.",
    longDescription:
      "Your brand is more than a logo — it's the feeling people get when they encounter your business. We craft complete brand identity systems that communicate professionalism, trust, and personality. From logo design and color palettes to typography, imagery guidelines, and brand voice, every element is thoughtfully designed to resonate with your target audience and stand out in your market. The result is a cohesive brand that works across every touchpoint — digital, print, and physical.",
    icon: Palette,
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",

    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Brand Strategy",
    ],
    benefits: [
      {
        title: "Instant Recognition",
        description:
          "A strong visual identity ensures customers recognize and remember your brand across all platforms and touchpoints.",
      },
      {
        title: "Professional Credibility",
        description:
          "Polished branding signals quality and professionalism, building trust before a single conversation happens.",
      },
      {
        title: "Consistent Experience",
        description:
          "Brand guidelines ensure every piece of marketing material — from social posts to business cards — looks cohesive.",
      },
    ],
    deliverables: [
      "Logo and icon design",
      "Color palette and typography",
      "Brand style guide",
      "Business card and stationery design",
      "Social media brand kit",
      "Brand voice guidelines",
    ],

  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Every click measured, every result tracked.",
    description:
      "Data-driven performance campaigns across Google, Meta, LinkedIn & more. We optimize for ROAS, CPA, and real business outcomes — not vanity metrics.",
    longDescription:
      "Performance marketing is about accountability — every ad dollar must deliver measurable results. We design and manage end-to-end performance campaigns across multiple channels: Google Ads, Meta Ads, LinkedIn Ads, programmatic display, and affiliate networks. Our team continuously monitors campaign metrics, adjusts targeting, tests creatives, and focuses efforts on the highest-performing channels. From funnel design and conversion tracking to attribution modeling and ROAS optimization, we ensure your campaigns generate predictable, scalable growth.",
    icon: TrendingUp,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-500",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    features: [
      "Multi-Channel Campaigns",
      "Conversion Tracking",
      "A/B & Split Testing",
      "ROAS Optimization",
    ],
    benefits: [
      {
        title: "Measurable ROI",
        description:
          "Every campaign is tied to a business outcome — leads, sales, sign-ups — so you know exactly what your campaigns are producing.",
      },
      {
        title: "Rapid Scaling",
        description:
          "Once we find what works, we pour fuel on the fire — scaling winning campaigns across channels to maximize growth.",
      },
      {
        title: "Full Transparency",
        description:
          "Real-time dashboards and weekly reports give you complete visibility into performance, results, and optimization actions.",
      },
    ],
    deliverables: [
      "Performance audit & strategy",
      "Campaign setup across channels",
      "Creative testing & optimization",
      "Landing page recommendations",
      "Weekly performance reports",
      "Monthly strategy review",
    ],

  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    tagline: "Inbox that converts, not just fills.",
    description:
      "Craft high-converting email campaigns — from welcome sequences to product launches. We design, write, and automate emails that drive opens, clicks, and revenue.",
    longDescription:
      "Email marketing remains one of the highest-ROI digital channels, but only when done right. We build complete email marketing systems — from strategy and list segmentation to copywriting, design, and automation. Whether it's welcome sequences that onboard new subscribers, abandoned cart emails that recover lost sales, or newsletter campaigns that nurture loyal customers, every email is crafted to drive action. We track open rates, click-through rates, and conversions to continuously optimize your email performance and maximize revenue per subscriber.",
    icon: Mail,
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-500",
    heroImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=600&fit=crop",
    features: [
      "Email Automation",
      "Newsletter Campaigns",
      "Drip Sequences",
      "A/B Testing",
    ],
    benefits: [
      {
        title: "Highest ROI Channel",
        description:
          "Email marketing delivers an average of 36 for every 1 spent — making it one of the most powerful tools in your marketing mix.",
      },
      {
        title: "Automated Revenue",
        description:
          "Set up once, earn forever. Automated sequences work 24/7 — nurturing leads, recovering carts, and upselling customers while you sleep.",
      },
      {
        title: "Direct Audience Access",
        description:
          "Unlike social media, your email list is yours. No algorithm changes, no reach restrictions — you connect directly with your audience.",
      },
    ],
    deliverables: [
      "Email strategy & segmentation plan",
      "Custom email template design",
      "Welcome & onboarding sequences",
      "Product launch campaigns",
      "A/B testing & optimization",
      "Monthly performance reports",
    ],

  },
  {
    slug: "web-applications",
    title: "Web Applications",
    tagline: "Custom web apps built for scale.",
    description:
      "Custom web apps built with modern frameworks. From dashboards to SaaS platforms — scalable, secure, and lightning fast.",
    longDescription:
      "We build custom web applications using modern frameworks like React, Next.js, and Node.js. Whether you need a customer dashboard, an internal tool, or a full SaaS platform, we deliver scalable, secure solutions that grow with your business. Our apps are designed for performance, with cloud hosting, API integrations, and real-time capabilities.",
    icon: Globe,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    features: ["React/Next.js", "Node.js Backend", "Cloud Hosting", "API Integration"],
    benefits: [
      { title: "Scalable Architecture", description: "Built to handle growth — from 100 to 100,000 users without performance issues." },
      { title: "Modern Tech Stack", description: "Latest frameworks and tools for fast development and future-proof solutions." },
      { title: "Secure by Design", description: "Enterprise-grade security with authentication, encryption, and data protection." },
    ],
    deliverables: ["Custom web application", "Admin dashboard", "API development", "Cloud deployment", "Performance optimization", "Maintenance support"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    tagline: "Intelligence that works for you.",
    description:
      "Integrate artificial intelligence into your business. From chatbots to predictive analytics — automation that works.",
    longDescription:
      "We help businesses leverage artificial intelligence to automate processes, gain insights, and deliver personalized experiences. From AI-powered chatbots that handle customer support to predictive analytics that forecast trends, we build solutions that save time and drive growth.",
    icon: Sparkles,
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    features: ["AI Chatbots", "Predictive Analytics", "Process Automation", "Custom AI Models"],
    benefits: [
      { title: "24/7 Automation", description: "AI works around the clock — handling customer queries, processing data, and making decisions." },
      { title: "Data-Driven Insights", description: "Extract valuable patterns from your data to make smarter business decisions." },
      { title: "Cost Efficiency", description: "Reduce manual work and operational costs while improving accuracy and speed." },
    ],
    deliverables: ["AI strategy consultation", "Chatbot development", "Analytics dashboard", "Automation workflows", "Training & documentation", "Ongoing support"],
  },
  {
    slug: "automation",
    title: "Automation",
    tagline: "Work smarter, not harder.",
    description:
      "Automate repetitive tasks and workflows. Save time, reduce errors, and let your team focus on what matters.",
    longDescription:
      "We design and implement automation solutions that eliminate repetitive tasks, streamline workflows, and connect your tools. From email sequences and CRM integrations to data syncing and process automation, we help your business run more efficiently.",
    icon: Zap,
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-500",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    features: ["Workflow Automation", "CRM Integration", "Email Sequences", "Data Sync"],
    benefits: [
      { title: "Time Savings", description: "Automate hours of manual work every week — freeing your team for strategic tasks." },
      { title: "Error Reduction", description: "Eliminate human errors in repetitive processes with consistent automated workflows." },
      { title: "Connected Tools", description: "Sync data across your apps seamlessly — no more copy-pasting between platforms." },
    ],
    deliverables: ["Automation audit", "Workflow design", "Tool integration", "Testing & optimization", "Training documentation", "Ongoing monitoring"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    tagline: "Visuals that speak volumes.",
    description:
      "Eye-catching visuals for social media, ads, presentations, and print. We design graphics that communicate and convert.",
    longDescription:
      "Great design is more than aesthetics — it's communication. We create stunning visual content for every channel: social media posts, ad creatives, presentation decks, brochures, and print materials. Every design is crafted to capture attention, convey your message, and drive action.",
    icon: Palette,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
    heroImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=600&fit=crop",
    features: ["Social Media Graphics", "Ad Creatives", "Presentations", "Print Design"],
    benefits: [
      { title: "Visual Impact", description: "Eye-catching designs that stop the scroll and grab attention in crowded feeds." },
      { title: "Brand Consistency", description: "Every design aligns with your brand guidelines for a cohesive visual identity." },
      { title: "Multi-Format Delivery", description: "Designs optimized for every platform — social, web, print, and beyond." },
    ],
    deliverables: ["Social media templates", "Ad creative design", "Presentation decks", "Print materials", "Brand collateral", "Design system"],
  },
  {
    slug: "chatbots",
    title: "Chatbots",
    tagline: "24/7 support that never sleeps.",
    description:
      "AI-powered chatbots that handle customer queries 24/7. Instant responses, zero wait time, happy customers.",
    longDescription:
      "AI-powered chatbots transform your customer support. Available 24/7, they handle FAQs, qualify leads, book appointments, and route complex issues to your team. Using natural language processing, they understand context and provide human-like responses — reducing support costs while improving customer satisfaction.",
    icon: Sparkles,
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-500",
    heroImage: "https://images.unsplash.com/photo-1531746790095-e5995f614585?w=1200&h=600&fit=crop",
    features: ["24/7 Support", "Natural Language", "Lead Capture", "Multi-Platform"],
    benefits: [
      { title: "Always Available", description: "Never miss a customer query — bots respond instantly, any time of day or night." },
      { title: "Cost Savings", description: "Reduce support costs by up to 70% while maintaining quality customer interactions." },
      { title: "Lead Qualification", description: "Automatically qualify leads and route high-intent customers to your sales team." },
    ],
    deliverables: ["Custom chatbot design", "Knowledge base setup", "Integration with website", "Multi-platform deployment", "Analytics dashboard", "Ongoing training"],
  },
  {
    slug: "custom-solutions",
    title: "Custom Solutions",
    tagline: "Built for your unique needs.",
    description:
      "Bespoke digital solutions tailored to your specific business challenges. When off-the-shelf doesn't fit, we build it from scratch.",
    longDescription:
      "Every business is unique, and sometimes standard tools don't cut it. We build custom digital solutions — from internal dashboards and client portals to specialized tools and integrations. Our team works closely with you to understand your workflow, then designs and develops a solution that fits perfectly.",
    icon: Globe,
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-500",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
    features: ["Custom Development", "API Integration", "Dashboard Design", "Workflow Tools"],
    benefits: [
      { title: "Perfect Fit", description: "Solutions designed around your exact workflow — no compromises, no workarounds." },
      { title: "Scalable Architecture", description: "Built to grow with your business — easy to extend and modify as needs change." },
      { title: "Full Ownership", description: "You own the code and the solution — no vendor lock-in, complete control." },
    ],
    deliverables: ["Requirements analysis", "Custom development", "Testing & QA", "Deployment", "Documentation", "Ongoing support"],
  },
  {
    slug: "reels-content",
    title: "Reels & Content Creation",
    tagline: "Content that stops the scroll.",
    description:
      "Scroll-stopping Reels, short-form videos, and creative content for Instagram, TikTok, and YouTube. Formats that engage.",
    longDescription:
      "Short-form video is the most engaging content format today. We create scroll-stopping Reels, TikToks, and YouTube Shorts that capture attention in the first second. From trending audio and visual effects to storytelling and brand integration, we produce content that gets views, shares, and followers.",
    icon: Megaphone,
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
    heroImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&h=600&fit=crop",
    features: ["Instagram Reels", "TikTok Content", "Short-Form Video", "Content Strategy"],
    benefits: [
      { title: "Viral Potential", description: "Short-form content has the highest chance of reaching new audiences organically." },
      { title: "Brand Personality", description: "Reels showcase your brand's human side — building connection and trust with viewers." },
      { title: "Cross-Platform", description: "One video optimized for Instagram, TikTok, YouTube Shorts, and Facebook Reels." },
    ],
    deliverables: ["Content strategy", "Script writing", "Video production", "Editing & effects", "Thumbnail design", "Posting schedule"],
  },

];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
