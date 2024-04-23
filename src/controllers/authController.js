const userDB = require('../db/users.json');

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = userDB.find(({ id }) => id === +userId);

    if (!user) return res.status(400).send({ message: 'Usuario no encontrado' });

    return res.status(200).send(user);

  } catch(error) {
    console.error('[authController getUserById error]: ', error);

    return res.status(400).send({ message: 'Usuario no encontrado '});
  }
}

module.exports = {
  getUserById,
}