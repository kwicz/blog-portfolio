import { EditorialHeader } from '../components/editorial-header';

const SI = 'https://cdn.simpleicons.org';

interface Tool {
  name: string;
  logo: string;
  surface: 'lilac' | 'sage' | 'honey' | 'lavender';
}

const SURFACE_MAP: Record<string, string> = {
  lilac:    'var(--color-lilac)',
  sage:     'var(--color-sage)',
  honey:    '#E26B4C',
  lavender: '#B0A8C4',
};

const TOOLS: Tool[] = [
  { name: 'Convert Experiences', logo: '/logos/tools/convert.svg',       surface: 'lilac'    },
  { name: 'JavaScript',          logo: `${SI}/javascript`,                surface: 'honey'    },
  { name: 'React',               logo: `${SI}/react`,                     surface: 'sage'     },
  { name: 'Railway',             logo: `${SI}/railway`,                   surface: 'lavender' },
  { name: 'Sentry',              logo: `${SI}/sentry`,                    surface: 'lilac'    },
  { name: 'Airtable',            logo: `${SI}/airtable`,                  surface: 'sage'     },
  { name: 'Notion',              logo: `${SI}/notion`,                    surface: 'lavender' },
  { name: 'Resend',              logo: `${SI}/resend`,                    surface: 'lilac'    },
  { name: 'GA4',                 logo: `${SI}/googleanalytics`,           surface: 'honey'    },
  { name: 'Google Tag Manager',  logo: `${SI}/googletagmanager`,          surface: 'sage'     },
  { name: 'BigQuery',            logo: `${SI}/googlebigquery`,            surface: 'lavender' },
  { name: 'Claude',              logo: `${SI}/anthropic`,                 surface: 'lilac'    },
  { name: 'VS Code',             logo: '/logos/tools/vscode.svg',          surface: 'honey'    },
  { name: 'WordPress',           logo: `${SI}/wordpress`,                 surface: 'sage'     },
  { name: 'Figma',               logo: `${SI}/figma`,                     surface: 'lavender' },
];

export const metadata = {
  title: 'Favorites — K. Solovewicz',
  description: 'Tools I reach for every day.',
};

export default function FavoritesPage() {
  return (
    <>
      <section style={{ paddingBlock: '56px 48px' }}>
        <div className="container">
          <EditorialHeader eyebrow="Favorites" title="My go-to stack." />
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: '28px', color: 'var(--ink-700)', maxWidth: 520 }}>
            Tools I reach for every day — for testing, building, shipping, and staying sane.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div className="tool-grid">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="tool-tile">
                <div className="tool-tile-square" style={{ background: SURFACE_MAP[tool.surface] }}>
                  <img src={tool.logo} alt="" aria-hidden="true" className="tool-tile-logo" />
                </div>
                <span className="tool-tile-label">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
