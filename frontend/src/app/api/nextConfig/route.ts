export async function GET() {
    return Response.json({
        apiBaseUrl: process.env.INTERNAL_API_URL,
    });
}

