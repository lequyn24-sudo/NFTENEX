import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const pageContent: Record<string, { title: string; content: React.ReactNode }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    content: (
      <>
        <p>Last updated: June 2026</p>
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>
        <h3>2. How We Use Your Information</h3>
        <p>We may use the information we collect about you to Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages.</p>
        <h3>3. Decentralized Data</h3>
        <p>For Web3 features, your wallet address and on-chain transaction history are public by nature. We do not link your personal identifiable information (PII) to your wallet address unless explicitly authorized by you for specific platform features.</p>
      </>
    )
  },
  "terms-of-service": {
    title: "Terms of Service",
    content: (
      <>
        <p>Last updated: June 2026</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using our platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        <h3>2. User Responsibilities</h3>
        <p>You are responsible for safeguarding the password and cryptographic keys that you use to access the service and for any activities or actions under your account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.</p>
        <h3>3. Intellectual Property</h3>
        <p>All content published and made available on our site is the property of NFTenex and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>
      </>
    )
  },
  "cookie-policy": {
    title: "Cookie Policy",
    content: (
      <>
        <p>Last updated: June 2026</p>
        <h3>What are Cookies?</h3>
        <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
        <h3>How We Use Cookies</h3>
        <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, to store your preferences, and to enable advertisements delivery.</p>
      </>
    )
  },
  "contact-us": {
    title: "Contact Us",
    content: (
      <>
        <p>We'd love to hear from you. Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.</p>
        <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-sans text-muted-foreground mb-1">Name</label>
              <input type="text" className="w-full bg-background border border-border rounded-md px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-sans text-muted-foreground mb-1">Email</label>
              <input type="email" className="w-full bg-background border border-border rounded-md px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-sans text-muted-foreground mb-1">Message</label>
              <textarea rows={5} className="w-full bg-background border border-border rounded-md px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest px-6 py-3 rounded-md hover:bg-primary/90 transition-colors self-start mt-2">
              Send Message
            </button>
          </form>
        </div>
      </>
    )
  },
  "about": {
    title: "About NFTenex",
    content: (
      <>
        <h3>The Future of Digital Ownership</h3>
        <p>NFTenex was founded in 2024 with a singular mission: to provide the most accurate, real-time, and insightful news for the Web3 and NFT ecosystem.</p>
        <p>We believe that decentralized technologies are fundamentally reshaping how humanity creates, distributes, and captures value. Our team of veteran crypto native journalists, on-chain analysts, and data scientists work around the clock to cut through the noise and deliver alpha.</p>
        <h3>Our Values</h3>
        <ul>
          <li><strong>Transparency:</strong> We verify on-chain data before publishing.</li>
          <li><strong>Objectivity:</strong> No paid shills. No hidden sponsorships.</li>
          <li><strong>Education:</strong> Making complex Web3 concepts accessible to everyone.</li>
        </ul>
      </>
    )
  }
};

export function StaticPage() {
  const { pageId } = useParams();
  const page = pageContent[pageId || ""] || {
    title: "Page Not Found",
    content: <p>The page you are looking for does not exist or has been moved.</p>
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-32"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-sans text-sm font-semibold mb-8 cyber-glitch-hover">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground mb-10">
        {page.title}<span className="text-primary animate-pulse">_</span>
      </h1>

      <div className="prose prose-invert max-w-none font-sans text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
        {page.content}
      </div>
    </motion.div>
  );
}
