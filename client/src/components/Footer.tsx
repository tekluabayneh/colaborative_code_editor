import { Github, MessageCircle, Twitter, Linkedin} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Ready-made features",
      links: [
        "AI Copilots",
        "Comments",
        "Multiplayer Editing",
        "Notifications",
        "Presence"
      ]
    },
    {
      title: "Platform",
      links: [
        "Monitoring Dashboard",
        "Realtime Infrastructure"
      ]
    },
    {
      title: "Solutions",
      links: [
        "People platforms",
        "Sales tools",
        "Startups"
      ]
    },
    {
      title: "Use cases",
      links: [
        "Multiplayer forms",
        "Multiplayer text editor",
        "Multiplayer creative tools",
        "Multiplayer whiteboard",
        "Comments",
        "Sharing and permissions"
      ]
    },
    {
      title: "Resources",
      links: [
        "Documentation",
        "Examples",
        "React components",
        "Tutorial",
        "Guides",
        "Release notes"
      ]
    },
    {
      title: "Technologies",
      links: [
        "Next.js",
        "React",
        "JavaScript",
        "Redux",
        "Yjs",
        "Tiptap",
        "BlockNote",
        "Slate",
        "Monaco"
      ]
    },
    {
      title: "Company",
      links: [
        "Pricing",
        "Blog",
        "Customers",
        "Changelog",
        "About",
        "Contact us",
        "Careers",
        "Terms of service",
        "Privacy policy",
        "Security",
        "Trust center",
        "Subprocessors"
      ]
    }
  ];

  return (
    <footer className="bg-footer-bg border-t border-footer-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header section with logo and status */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-footer-heading rounded-sm"></div>
              <span className="text-footer-heading font-semibold text-lg">CodeSync</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-footer-text">All systems operational</span>
            </div>
          </div>
          
          {/* Social links and badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-footer-text hover:text-footer-link-hover cursor-pointer transition-colors" />
              <MessageCircle className="w-5 h-5 text-footer-text hover:text-footer-link-hover cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-footer-text hover:text-footer-link-hover cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-footer-text hover:text-footer-link-hover cursor-pointer transition-colors" />
            </div>
         </div>


        </div>

        {/* Footer sections grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-footer-heading font-medium text-sm">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-footer-text text-sm hover:text-footer-link-hover transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
