import { SVGAttributes } from 'react';

type PathDef =
  | { type: 'path'; d: string }
  | { type: 'circle'; cx: number; cy: number; r: number };

type IconDef = PathDef[];

const ICONS: Record<string, IconDef> = {
  cart: [
    { type: 'path', d: 'M4 5h2.2l2 11.2a1.6 1.6 0 0 0 1.6 1.3h8a1.6 1.6 0 0 0 1.6-1.3L21 8H7' },
    { type: 'circle', cx: 10.5, cy: 20, r: 1.1 },
    { type: 'circle', cx: 18, cy: 20, r: 1.1 },
  ],
  search: [
    { type: 'circle', cx: 11, cy: 11, r: 6.25 },
    { type: 'path', d: 'm20 20-4.5-4.5' },
  ],
  heart: [{ type: 'path', d: 'M12 19.5s-7.5-4.4-7.5-10A4 4 0 0 1 12 7.5a4 4 0 0 1 7.5 2c0 5.6-7.5 10-7.5 10z' }],
  user: [
    { type: 'circle', cx: 12, cy: 9, r: 3.5 },
    { type: 'path', d: 'M5.5 19.5c1.2-3.2 3.9-4.6 6.5-4.6s5.3 1.4 6.5 4.6' },
  ],
  'arrow-up-right': [
    { type: 'path', d: 'M7 17 17 7' },
    { type: 'path', d: 'M9 7h8v8' },
  ],
  'arrow-right': [
    { type: 'path', d: 'M5 12h14' },
    { type: 'path', d: 'm13 6 6 6-6 6' },
  ],
  'arrow-left': [
    { type: 'path', d: 'M19 12H5' },
    { type: 'path', d: 'm11 6-6 6 6 6' },
  ],
  check: [{ type: 'path', d: 'm5 12.5 4.5 4.5L19 7.5' }],
  star: [{ type: 'path', d: 'm12 4 2.5 5.2 5.7.8-4.1 4 1 5.7L12 17l-5.1 2.7 1-5.7L3.8 10l5.7-.8L12 4z' }],
  pin: [
    { type: 'path', d: 'M12 21s-6-6-6-11a6 6 0 1 1 12 0c0 5-6 11-6 11z' },
    { type: 'circle', cx: 12, cy: 10, r: 2.25 },
  ],
  truck: [
    { type: 'path', d: 'M2 7h12v9H2z' },
    { type: 'path', d: 'M14 10h4.5L21 13v3h-7' },
    { type: 'circle', cx: 7, cy: 18, r: 1.8 },
    { type: 'circle', cx: 17, cy: 18, r: 1.8 },
  ],
  note: [
    { type: 'path', d: 'M5 4h11l3 3v13H5z' },
    { type: 'path', d: 'M16 4v3h3' },
    { type: 'path', d: 'M8 11h7M8 15h7M8 19h4' },
  ],
  menu: [{ type: 'path', d: 'M4 7h16M4 12h16M4 17h10' }],
  close: [
    { type: 'path', d: 'M6 6l12 12' },
    { type: 'path', d: 'M18 6L6 18' },
  ],
  plus: [
    { type: 'path', d: 'M12 5v14' },
    { type: 'path', d: 'M5 12h14' },
  ],
  minus: [{ type: 'path', d: 'M5 12h14' }],
  'chevron-down': [{ type: 'path', d: 'm6 9 6 6 6-6' }],
  code: [
    { type: 'path', d: 'm16 18 6-6-6-6' },
    { type: 'path', d: 'M8 6 2 12l6 6' },
  ],
};

interface IconProps extends SVGAttributes<SVGElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.75, style, ...rest }: IconProps) {
  const defs = ICONS[name];
  if (!defs) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      {defs.map((def, i) =>
        def.type === 'circle' ? (
          <circle key={i} cx={def.cx} cy={def.cy} r={def.r} />
        ) : (
          <path key={i} d={def.d} />
        )
      )}
    </svg>
  );
}
