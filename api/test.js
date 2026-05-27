module.exports = (req, res) => {
    res.status(200).json({
        ok: true,
        method: req.method,
        env_openai: !!process.env.OPENAI_API_KEY,
        env_supabase: !!process.env.SUPABASE_URL,
        node: process.version
    });
};
