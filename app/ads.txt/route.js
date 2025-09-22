const DEFAULT_ADSENSE_PUBLISHER_ID = 'pub-6855589905040705'
const ADSENSE_PUBLISHER_ID = (
  process.env.ADSENSE_PUBLISHER_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
  DEFAULT_ADSENSE_PUBLISHER_ID
).trim()

const ADS_TXT_BODY = ADSENSE_PUBLISHER_ID
  ? `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`
  : `# Set ADSENSE_PUBLISHER_ID (e.g. "pub-xxxxxxxxxxxxxxxx") in your env before production.\n`

export const dynamic = 'force-static'

export async function GET() {
  return new Response(ADS_TXT_BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
