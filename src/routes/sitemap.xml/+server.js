export async function GET() {
    const pages = [
        '',
        '/about',
        '/contact',
        '/experience',
        '/work'
    ];

    const today = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `    <url>
        <loc>https://blazingfast.app${page}</loc>
        <lastmod>${today}</lastmod>
    </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
    });
}
