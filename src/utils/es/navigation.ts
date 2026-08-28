const navBarLinks = [
  { name: "Inicio", url: "/es" },
  { name: "Servicios", url: "/es/services" },
  { name: "Contacto", url: "/es/contact" },
  { name: "Únete", url: "/docs/es/guides/getting-started" },
];

const footerLinks = [
  {
    section: "Fellowship",
    links: [
      { name: "Servicios", url: "/es/services" },
      { name: "Contacto", url: "/es/contact" },
      { name: "Únete", url: "/docs/es/guides/getting-started" },
    ],
  },
  {
    section: "Recursos",
    links: [
      { name: "Documentación", url: "/docs/es" },
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
