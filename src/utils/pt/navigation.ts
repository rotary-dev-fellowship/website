const navBarLinks = [
  { name: "Início", url: "/pt" },
  { name: "Sobre", url: "/pt/about-us" },
  { name: "Membros", url: "/pt/members" },
  { name: "Junte-se", url: "/docs/guides/getting-started" },
];

const footerLinks = [
  {
    section: "Fellowship",
    links: [
      { name: "Sobre nós", url: "/pt/about-us" },
      { name: "Membros", url: "/pt/members" },
      { name: "Junte-se", url: "/docs/guides/getting-started" },
      // { name: "Fale conosco", url: "/pt/contact" },
    ],
  },
  {
    section: "Recursos",
    links: [
      { name: "Documentação", url: "/docs/pt" },
      { name: "Perguntas frequentes", url: "/faq" },
      { name: "Rotary International", url: "https://rotary.org" },
      {
        name: "Rotary Fellowships",
        url: "https://www.rotary.org/our-programs/more-fellowships",
      },
    ],
  },
];

const socialLinks = {
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
