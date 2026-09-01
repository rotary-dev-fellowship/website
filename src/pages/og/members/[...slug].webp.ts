import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "@/data_files/constants";

export const prerender = true;

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ACCENT_COLOR = "#facc15";
const TEXT_X = 84;
const PHOTO_X = 706;
const TEXT_SAFE_WIDTH = PHOTO_X - TEXT_X - 40;
const TEXT_OVERLAP_ALLOWANCE = 24;
const ROLE_FONT_SIZE = 28;
const ROLE_LINE_DY = 34;
const NAME_LETTER_SPACING = -3;
const brandIconPath = path.join(process.cwd(), "src/images/icon.png");

export async function getStaticPaths() {
  const members = await getCollection("members", ({ data }) => data.active);

  return members.map((member) => ({
    params: { slug: member.slug },
    props: { member },
  }));
}

export async function GET({ props }: { props: { member: CollectionEntry<"members"> } }) {
  const { member } = props;
  const memberImagePath = await getMemberImagePath(member);

  const memberImageBuffer = await sharp(memberImagePath)
    .resize(494, OG_HEIGHT, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();

  const brandIconBuffer = await sharp(brandIconPath)
    .resize(66, 66, {
      fit: "contain",
    })
    .png()
    .toBuffer();

  const headline = member.data.jobTitle || "RotaryDEV Fellowship Member";
  const technologies = (member.data.technologies ?? []).slice(0, 3);

  const svgOverlayBuffer = Buffer.from(
    createMemberOgSvg({
      member,
      headline,
      technologies,
    })
  );

  const image = await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 4,
      background: "#171717",
    },
  })
    .composite([
      {
        input: memberImageBuffer,
        left: 706,
        top: 0,
      },
      {
        input: svgOverlayBuffer,
        left: 0,
        top: 0,
      },
      {
        input: brandIconBuffer,
        left: 84,
        top: 58,
      },
    ])
    .webp({
      quality: 84,
    })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function createMemberOgSvg({
  member,
  headline,
  technologies,
}: {
  member: CollectionEntry<"members">;
  headline: string;
  technologies: string[];
}) {
  const nameLayout = layoutMemberName(member.data.name);
  const roleLines =
    wrapTextToWidth(headline, ROLE_FONT_SIZE, TEXT_SAFE_WIDTH, 2) ??
    [truncateTextToWidth(headline, ROLE_FONT_SIZE, TEXT_SAFE_WIDTH)];
  const techMarkup = technologies
    .map((tech, index) => {
      const x = 84 + index * 96;
      const y = 482;
      const width = Math.max(72, Math.min(108, 32 + tech.length * 8));
      const label = truncateText(tech, 10);

      return `
      <rect x="${x}" y="${y}" width="${width}" height="44" rx="22" fill="#262626" stroke="rgba(250,204,21,0.24)" />
      <text x="${x + width / 2}" y="${y + 28}" text-anchor="middle" fill="${ACCENT_COLOR}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">${escapeXml(label)}</text>
    `;
    })
    .join("");

  return `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="canvasBackground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#171717" />
          <stop offset="100%" stop-color="#262626" />
        </linearGradient>
        <linearGradient id="portraitFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#171717" stop-opacity="0.88" />
          <stop offset="42%" stop-color="#171717" stop-opacity="0.48" />
          <stop offset="100%" stop-color="#171717" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="736" height="${OG_HEIGHT}" fill="#171717" />
      <rect x="662" y="0" width="230" height="${OG_HEIGHT}" fill="url(#portraitFade)" />

      <text x="168" y="101" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">${escapeXml(SITE.title)}</text>

      <text x="${TEXT_X}" y="${nameLayout.startY}" fill="#FAFAFA" font-family="Arial, Helvetica, sans-serif" font-size="${nameLayout.fontSize}" font-weight="800" letter-spacing="${NAME_LETTER_SPACING}">
        ${nameLayout.lines.map((line, index) => `<tspan x="${TEXT_X}" dy="${index === 0 ? 0 : nameLayout.lineDy}">${escapeXml(line)}</tspan>`).join("")}
      </text>

      <text x="${TEXT_X}" y="${nameLayout.roleY}" fill="#A3A3A3" font-family="Arial, Helvetica, sans-serif" font-size="${ROLE_FONT_SIZE}" font-weight="500">
        ${roleLines.map((line, index) => `<tspan x="${TEXT_X}" dy="${index === 0 ? 0 : ROLE_LINE_DY}">${escapeXml(line)}</tspan>`).join("")}
      </text>

      ${techMarkup}

      <circle cx="96" cy="592" r="22" fill="rgba(250,204,21,0.14)" />
      <circle cx="96" cy="592" r="7" fill="${ACCENT_COLOR}" />
      <text x="130" y="600" fill="#A3A3A3" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="500">rotary-dev-fellowship.pages.dev/members/${escapeXml(member.slug)}</text>
    </svg>
  `;
}

async function getMemberImagePath(member: CollectionEntry<"members">) {
  const entryPath = path.join(process.cwd(), "src/content/members", member.id);
  const source = await fs.readFile(entryPath, "utf-8");
  const match = source.match(/^image:\s*["'](.+?)["']\s*$/m);

  if (!match) {
    throw new Error(`Could not resolve image for member "${member.slug}"`);
  }

  return resolveContentAssetPath(entryPath, match[1]);
}

function resolveContentAssetPath(entryPath: string, assetPath: string) {
  if (assetPath.startsWith("@memberImages/")) {
    return path.join(process.cwd(), "src/images/members", assetPath.slice("@memberImages/".length));
  }

  if (assetPath.startsWith("@/")) {
    return path.join(process.cwd(), "src", assetPath.slice(2));
  }

  if (assetPath.startsWith("/")) {
    return path.join(process.cwd(), "public", assetPath.slice(1));
  }

  return path.resolve(path.dirname(entryPath), assetPath);
}

function layoutMemberName(name: string) {
  const trimmed = name.trim();
  const layouts = [
    { fontSize: 104, maxLines: 1, startY: 254, lineDy: 0, roleY: 384 },
    { fontSize: 88, maxLines: 1, startY: 260, lineDy: 0, roleY: 384 },
    { fontSize: 72, maxLines: 1, startY: 268, lineDy: 0, roleY: 384 },
    { fontSize: 88, maxLines: 2, startY: 240, lineDy: 76, roleY: 420 },
    { fontSize: 72, maxLines: 2, startY: 248, lineDy: 58, roleY: 420 },
    { fontSize: 72, maxLines: 3, startY: 228, lineDy: 58, roleY: 430 },
  ] as const;

  const safeLayout = pickNameLayout(trimmed, layouts, TEXT_SAFE_WIDTH);
  if (safeLayout) {
    return safeLayout;
  }

  const overlapLayout = pickNameLayout(trimmed, layouts, TEXT_SAFE_WIDTH + TEXT_OVERLAP_ALLOWANCE);
  if (overlapLayout) {
    return overlapLayout;
  }

  const fallback = layouts[layouts.length - 1];
  const lines =
    wrapTextToWidth(trimmed, fallback.fontSize, TEXT_SAFE_WIDTH + TEXT_OVERLAP_ALLOWANCE, fallback.maxLines) ??
    [truncateTextToWidth(trimmed, fallback.fontSize, TEXT_SAFE_WIDTH + TEXT_OVERLAP_ALLOWANCE)];

  return {
    lines,
    ...fallback,
  };
}

function pickNameLayout(
  name: string,
  layouts: readonly {
    fontSize: number;
    maxLines: number;
    startY: number;
    lineDy: number;
    roleY: number;
  }[],
  maxWidth: number
) {
  for (const layout of layouts) {
    const lines = wrapTextToWidth(name, layout.fontSize, maxWidth, layout.maxLines);

    if (lines) {
      return { lines, ...layout };
    }
  }

  return null;
}

function estimateCharWidth(char: string, fontSize: number) {
  if (char === " ") {
    return fontSize * 0.28;
  }

  if (/[ilj\.!'|]/.test(char)) {
    return fontSize * 0.28;
  }

  if (/[mwMW@]/.test(char)) {
    return fontSize * 0.72;
  }

  if (/[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ]/.test(char)) {
    return fontSize * 0.62;
  }

  return fontSize * 0.55;
}

function estimateTextWidth(text: string, fontSize: number) {
  if (!text) {
    return 0;
  }

  let width = 0;

  for (const char of text) {
    width += estimateCharWidth(char, fontSize);
  }

  width += (text.length - 1) * NAME_LETTER_SPACING;
  return Math.ceil(width * 1.04);
}

function wrapTextToWidth(value: string, fontSize: number, maxWidth: number, maxLines: number): string[] | null {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return [];
  }

  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (estimateTextWidth(nextLine, fontSize) <= maxWidth || !currentLine) {
      currentLine = nextLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;

    if (lines.length >= maxLines) {
      return null;
    }
  }

  if (currentLine) {
    if (lines.length >= maxLines) {
      return null;
    }

    const fittedLine =
      estimateTextWidth(currentLine, fontSize) <= maxWidth
        ? currentLine
        : truncateTextToWidth(currentLine, fontSize, maxWidth);

    lines.push(fittedLine);
  }

  if (lines.some((line) => estimateTextWidth(line, fontSize) > maxWidth)) {
    return null;
  }

  return lines;
}

function truncateTextToWidth(value: string, fontSize: number, maxWidth: number) {
  if (estimateTextWidth(value, fontSize) <= maxWidth) {
    return value;
  }

  let truncated = value;

  while (truncated.length > 1 && estimateTextWidth(`${truncated}…`, fontSize) > maxWidth) {
    truncated = truncated.slice(0, -1).trimEnd();
  }

  return `${truncated}…`;
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
