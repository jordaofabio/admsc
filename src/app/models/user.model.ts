export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string | null;
    photo: File | null;
    password: string | null;
    level: number | null;
    'access_level': number | null;
    enabled: boolean;

}

export class ConfirmUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    photo: File | null;
}
