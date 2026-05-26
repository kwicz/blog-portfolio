interface Brand { name: string; file: string; precolored?: boolean }

const BRANDS: Brand[] = [
  { name: 'Danner',              file: 'danner.png' },
  { name: 'Fully',               file: 'fully.png' },
  { name: 'GLDN',                file: 'gldn.png' },
  { name: "Ka'Chava",            file: 'kachava.png' },
  { name: 'Knoll',               file: 'knoll.png' },
  { name: 'Old World Christmas', file: 'old_world_christmas.png' },
  { name: 'Pendleton',           file: 'pendleton.png' },
  { name: 'Pirate Ship',         file: 'pirate_ship.png' },
  { name: 'Primally Pure',       file: 'primally_pure.png' },
  { name: 'ShirtSpace',          file: 'shirtspace.png' },
  { name: 'SVS Sound',           file: 'svs_sound.png',  precolored: true },
  { name: 'World Vision',        file: 'world_vision.png' },
];

export function BrandBanner() {
  return (
    <section className="brand-banner">
      <div className="container brand-banner-header">
        <p className="brand-banner-eyebrow">In Good Company</p>
        <h2 className="brand-banner-headline">Brands I loved working with.</h2>
      </div>

      <div className="brand-track-wrap">
        <div className="brand-track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className={`brand-logo${brand.precolored ? ' brand-logo--precolored' : ''}`} aria-hidden={i >= BRANDS.length}>
              <img
                src={`/logos/${brand.file}`}
                alt={brand.name}
                height={44}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
