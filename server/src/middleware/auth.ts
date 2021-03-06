import jwt from 'jsonwebtoken';

//implicit "any" because it's middleware so we cannot assume the type
const auth = (req: any, res: any, next: any) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token, Authorization denied');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
  } catch (err) {
    console.log('JWT Verification failed - token was invalid');
    return res.status(400).json({ msg: 'Invalid token' });
  }

  next();
};

export default auth;
