import RootLayout from "@/Layouts/layout";
import { Container, Section } from "@/components/craft";
import { Question, QuestionsProps, Tag } from "@/types";
import React, { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { Deferred, Head, router } from "@inertiajs/react";
import iconComponents from "@/config/icons.config";
import { useDebouncedCallback } from "use-debounce";
import { Button, Pagination } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import SearchFilter from "@/pages/questions/search-filter";
import {
    QuestionCard,
    QuestionCardSkeleton,
} from "@/pages/questions/question-card";
import { ArrowLeft, Code } from "lucide-react";
import {
    restoreScrollPosition,
    saveScrollPosition,
} from "@/utils/scroll-manager";

export default function Questions({
    questions,
    profession,
    tags,
}: QuestionsProps) {
    return (
        <RootLayout>
            <Head>
                <title>{profession.profession}</title>
                <meta
                    name="description"
                    content={`Вопросы для собеседования на профессию ${profession.profession}`}
                />
                <meta property="og:title" content={profession.profession} />
                <meta
                    property="og:description"
                    content={`Вопросы для собеседования на профессию ${profession.profession}`}
                />
            </Head>
            <Section>
                <Container>
                    <Content
                        questions={questions}
                        profession={profession}
                        tags={tags}
                    ></Content>
                </Container>
            </Section>
        </RootLayout>
    );
}

const Content = ({ questions, profession, tags }: QuestionsProps) => {
    const [searchActive, setSearchActive] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(
        Number(new URL(window.location.href).searchParams.get("page")) || 1,
    );
    const [lastPage, setLastPage] = useState<number>(1);

    const [selectedTagId, setSelectedTagId] = useState<string | null>(
        new URL(window.location.href).searchParams.get("filter[tags]") || null,
    );

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([selectedTagId || "all"]),
    );

    const [searchQuery, setSearchQuery] = useState<string>(
        new URL(window.location.href).searchParams.get("filter[search]") || "",
    );

    const debouncedSearch = useDebouncedCallback((query: string) => {
        const newUrl = updateURL({ "filter[search]": query, page: null });
        router.visit(newUrl);
    }, 1000);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleTagChange = (tagId: string) => {
        setSelectedTagId(tagId.toString());
        const newUrl = updateURL({ "filter[tags]": tagId, page: null });
        router.visit(newUrl);
    };

    const handleTagBadgeClick = (tagId: string) => {
        let newUrl = "";
        if (selectedTagId == tagId) {
            setSelectedTagId(null);
            newUrl = updateURL({ "filter[tags]": null, page: null });
        } else {
            setSelectedTagId(tagId);
            newUrl = updateURL({ "filter[tags]": tagId, page: null });
        }
        router.visit(newUrl, {});
    };

    useEffect(() => {
        if (questions && questions.lastPage) {
            setLastPage(questions.lastPage);
        }

        const searchParam = new URL(window.location.href).searchParams.get(
            "filter[search]",
        );
        if (searchParam && searchParam.length > 0) {
            setSearchActive(true);
        } else {
            setSearchActive(false);
        }
    }, [questions, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const newUrl = updateURL({ page: page });
        router.visit(newUrl);
    };

    const handleClearTag = () => {
        setSelectedTagId(null);
        const newUrl = updateURL({ "filter[tags]": null, page: null });
        router.visit(newUrl);
    };

    const updateURL = (params: Record<string, any>) => {
        const url = new URL(window.location.href);

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value.toString());
            } else {
                url.searchParams.delete(key);
            }
        });

        return url.toString();
    };

    useEffect(() => {
        restoreScrollPosition(questions);
    }, [questions]);

    const handleLinkClick = () => {
        saveScrollPosition();
    };

    return (
        <article className="prose-m-none space-y-6">
            <div className="flex flex-col gap-2">
                {iconComponents[profession.icon] ? (
                    iconComponents[profession.icon](profession.icon_color, 100)
                ) : (
                    <Code size={65} />
                )}
                <div className="flex items-center gap-1">
                    <Button
                        size="sm"
                        onClick={() => history.back()}
                        isIconOnly
                        color="default"
                        variant="light"
                        aria-label="Назад"
                    >
                        <ArrowLeft size={16} />
                    </Button>
                    <h3 className="scroll-m-20 text-base font-extrabold lg:text-4xl ">
                        <Balancer>{profession.profession} - Вопросы</Balancer>
                    </h3>
                </div>
                <p className="text-sm text-default-500">
                    Список вопросов для вашей профессии
                </p>
            </div>

            <SearchFilter
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                tags={tags}
                handleTagChange={handleTagChange}
                handleClearTag={handleClearTag}
            />

            {questions &&
            questions.items.length > 0 &&
            searchQuery.length > 0 &&
            searchActive ? (
                <div className="flex items-center justify-between">
                    <span className="whitespace-nowrap text-sm text-default-500">
                        Вопросов найдено: <b>{questions.total}</b>
                    </span>
                </div>
            ) : (
                ""
            )}

            <Deferred data="questions" fallback={<QuestionCardSkeleton />}>
                <>
                    {questions && questions.items.length > 0 ? (
                        <div className="not-prose grid gap-4 md:grid-cols-2">
                            {questions.items.map((question: Question) => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    selectedTagId={selectedTagId}
                                    handleTagBadgeClick={handleTagBadgeClick}
                                    handleLinkClick={handleLinkClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span className="whitespace-nowrap text-sm text-default-500">
                                Вопросы не найдены
                            </span>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <Pagination
                            size="md"
                            showControls
                            total={lastPage}
                            initialPage={currentPage}
                            onChange={handlePageChange}
                            variant="light"
                        />
                    </div>
                </>
            </Deferred>
        </article>
    );
};
