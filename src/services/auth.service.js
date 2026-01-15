
const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'SISWA'
    }
  });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Email tidak terdaftar');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Password salah');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  });

  return { user, accessToken, refreshToken };
};

const logout = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null }
  });
};

module.exports = { register, login, logout };
