const navBarLinks = [
  { name: "Inicio", url: "/es" },
  { name: "Acerca de", url: "/es/about-us" },
  { name: "Miembros", url: "/es/members" },
  { name: "Únete", url: "/docs/guides/getting-started" },
];

const footerLinks = [
  {
    section: "Fellowship",
    links: [
      { name: "Sobre nosotros", url: "/es/about-us" },
      { name: "Miembros", url: "/es/members" },
      { name: "Únete", url: "/docs/guides/getting-started" },
      // { name: "Contáctenos", url: "/es/contact" },
    ],
  },
  {
    section: "Recursos",
    links: [
      { name: "Documentación", url: "/docs/es" },
      { name: "Preguntas frecuentes", url: "/faq" },
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
