export type Row =
  | {
      kind: "full";
      src: string;
      index: number;
    }
  | {
      kind: "pair";
      flip: boolean;
      wide: {
        src: string;
        index: number;
      };
      narrow: {
        src: string;
        index: number;
      };
    }
  | {
      kind: "text";
      body: string;
      n: number;
    };

const PORTRAIT = /(?:^|\/)(?:s\d+|d[1358])\.webp$/i;

export const isPortrait = (src: string) => PORTRAIT.test(src);

export function planGallery(gallery: string[], paragraphs: string[]): Row[] {
  const imgs = gallery.map((src, index) => ({
    src,
    index,
  }));

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

    if (!full) break;

    rows.push({
      kind: "full",
      ...full,
    });

    if (imgs.length >= 2) {
      const narrow = takePortrait();

      const wide = takeLandscape();

      if (narrow && wide) {
        rows.push({
          kind: "pair",
          flip: pairs++ % 2 === 1,
          wide,
          narrow,
        });
      } else if (narrow) {
        rows.push({
          kind: "full",
          ...narrow,
        });
      } else if (wide) {
        rows.push({
          kind: "full",
          ...wide,
        });
      }
    } else if (imgs.length === 1) {
      const remaining = imgs.shift();

      if (remaining) {
        rows.push({
          kind: "full",
          ...remaining,
        });
      }
    }

    if (text.length) {
      rows.push({
        kind: "text",
        body: text.shift()!,
        n: ++t,
      });
    }
  }

  while (text.length) {
    rows.push({
      kind: "text",
      body: text.shift()!,
      n: ++t,
    });
  }

  return rows;
}
