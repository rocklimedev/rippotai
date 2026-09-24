/**
 * Turns a flat image list + body paragraphs into a planned editorial sequence:
 *   full-bleed → 65/35 pair → text → full-bleed → 35/65 pair → text …
 * Portrait images (known local set) are steered into the narrow 35% slot.
 */
export type Row =
  | { kind: "full"; src: string; index: number }
  | { kind: "pair"; flip: boolean; wide: { src: string; index: number }; narrow: { src: string; index: number } }
  | { kind: "text"; body: string; n: number };

const PORTRAIT = /\/images\/(s\d+|d[1358])\.webp$/;
export const isPortrait = (src: string) => PORTRAIT.test(src);

export function planGallery(gallery: string[], paragraphs: string[]): Row[] {
  const imgs = gallery.map((src, index) => ({ src, index }));
  const rows: Row[] = [];
  const text = [...paragraphs];
  let t = 0;
  let pairs = 0;
  const takeLandscape = () => {
    const k = imgs.findIndex((i) => !isPortrait(i.src));
    return imgs.splice(k === -1 ? 0 : k, 1)[0];
  };
  const takePortrait = () => {
    const k = imgs.findIndex((i) => isPortrait(i.src));
    return imgs.splice(k === -1 ? 0 : k, 1)[0];
  };
  while (imgs.length) {
    const full = takeLandscape();
    rows.push({ kind: "full", ...full });
    if (imgs.length >= 2) {
      const narrow = takePortrait();
      const wide = takeLandscape();
      rows.push({ kind: "pair", flip: pairs++ % 2 === 1, wide, narrow });
    } else if (imgs.length === 1) {
      rows.push({ kind: "full", ...imgs.shift()! });
    }
    if (text.length) rows.push({ kind: "text", body: text.shift()!, n: ++t });
  }
  // any paragraphs left over (short galleries) go at the end
  while (text.length) rows.push({ kind: "text", body: text.shift()!, n: ++t });
  return rows;
}
