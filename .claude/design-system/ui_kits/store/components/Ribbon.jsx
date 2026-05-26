// Ribbon — notched flag stamp. Tomato by default. Pinned top-left of imagery.
function Ribbon({ color = 'tomato', children }) {
  return <span className={`ribbon ribbon-${color}`}>{children}</span>;
}

// Badge — lower-volume pill state marker.
function Badge({ kind = 'instock', icon, children }) {
  return (
    <span className={`badge badge-${kind}`}>
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}

Object.assign(window, { Ribbon, Badge });
