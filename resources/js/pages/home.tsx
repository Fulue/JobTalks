import { Head, Link, router } from "@inertiajs/react";
import RootLayout from "@/Layouts/layout";
import Balancer from "react-wrap-balancer";
import { Container, Section } from "@/components/craft";
import WordRotate from "@/components/ui/word-rotate";
import { HomeProps, Profession } from "@/types";
import React from "react";
import iconComponents from "@/config/icons.config";
import { Code, HomeIcon, ListIcon, UsersIcon } from "lucide-react";
import { Card, CardBody, Divider } from "@nextui-org/react";

export default function Home({ professions }: HomeProps) {
    return (
        <RootLayout>
            <Head>
                <title>Главная</title>
                <meta
                    name="description"
                    content="Сервис с вопросами и ответами для подготовки к техническим интервью в IT."
                />
                <meta property="og:title" content="Главная" />
                <meta
                    property="og:description"
                    content="Сервис с вопросами и ответами для подготовки к техническим интервью в IT."
                />
            </Head>
            <Section>
                <Container>
                    <Content professions={professions} />
                </Container>
            </Section>
        </RootLayout>
    );
}

const Content = ({ professions }: HomeProps) => {
    return (
        <article className="prose-m-none">
            <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl">
                <Balancer>
                    Подготовка к собеседованию
                    <WordRotate
                        words={[
                            <span className="text-indigo-500 dark:text-indigo-400">
                                PHP
                            </span>,
                            <span className="text-yellow-400 dark:text-yellow-500">
                                Frontend
                            </span>,
                            <span className="text-red-500 dark:text-red-600">
                                Java
                            </span>,
                            <span className="text-yellow-400 dark:text-yellow-500">
                                Python
                            </span>,
                            <span className="text-blue-500 dark:text-blue-600">
                                DevOps
                            </span>,
                        ]}
                    />
                </Balancer>
            </h1>

            <p className="mt-6 text-lg text-default-500">
                Сервис с вопросами и ответами для подготовки к техническим
                интервью в IT.
            </p>

            <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
                {professions.map((profession: Profession) => (
                    <Card
                        key={profession.id}
                        isPressable
                        onMouseMove={() => {
                            router.prefetch(
                                `/profession/${profession.id}/questions`,
                                { method: "get" },
                                { cacheFor: "30s" },
                            );
                        }}
                        onPress={() =>
                            router.visit(
                                `/profession/${profession.id}/questions`,
                            )
                        }
                        className="w-full"
                    >
                        <CardBody className="flex justify-between flex-col px-5 pt-6 gap-4">
                            {iconComponents[profession.icon] ? (
                                iconComponents[profession.icon](
                                    profession.icon_color,
                                )
                            ) : (
                                <Code size={65} />
                            )}
                            <span>
                                <b>{profession.profession}</b>
                                <Divider className="my-4" />
                                <span className="flex justify-between text-sm text-muted-foreground">
                                    <p>Вопросов</p>
                                    <b className="text-default-500">
                                        {" "}
                                        {profession.count}
                                    </b>
                                </span>
                            </span>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="grid gap-12 mt-12">
                <div>
                    <h2 className="text-3xl font-bold lg:text-4xl">
                        Подготовьтесь к собеседованию с JobTalks
                    </h2>
                    <Balancer className="mt-3 text-muted-foreground text-default-500">
                        JobTalks — это онлайн-платформа для подготовки к
                        собеседованиям в IT, где вы найдете вопросы для
                        собеседования разных уровней сложности и ответы на
                        вопросы собеседования. Мы предоставляем не только
                        текстовые ответы, но и видеоуроки с тайм-кодами, что
                        позволяет вам готовиться к интервью на практике и без
                        лишних усилий.
                    </Balancer>
                </div>

                <div className="space-y-6 lg:space-y-10">
                    <div className="flex">
                        <HomeIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                        <div className="ms-5 sm:ms-8">
                            <h3 className="text-base sm:text-lg font-semibold">
                                Удобство и доступность
                            </h3>
                            <Balancer className="mt-1 text-muted-foreground text-default-500">
                                Мы сделали процесс подготовки максимально
                                простым и доступным. Все вопросы собеседования и
                                ответы собраны в одном месте, чтобы вы могли
                                сосредоточиться на важном: подготовке к
                                собеседованию. Интуитивно понятный интерфейс и
                                доступность материалов в любое время помогают
                                вам эффективно готовиться без лишних сложностей.
                            </Balancer>
                        </div>
                    </div>

                    <div className="flex">
                        <ListIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                        <div className="ms-5 sm:ms-8">
                            <h3 className="text-base sm:text-lg font-semibold">
                                Разнообразие вопросов по профессиям и уровням
                                сложности
                            </h3>
                            <Balancer className="mt-1 text-muted-foreground text-default-500">
                                На платформе JobTalks есть как базовые вопросы
                                собеседования, так и более сложные, чтобы
                                подготовиться к интервью на разных уровнях. Мы
                                предлагаем вопросы для собеседования для
                                новичков, а также сложные вопросы для
                                собеседования для более опытных специалистов,
                                что позволяет эффективно готовиться к
                                собеседованиям на любую позицию в IT.
                            </Balancer>
                        </div>
                    </div>

                    <div className="flex">
                        <UsersIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                        <div className="ms-5 sm:ms-8">
                            <h3 className="text-base sm:text-lg font-semibold">
                                Развитие навыков и профессионального сообщества
                            </h3>
                            <Balancer className="mt-1 text-muted-foreground text-default-500">
                                JobTalks — это не только инструмент для
                                подготовки к собеседованию, но и пространство
                                для развития вашего профессионального уровня. Мы
                                предоставляем актуальные материалы для
                                подготовки к собеседованию, а также создаем
                                сообщество профессионалов, где каждый может
                                улучшить свои навыки и поделиться опытом.
                            </Balancer>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
