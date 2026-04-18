export type PortfolioProject = {
  title: string;
  category: string;
  domain: string;
  href: string;
  summary: string;
  focus: string[];
  previewLabel: string;
  palette: [string, string, string];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Aaradhya Jewellers",
    category: "Jewelry commerce",
    domain: "aaradhyajewellers.in",
    href: "https://aaradhyajewellers.in/",
    summary:
      "Jewelry storefront built around collections, trending pieces, and festive product discovery.",
    focus: ["Luxury retail", "Catalog browsing", "Collection layout"],
    previewLabel: "Luxury Edit",
    palette: ["#f2c078", "#d38a59", "#2b1836"],
  },
  {
    title: "Godavari Cuts",
    category: "Food commerce",
    domain: "godavaricuts.com",
    href: "https://godavaricuts.com/",
    summary:
      "Fresh meat and seafood storefront with category-led shopping and local-delivery intent.",
    focus: ["Commerce UX", "Local brand", "Category navigation"],
    previewLabel: "Fresh Market",
    palette: ["#ff925e", "#a3333d", "#251c2c"],
  },
  {
    title: "Haay Skincare",
    category: "Skincare storefront",
    domain: "haayskincare.com",
    href: "https://haayskincare.com/",
    summary:
      "Natural skincare shopping experience with wellness positioning and product-led browsing.",
    focus: ["Beauty retail", "Brand tone", "Product storytelling"],
    previewLabel: "Skin Ritual",
    palette: ["#7ad1c0", "#a7d8b0", "#1d3045"],
  },
  {
    title: "The Mahal Fashions",
    category: "Fashion retail",
    domain: "themahalfashions.com",
    href: "https://www.themahalfashions.com/",
    summary:
      "Fashion storefront for curated apparel and seasonal product merchandising.",
    focus: ["Fashion UI", "Storefront", "Merchandising"],
    previewLabel: "Fashion Drop",
    palette: ["#f7d7ae", "#d27c7c", "#40223d"],
  },
  {
    title: "Ferroklean",
    category: "Industrial brand site",
    domain: "ferroklean.com",
    href: "https://ferroklean.com/",
    summary:
      "Corporate website with authority-led messaging, knowledge positioning, and trust-building sections.",
    focus: ["B2B website", "Trust content", "Corporate presentation"],
    previewLabel: "Industrial Proof",
    palette: ["#93b7d5", "#4a6d8e", "#132033"],
  },
  {
    title: "Jamie Makeup",
    category: "Beauty commerce",
    domain: "jamiemakeup.com",
    href: "https://jamiemakeup.com/",
    summary:
      "Beauty-led storefront with creator-brand presentation and product-forward storytelling.",
    focus: ["DTC beauty", "Brand feel", "Product focus"],
    previewLabel: "Creator Beauty",
    palette: ["#f4cab8", "#e28aa5", "#2b1933"],
  },
  {
    title: "Bearbottom Clothing",
    category: "Apparel e-commerce",
    domain: "bearbottomclothing.com",
    href: "https://bearbottomclothing.com/",
    summary:
      "High-volume apparel e-commerce experience with strong merchandising and review-driven trust.",
    focus: ["Apparel", "Conversion", "Merchandising"],
    previewLabel: "Menswear Grid",
    palette: ["#d0c9ba", "#83989e", "#1c2330"],
  },
  {
    title: "Market Grey Boutique",
    category: "Boutique fashion",
    domain: "marketgreyboutique.net",
    href: "https://marketgreyboutique.net/",
    summary:
      "Boutique clothing website with trend-led styling and fashion-first catalog browsing.",
    focus: ["Boutique retail", "Fashion brand", "Mobile shopping"],
    previewLabel: "Boutique Mode",
    palette: ["#d9cbc7", "#8d7b84", "#2d2130"],
  },
  {
    title: "Tiny Tusky",
    category: "Kids fashion",
    domain: "tinytusky.com",
    href: "https://www.tinytusky.com/",
    summary:
      "Kidswear storefront designed around colorful product discovery and playful brand tone.",
    focus: ["Kidswear", "Catalog", "Brand personality"],
    previewLabel: "Playful Kids",
    palette: ["#ffd86f", "#85d5ff", "#2d2f6d"],
  },
  {
    title: "Alix Avien India",
    category: "Cosmetics storefront",
    domain: "alixavien.in",
    href: "https://alixavien.in/",
    summary:
      "Imported makeup storefront with beauty-focused product hierarchy and category exploration.",
    focus: ["Cosmetics", "Retail UI", "Product hierarchy"],
    previewLabel: "Beauty Shelf",
    palette: ["#f7b8b0", "#c26b8d", "#26142e"],
  },
  {
    title: "Divine Copper",
    category: "Homeware and manufacturing",
    domain: "divinecopper.com",
    href: "https://divinecopper.com/",
    summary:
      "Copper products website combining product sales with manufacturer-level credibility messaging.",
    focus: ["Homeware", "Manufacturer", "Trust-driven conversion"],
    previewLabel: "Copper Craft",
    palette: ["#f0a46d", "#b7643f", "#2b1c24"],
  },
  {
    title: "Newsoft Infotech Portfolio",
    category: "Agency portfolio",
    domain: "newsoftinfotech.com",
    href: "https://www.newsoftinfotech.com/M_Portfolio/",
    summary:
      "Project showcase page focused on portfolio visibility and service capability presentation.",
    focus: ["Agency site", "Portfolio grid", "Showcase"],
    previewLabel: "Agency Proof",
    palette: ["#99b5de", "#5e7fb6", "#18253b"],
  },
  {
    title: "Divya Drishti Bundle Funnel",
    category: "Offer funnel",
    domain: "dd.happylifeuniversity.in",
    href: "https://dd.happylifeuniversity.in/dditt",
    summary:
      "Course upsell funnel built around an offer stack, urgency, and transformation-focused copy.",
    focus: ["Sales funnel", "Offer design", "Conversion"],
    previewLabel: "Offer Stack",
    palette: ["#caa9ff", "#7d53c7", "#191433"],
  },
  {
    title: "DD Repatterning Landing Page",
    category: "Course landing page",
    domain: "dd.happylifeuniversity.in",
    href: "https://dd.happylifeuniversity.in/ddrepatterning0zxd",
    summary:
      "Long-form sales page using problem-solution storytelling, testimonials, and guided offer sections.",
    focus: ["Landing page", "Course sales", "Story structure"],
    previewLabel: "Course Funnel",
    palette: ["#f1c06d", "#d97a3f", "#23192f"],
  },
  {
    title: "Career Guidance Page",
    category: "Lead generation page",
    domain: "branding.sakshichandraakar.in",
    href: "https://branding.sakshichandraakar.in/career/",
    summary:
      "Career-focused landing page centered on guidance, positioning, and enquiry-driven conversion.",
    focus: ["Career niche", "Lead generation", "Offer page"],
    previewLabel: "Career Path",
    palette: ["#a2c7d7", "#4f7f98", "#182734"],
  },
  {
    title: "Career Branding Page",
    category: "Personal branding page",
    domain: "branding.sakshichandraakar.in",
    href: "https://branding.sakshichandraakar.in/careerbranding/",
    summary:
      "Offer page for career branding with positioning-led copy and conversion-oriented sections.",
    focus: ["Personal branding", "Conversion", "Messaging"],
    previewLabel: "Brand Signal",
    palette: ["#ffc8b1", "#e07a6b", "#321f30"],
  },
  {
    title: "Linked Profile Branding Page",
    category: "LinkedIn branding page",
    domain: "branding.sakshichandraakar.in",
    href: "https://branding.sakshichandraakar.in/linked/",
    summary:
      "Landing page focused on LinkedIn branding, authority building, and personal profile positioning.",
    focus: ["LinkedIn branding", "Authority", "Lead generation"],
    previewLabel: "Linked Presence",
    palette: ["#86c8ff", "#447ccd", "#132039"],
  },
];

export const featuredPortfolioProjects = [
  portfolioProjects[0],
  portfolioProjects[4],
  portfolioProjects[13],
];
