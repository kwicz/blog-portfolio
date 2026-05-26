// Marquee — scrolling announcement bar above the header.
// Duplicates the item list and translateX(-50%) for seamless loop. Pauses on hover.
function Marquee({ items }) {
  const sequence = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {sequence.map((t, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">{t}</span>
            <span className="marquee-sep" aria-hidden></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Marquee });
