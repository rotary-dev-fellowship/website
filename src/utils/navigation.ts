// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about-us" },
  { name: "Members", url: "/members" },
  // { name: "Blog", url: "/blog" },
  { name: "Join Us", url: "/docs/guides/getting-started" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Fellowship",
    links: [
      { name: "About Us", url: "/about-us" },
      { name: "Members", url: "/members" },
      { name: "Join Us", url: "/docs/guides/getting-started" },
      // { name: "Projects", url: "/projects" },
      // { name: "Mentorship", url: "/mentorship" },
      // { name: "Workshops & Events", url: "/events" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
  {
    section: "Resources",
    links: [
      { name: "Documentation", url: "/docs" },
      // { name: "Blog", url: "/blog" },
      { name: "FAQ", url: "/faq" },
      { name: "Rotary International", url: "https://rotary.org" },
      { name: "Rotary Fellowships", url: "https://www.rotary.org/our-programs/more-fellowships" },
    ],
  },
];
// An object of links for social icons
export const socialLinks = {
  facebook: "",
  x: "",
  github: "https://github.com/rotary-dev-fellowship",
  google: "",
  slack: "",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};