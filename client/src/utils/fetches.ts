const URI = 'http://localhost:5000';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

function returnTokenHeader(token: string) {
  return {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  };
}

export interface RegisterUserInterface {
  name: string;
  password: string;
  email: string;
}

export async function registerUser(body: RegisterUserInterface): Promise<any> {
  const response = await fetch(`${URI}/api/login/signup`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: jsonHeaders,
  });

  return response;
}

export interface LoginUserInterface {
  email: string;
  password: string;
}

export async function loginUser(body: LoginUserInterface): Promise<any> {
  const response = await fetch(`${URI}/api/login/signin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: jsonHeaders,
  });

  return response;
}

export async function verifyToken(token: string): Promise<any> {
  const response = await fetch(`${URI}/api/login/user`, {
    method: 'GET',
    headers: returnTokenHeader(token),
  });

  return response;
}
