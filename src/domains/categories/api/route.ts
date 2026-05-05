import wpApi from "@/shared/lib/wordpress.lib";


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit') || '16';
        const lang = searchParams.get('lang') || 'es';

        const { data } = await wpApi.get(`/wp/v2/categories`, {
            params: { featured: true, per_page: 100, limit: Number(limit), lang }
        })

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

}