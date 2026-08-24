import {
  Instagram,
  Megaphone,
  Globe,
  Search,
  Smartphone,
  Palette,
  Mail,
  PenTool,
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
    tagline: "Turn ad spend into measurable growth.",
    description:
      "Maximize your ROI with precision-targeted ad campaigns. We handle everything from creative to bidding strategy to bring qualified leads straight to your business.",
    longDescription:
      "Advertising done right isn't about spending more — it's about spending smarter. We design and manage high-performing campaigns across Meta (Facebook & Instagram) and Google, targeting your ideal customers with precision. From audience research and creative development to A/B testing and budget optimization, we manage every detail so you see a clear return on every rupee spent. Our approach is built on continuous testing, transparent reporting, and relentless optimization.",
    icon: Megaphone,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
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
          "We continuously optimize bids, audiences, and creatives to ensure every rupee of your ad budget works harder.",
      },
      {
        title: "Precision Targeting",
        description:
          "Reach the right people at the right time with hyper-targeted audiences based on demographics, interests, and behavior.",
      },
      {
        title: "Transparent Reporting",
        description:
          "Clear, jargon-free reports showing exactly what's working, what we're testing, and where your budget is going.",
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
    slug: "email-marketing",
    title: "Email Marketing",
    tagline: "Inbox is the highest ROI channel you're ignoring.",
    description:
      "Automated email campaigns, newsletters, and drip sequences that nurture leads and turn subscribers into loyal, repeat customers.",
    longDescription:
      "Email marketing delivers an average ROI of ₹36 for every ₹1 spent — making it one of the most powerful channels in your toolkit. We design and execute email strategies that go beyond batch-and-blast. From welcome sequences and abandoned cart recovery to newsletters and re-engagement campaigns, every email is crafted to deliver value, build relationships, and drive measurable results. Our data-driven approach ensures high open rates, strong click-throughs, and conversions that impact your bottom line.",
    icon: Mail,
    color: "from-cyan-500/20 to-sky-500/20",
    iconColor: "text-cyan-600",
    features: [
      "Automated Sequences",
      "Newsletter Design",
      "Drip Campaigns",
      "List Segmentation",
    ],
    benefits: [
      {
        title: "Highest ROI Channel",
        description:
          "Email consistently outperforms social media and paid ads in ROI, making it the most cost-effective marketing channel.",
      },
      {
        title: "Automated Nurturing",
        description:
          "Set up once, run forever — automated sequences nurture leads 24/7 without any manual effort from your team.",
      },
      {
        title: "Direct Ownership",
        description:
          "Unlike social media followers, your email list is an asset you own — not subject to algorithm changes or platform fees.",
      },
    ],
    deliverables: [
      "Email strategy and planning",
      "Custom template design",
      "Automated sequence setup",
      "A/B testing and optimization",
      "List management and segmentation",
      "Performance analytics reports",
    ],

  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    tagline: "Stories that sell, content that converts.",
    description:
      "Blog posts, case studies, videos, and social content that educates your audience, builds authority, and drives organic traffic to your business.",
    longDescription:
      "Great content doesn't just fill a calendar — it drives business results. We create strategic content that educates your audience, builds thought leadership, and attracts qualified traffic to your website. From blog posts and case studies to video scripts and infographics, every piece is designed with a purpose: to inform, engage, and convert. Our content strategies are built on keyword research, audience insights, and a deep understanding of what makes content shareable and discoverable.",
    icon: PenTool,
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-600",
    features: [
      "Blog & Articles",
      "Video Content",
      "Case Studies",
      "Social Content",
    ],
    benefits: [
      {
        title: "Thought Leadership",
        description:
          "Quality content positions your brand as an expert in your industry, building trust and authority with your audience.",
      },
      {
        title: "Compounding Returns",
        description:
          "Unlike ads that stop working when you stop paying, content continues to drive traffic and leads for months and years.",
      },
      {
        title: "Multi-Channel Impact",
        description:
          "One piece of content can fuel your blog, social media, email newsletters, and sales materials simultaneously.",
      },
    ],
    deliverables: [
      "Content strategy and calendar",
      "Blog posts and articles",
      "Video scripts and production",
      "Infographics and visuals",
      "Content distribution plan",
      "Performance tracking and reporting",
    ],

  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
