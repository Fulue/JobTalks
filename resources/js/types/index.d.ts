import React from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type NavProps = {
    className?: string;
    children?: React.ReactNode;
    id?: string;
};

export interface HomeProps {
    professions: Profession[];
}

export type Profession = {
    id: string;
    profession: string;
    count?: number | null;
    icon: string;
    icon_color: string;
    tags?: Tag[] | null;
};

export type QuestionItems = {
    items: Question[];
    lastPage: number;
    total: number;
};

export type Question = {
    id: string;
    question: string;
    level?: string | null;
    level_icon?: string | null;
    profession?: string | null;
    tags?: Tag[] | null;
    answers?: Answer[] | null;
    percentage: number;
    ease: number;
    views: number;
    likes: number;
    dislikes: number;
    user_reaction: "like" | "dislike" | false;
};

export type Answer = {
    id: string;
    answer: string;
    level?: string | null;
    $created_at: string;
};

export type Timestamp = {
    id: string;
    question_text: string;
    start_time: string;
    start_time_seconds: number;
    video_name: string;
    url: string;
    tags?: Tag[] | null;
};

export type Tag = {
    id: string;
    tag: string;
    color?: string;
};

export interface QuestionsProps {
    questions: QuestionItems;
    profession: Profession;
    tags?: Tag[] | null;
}
