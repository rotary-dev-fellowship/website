export type MemberProfileLabels = {
  aboutMe: string;
  technologies: string;
  languages: string;
  rotaryClub: string;
  publications: string;
  memberSince: string;
  openForWork: string;
  openForMentorship: string;
  photoAlt: (name: string) => string;
};

export const memberProfileLabels = {
  en: {
    aboutMe: "About me",
    technologies: "Technologies",
    languages: "Languages",
    rotaryClub: "Rotary club",
    publications: "Publications",
    memberSince: "Member since",
    openForWork: "Open to work",
    openForMentorship: "Open to mentorship",
    photoAlt: (name: string) => `Photo of ${name}`,
  },
  es: {
    aboutMe: "Sobre mí",
    technologies: "Tecnologías",
    languages: "Idiomas",
    rotaryClub: "Club rotario",
    publications: "Publicaciones",
    memberSince: "Miembro desde",
    openForWork: "Disponible para trabajar",
    openForMentorship: "Disponible para mentoría",
    photoAlt: (name: string) => `Foto de ${name}`,
  },
  pt: {
    aboutMe: "Sobre mim",
    technologies: "Tecnologias",
    languages: "Idiomas",
    rotaryClub: "Clube rotário",
    publications: "Publicações",
    memberSince: "Membro desde",
    openForWork: "Disponível para trabalhar",
    openForMentorship: "Disponível para mentoria",
    photoAlt: (name: string) => `Foto de ${name}`,
  },
} as const satisfies Record<string, MemberProfileLabels>;
