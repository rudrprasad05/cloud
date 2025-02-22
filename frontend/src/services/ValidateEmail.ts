const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function ValidateEmail(email: string): boolean {
    return emailRegex.test(email);
}
