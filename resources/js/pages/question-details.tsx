import RootLayout from "@/Layouts/layout";
import { Container, Section } from "@/components/craft";
import { Question, Timestamp, Answer } from "@/types";
import { Deferred, Head } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Chip,
    Divider,
    Skeleton,
    Spinner,
} from "@nextui-org/react";
import { ArrowLeft, Video } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import React, { lazy } from "react";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { PrismLight as Prism } from "react-syntax-highlighter";

export default function QuestionDetails({
    question,
    timestamps,
}: {
    question: Question;
    timestamps: Timestamp[];
}) {
    return (
        <RootLayout>
            <Head>
                <title>{question.question}</title>
                <meta
                    name="description"
                    content={`Ответ с видео примерами на вопрос - ${question.question}`}
                />
                <meta property="og:title" content={question.question} />
                <meta
                    property="og:description"
                    content={`Ответ с видео примерами на вопрос - ${question.question}`}
                />
            </Head>
            <Section>
                <Container>
                    <Content question={question} timestamps={timestamps} />
                </Container>
            </Section>
        </RootLayout>
    );
}

const Content = ({
    question,
    timestamps,
}: {
    question: Question;
    timestamps: Timestamp[];
}) => {
    return (
        <article className="prose-m-none space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
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
                    <Chip color="default" variant="flat">
                        {question.profession}
                    </Chip>
                </div>
                <h3 className="scroll-m-20 text-xl font-extrabold lg:text-3xl">
                    {question.question}
                </h3>
                <p className="text-answer" />
                <p className="text-sm text-default-500">
                    Общий ответ на вопрос и видео примеры
                </p>
            </div>

            <Divider className="my-4" />

            {question.answers && question.answers.length > 0 ? (
                <div className="space-y-4">
                    {question.answers.map((answer: Answer) => (
                        <Markdown
                            className="text-answer"
                            key={answer.id}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code(props) {
                                    const {
                                        children,
                                        className,
                                        node,
                                        ...rest
                                    } = props;
                                    const match = /language-(\w+)/.exec(
                                        className || "",
                                    );
                                    return match ? (
                                        <Prism
                                            className="!rounded-xl !shadow-small"
                                            {...rest}
                                            PreTag="div"
                                            children={String(children).replace(
                                                /\n$/,
                                                "",
                                            )}
                                            language={match[1]}
                                            style={oneDark}
                                            ref={null}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {answer.answer}
                        </Markdown>
                    ))}
                </div>
            ) : (
                <p className="text-default-500">Общего ответа не найдено</p>
            )}

            <Divider className="my-4" />

            <h2 className="text-lg font-bold lg:text-2xl">Видео с вопросами</h2>

            <Deferred
                data="timestamps"
                fallback={
                    <div className="not-prose grid md:grid-cols-2 gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Card className="h-[188px]" shadow="sm" key={index}>
                                <CardBody className="overflow-visible p-2">
                                    <div className="bg-content2 w-full h-32 rounded-large flex justify-center items-center">
                                        <Spinner color="default" size="lg" />
                                    </div>
                                </CardBody>
                                <CardFooter className="justify-between">
                                    <Skeleton className="h-4 w-3/5 rounded-lg" />
                                    <Skeleton className="h-4 w-16 rounded-lg" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                }
            >
                <>
                    {timestamps && timestamps.length > 0 ? (
                        <div className="not-prose grid md:grid-cols-2 gap-4">
                            {timestamps.map((timestamp: Timestamp) => (
                                <Card
                                    shadow="sm"
                                    key={timestamp.id}
                                    isPressable
                                    onPress={() =>
                                        window.open(
                                            timestamp.url +
                                                "&t=" +
                                                timestamp.start_time_seconds,
                                            "_blank",
                                        )
                                    }
                                >
                                    <CardBody className="overflow-visible p-2">
                                        <div className="bg-content2 w-full h-32 rounded-large flex justify-center items-center">
                                            <Video size={64} />
                                        </div>
                                    </CardBody>
                                    <CardFooter className="text-small gap-4 justify-between">
                                        <b className="truncate">
                                            {timestamp.video_name}
                                        </b>
                                        <p className="text-default-500">
                                            {timestamp.start_time}
                                        </p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div>Таймкоды не найдены</div>
                    )}
                </>
            </Deferred>
        </article>
    );
};
