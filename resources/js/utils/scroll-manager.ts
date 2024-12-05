export const restoreScrollPosition = (questions: any) => {
    const currentPath = window.location.pathname; // Получаем текущий путь страницы

    if (questions !== undefined) {
        const savedScrollData = sessionStorage.getItem("scrollPos");

        if (savedScrollData) {
            // Получаем сохраненные данные скролла
            const savedData = JSON.parse(savedScrollData);

            // Если путь совпадает, восстанавливаем скролл
            if (savedData.path === currentPath) {
                setTimeout(() => {
                    window.scrollTo({
                        top: savedData.scrollPos,
                        behavior: "smooth",
                    });
                }, 250);
                sessionStorage.removeItem("scrollPos");
            } else {
                // Если пути не совпадают, очищаем данные
                sessionStorage.removeItem("scrollPos");
            }
        }
    }
};

export const saveScrollPosition = () => {
    const currentPath = window.location.pathname; // Получаем текущий путь

    // Сохраняем путь и позицию скролла в sessionStorage
    sessionStorage.setItem(
        "scrollPos",
        JSON.stringify({
            path: currentPath, // Путь страницы
            scrollPos: window.scrollY, // Позиция скролла
        }),
    );
};
