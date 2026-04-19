export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
            headers: {
                apikey: process.env.SUPABASE_KEY,
            },
        });

        return res.status(200).json({ status: "ping success" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}