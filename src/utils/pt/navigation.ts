const navBarLinks = [
  { name: "Início", url: "/pt" },
  { name: "Serviços", url: "/pt/services" },
  { name: "Contato", url: "/pt/contact" },
  { name: "Junte-se", url: "/docs/guides/getting-started" },
];

const footerLinks = [
  {
    section: "Fellowship",
    links: [
      { name: "Serviços", url: "/pt/services" },
      { name: "Contato", url: "/pt/contact" },
      { name: "Junte-se", url: "/docs/guides/getting-started" },
    ],
  },
  {
    section: "Recursos",
    links: [
      { name: "Documentação", url: "/docs" },
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
