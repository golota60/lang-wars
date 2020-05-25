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

export interface MatchInterface {
  enemyName: string;
  language: string;
  outcome: string;
}

export interface UserDataInterface {
  _id: string;
  name: string;
  email: string;
  friends: Array<UserDataInterface>;
  receivedInvitations: Array<UserDataInterface>;
  sentInvitations: Array<UserDataInterface>;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  matchHistory: Array<MatchInterface>;
  awaitingDuels: Array<MatchInterface>;
  sentDuels: Array<MatchInterface>;
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

export async function declineFriendRequest(
  token: string,
  friendName: string,
): Promise<any> {
  try {
    const body: AddFriendInterface = { friendName: friendName };
    return await fetch(`${URI}/api/user/friends/decline-request`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during accept request fetch ${err}`);
  }
  return Promise.reject();
}

export async function deleteFriend(
  token: string,
  friendName: string,
): Promise<any> {
  try {
    const body: AddFriendInterface = { friendName: friendName };
    return await fetch(`${URI}/api/user/friends/delete-friend`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during deleting friend fetch ${err}`);
  }
  return Promise.reject();
}

interface sendDuelInterface {
  language: 'german' | 'italian' | 'polish' | 'english';
  enemyName: string;
}

export async function sendDuel(
  token: string,
  enemyName: string,
  language: 'german' | 'italian' | 'polish' | 'english',
) {
  try {
    const body: sendDuelInterface = {
      enemyName: enemyName,
      language: language,
    };
    return await fetch(`${URI}/api/user/duels/add`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during sendDuel fetch ${err}`);
  }
  return Promise.reject();
}

interface GetQuestionsInterface {
  numberOfQuestions: number;
  language: 'german' | 'italian' | 'polish' | 'english';
}

export async function getQuestions(
  token: string,
  numberOfQuestions: number,
  language: 'german' | 'italian' | 'polish' | 'english',
) {
  try {
    const body: GetQuestionsInterface = {
      numberOfQuestions: numberOfQuestions,
      language: language,
    };
    return await fetch(`${URI}/api/questions/get-questions`, {
      method: 'POST',
      headers: returnTokenHeader(token),
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`Error during getQuestions fetch ${err}`);
  }
  return Promise.reject();
}
