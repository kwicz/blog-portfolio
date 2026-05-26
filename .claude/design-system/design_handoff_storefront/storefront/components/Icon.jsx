// Icon — inline SVG by name. Stroke is currentColor.
const ICON_PATHS = {
  cart:           (<React.Fragment><path d="M4 5h2.2l2 11.2a1.6 1.6 0 0 0 1.6 1.3h8a1.6 1.6 0 0 0 1.6-1.3L21 8H7"/><circle cx="10.5" cy="20" r="1.1"/><circle cx="18" cy="20" r="1.1"/></React.Fragment>),
  search:         (<React.Fragment><circle cx="11" cy="11" r="6.25"/><path d="m20 20-4.5-4.5"/></React.Fragment>),
  heart:          (<path d="M12 19.5s-7.5-4.4-7.5-10A4 4 0 0 1 12 7.5a4 4 0 0 1 7.5 2c0 5.6-7.5 10-7.5 10z"/>),
  user:           (<React.Fragment><circle cx="12" cy="9" r="3.5"/><path d="M5.5 19.5c1.2-3.2 3.9-4.6 6.5-4.6s5.3 1.4 6.5 4.6"/></React.Fragment>),
  'arrow-up-right': (<React.Fragment><path d="M7 17 17 7"/><path d="M9 7h8v8"/></React.Fragment>),
  'arrow-right':  (<React.Fragment><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></React.Fragment>),
  'arrow-left':   (<React.Fragment><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></React.Fragment>),
  check:          (<path d="m5 12.5 4.5 4.5L19 7.5"/>),
  star:           (<path d="m12 4 2.5 5.2 5.7.8-4.1 4 1 5.7L12 17l-5.1 2.7 1-5.7L3.8 10l5.7-.8L12 4z"/>),
  pin:            (<React.Fragment><path d="M12 21s-6-6-6-11a6 6 0 1 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2.25"/></React.Fragment>),
  truck:          (<React.Fragment><path d="M2 7h12v9H2z"/><path d="M14 10h4.5L21 13v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></React.Fragment>),
  note:           (<React.Fragment><path d="M5 4h11l3 3v13H5z"/><path d="M16 4v3h3"/><path d="M8 11h7M8 15h7M8 19h4"/></React.Fragment>),
  menu:           (<path d="M4 7h16M4 12h16M4 17h10"/>),
  close:          (<React.Fragment><path d="M6 6l12 12"/><path d="M18 6L6 18"/></React.Fragment>),
  plus:           (<React.Fragment><path d="M12 5v14"/><path d="M5 12h14"/></React.Fragment>),
  minus:          (<path d="M5 12h14"/>),
  'chevron-down': (<path d="m6 9 6 6 6-6"/>),
};

function Icon({ name, size = 20, strokeWidth = 1.75, style, ...rest }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
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
      {paths}
    </svg>
  );
}

Object.assign(window, { Icon });
