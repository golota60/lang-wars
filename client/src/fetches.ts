const URI = 'http://localhost:5000';

export interface RegisterUserInterface {
    name: string,
    password: string,
    email: string
}

export async function registerUser(body: RegisterUserInterface): Promise<String> {
    const response = await fetch(`${URI}/api/login/signup`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json();
}