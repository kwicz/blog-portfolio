// Button — pill, sentence case. Variants: primary | secondary | accent | ghost | outline-caps
function Button({ variant = 'primary', size, round, icon, iconRight, children, className = '', ...rest }) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size === 'lg' && 'btn-lg',
    round && 'btn-round',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={14} />}
    </button>
  );
}

// Outline caps "see more ↗" pill — editorial moment, not for primary actions
function SeeMore({ children = 'See more', ...rest }) {
  return (
    <Button variant="outline-caps" iconRight="arrow-up-right" {...rest}>{children}</Button>
  );
}

// Round arrow button — pairs with carousels
function ArrowButton({ direction = 'right', ...rest }) {
  return (
    <Button variant="ghost" round {...rest}>
      <Icon name={`arrow-${direction}`} size={18} />
    </Button>
  );
}

Object.assign(window, { Button, SeeMore, ArrowButton });
