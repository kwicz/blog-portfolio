// EditorialHeader — "title-left · controls + see more right" pattern.
function EditorialHeader({ eyebrow, title, onPrev, onNext, onSeeMore, seeMoreLabel = 'See more' }) {
  return (
    <div className="ed-head">
      <div>
        {eyebrow && <span className="ed-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      <div className="ed-controls">
        {onPrev && <ArrowButton direction="left" onClick={onPrev} />}
        {onNext && <ArrowButton direction="right" onClick={onNext} />}
        {onSeeMore && <SeeMore onClick={onSeeMore}>{seeMoreLabel}</SeeMore>}
      </div>
    </div>
  );
}

Object.assign(window, { EditorialHeader });
