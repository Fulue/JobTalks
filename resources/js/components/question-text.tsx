import React from "react";

// Функция для выделения английских слов и фраз
const highlightEnglishWords = (text: string) => {
    // Регулярное выражение для выделения фраз с английскими буквами, окружённых пробелами или знаками препинания
    const regex =
        /(?:\s|^|[.,?])(([a-zA-Z.()@#$%^&*_\[\]{}+\-='0-9/]|[А-Я]{2,}|[a-zA-Z\s])+(?:\s+\d+)?|[a-zA-Z]+-[а-яА-Я]+)(?=\s|[.,?:]|$)/g;

    // Замена совпадений на выделенные версии
    return text.replace(regex, (match, p1) => {
        return match.replace(
            p1,
            `<span class="whitespace-nowrap bg-default-200 px-1.5 rounded">${p1}</span>`,
        );
    });
};

// Компонент для отображения текста с выделением
const QuestionText: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h5
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: highlightEnglishWords(text) }}
        />
    );
};

export default QuestionText;
