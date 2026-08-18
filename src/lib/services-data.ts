import {
  Instagram,
  Megaphone,
  Globe,
  Search,
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
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
