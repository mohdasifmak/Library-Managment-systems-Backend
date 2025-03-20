const User = require('../models/User');

exports.getUserBooks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('borrowedBooks');
    if (!user) return res.json({ message: 'User not found' });

    res.json(user.borrowedBooks);
  } catch (error) {
    res.json({ error: error.message });
  }
};
