const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        // Bypass authentication for single-user mode
        // Find the demo user or any user to attach to the request
        let user = await User.findOne({ email: 'demo@finmate.com' });

        if (!user) {
            // Fallback if demo user doesn't exist (shouldn't happen if seeded)
            user = await User.findOne({});
        }

        if (!user) {
            return res.status(500).json({ msg: 'No users found. Please run seed script.' });
        }

        req.user = { id: user.id };
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err);
        res.status(500).json({ msg: 'Server Error in Auth Middleware' });
    }
};
