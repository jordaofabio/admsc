import { Category } from './category.model';

export class Post {
    id: number;
    title: string;
    categories: Category[];
    summary: string;
    content: string;
}

export class ConfirmPost {
    id: number;
    title: string;
}
