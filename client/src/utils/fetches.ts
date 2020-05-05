const URI = 'http://localhost:5000';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

interface TypedResponse<T = any> extends Response {
  json(): Promise<T>;
}

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
  try {
    const response = await fetch(`${URI}/api/login/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during registerUser fetch ${err}`);
  }
  return Promise.reject();
}

export interface LoginUserInterface {
  email: string;
  password: string;
}

export async function loginUser(body: LoginUserInterface): Promise<any> {
  try {
    const response = await fetch(`${URI}/api/login/signin`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during loginUser fetch: ${err}`);
  }

  return Promise.reject();
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const response = await fetch(`${URI}/api/login/user`, {
      method: 'GET',
      headers: returnTokenHeader(token),
    });
    return response;
  } catch (err) {
    console.error(`Error during verifyToken fetch: ${err}`);
  }
  return Promise.reject();
}

export interface UserDataInterface {
  _id: string;
  name: string;
  email: string;
  friends: Array<UserDataInterface>;
  receivedInvitations: Array<UserDataInterface>;
  sentInvitations: Array<UserDataInterface>;
}

export async function getUser(
  token: string,
): Promise<TypedResponse<UserDataInterface>> {
  try {
    const response = await fetch(`${URI}/api/login/user/home`, {
      method: 'GET',
      headers: returnTokenHeader(token),
    });
    return response;
  } catch (err) {
    console.error(`Error during getUser fetch: ${err}`);
  }
  return Promise.reject();
}

interface AddFriendInterface {
  friendName: string;
}

export async function sendFriendRequest(
  token: string,
  friendName: string,
): Promise<any> {
  try {
    const body: AddFriendInterface = { friendName: friendName };
    return await fetch(`${URI}/api/user/friends/send-request`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during send request fetch ${err}`);
  }
  return Promise.reject();
}

export async function acceptFriendRequest(
  token: string,
  friendName: string,
): Promise<any> {
  try {
    const body: AddFriendInterface = { friendName: friendName };
    return await fetch(`${URI}/api/user/friends/accept-request`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during accept request fetch ${err}`);
  }
  return Promise.reject();
}
