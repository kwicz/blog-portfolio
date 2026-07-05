import { PageviewTracker } from './pageview-tracker';

const GA_MEASUREMENT_ID = 'G-K69MB7HMZ3';

// Plain <script> tags (not next/script) so the snippet is present in the
// server-rendered HTML — Search Console's verifier doesn't execute JS.
export default function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <PageviewTracker gaId={GA_MEASUREMENT_ID} />
    </>
  );
}
