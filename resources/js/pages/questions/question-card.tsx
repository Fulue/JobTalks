import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Balancer from "react-wrap-balancer";
import {
    ArrowRight,
    ThumbsUp,
    ThumbsDown,
    CheckCircle,
    BotMessageSquare,
    Eye,
} from "lucide-react";
import {
    Button,
    Card,
    CardBody,
    Chip,
    Link as LinkButton,
    Skeleton,
    Tooltip,
} from "@nextui-org/react";
import { Tag, Question } from "@/types";
import { cn } from "@/lib/utils";
import QuestionText from "@/components/question-text";
import axios from "axios";

interface QuestionCardProps {
    question: Question;
    selectedTagId: string | null;
    handleTagBadgeClick: (tagId: string) => void;
    handleLinkClick: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedTagId,
    handleTagBadgeClick,
    handleLinkClick,
}) => {
    const [userReaction, setUserReaction] = useState<
        "like" | "dislike" | false
    >(question.user_reaction);

    const handleReaction = async (reaction: "like" | "dislike") => {
        try {
            const response = await axios.post(
                `/question/${question.id}/reaction`,
                {
                    reaction,
                },
            );

            if (response.data.result === true) {
                setUserReaction(reaction);
            }
        } catch (error) {
            console.error("Error updating reaction:", error);
        }
    };

    return (
        <Card>
            <CardBody className="flex justify-between flex-col px-5 pt-6 gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Button
                            onClick={() => handleReaction("like")}
                            className="rounded-full"
                            variant={
                                userReaction === "like" ? "flat" : "bordered"
                            }
                            disabled={userReaction === "like"}
                            isIconOnly
                        >
                            <ThumbsUp
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            onClick={() => handleReaction("dislike")}
                            className="rounded-full"
                            variant={
                                userReaction === "dislike" ? "flat" : "bordered"
                            }
                            disabled={userReaction === "dislike"}
                            isIconOnly
                        >
                            <ThumbsDown
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                    <Chip variant="flat">
                        <span className="text-muted-foreground mr-1">
                            Вероятность:
                        </span>
                        <span>{question.percentage}%</span>
                    </Chip>
                </div>

                <Balancer ratio={0.4}>
                    <QuestionText text={question.question} />
                </Balancer>

                <div className="flex flex-wrap gap-3">
                    {question.tags &&
                        question.tags.map((tag: Tag) => (
                            <Chip
                                startContent={
                                    selectedTagId === tag.id ? (
                                        <CheckCircle
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    ) : null
                                }
                                key={tag.id}
                                className={cn(tag.color, "cursor-pointer")}
                                onClick={() => handleTagBadgeClick(tag.id)}
                                color="default"
                            >
                                {tag.tag}
                            </Chip>
                        ))}
                </div>

                <div className="flex items-center justify-between">
                    <LinkButton
                        onClick={() => {
                            handleLinkClick();
                            question.views++;
                        }}
                        as={Link}
                        href={`/question/${question.id}`}
                        className="group px-0"
                        color="foreground"
                        showAnchorIcon
                        anchorIcon={
                            <ArrowRight
                                size={16}
                                className="ml-1 transition-transform group-hover:translate-x-1"
                            />
                        }
                    >
                        Подробнее
                    </LinkButton>
                    <div className="flex gap-3 items-center text-default-500 text-xs">
                        {question.ease ? (
                            <Tooltip
                                placement="bottom-end"
                                showArrow={true}
                                content="Ответ GPT 4o-mini"
                            >
                                <BotMessageSquare size={16} />
                            </Tooltip>
                        ) : null}
                        <div className="flex gap-1">
                            <Eye size={16} />
                            <span>{question.views}</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export const QuestionCardSkeleton: React.FC = () => {
    return (
        <div className="not-prose grid md:grid-cols-2 gap-4 ">
            {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="h-[224px]">
                    <CardBody className="flex justify-between flex-col px-5 pt-6 gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="flex rounded-full size-10 " />
                                <Skeleton className="flex rounded-full size-10 " />
                            </div>
                            <Skeleton className="h-6 w-40 rounded-full" />
                        </div>

                        <div className="space-y-2.5">
                            <Skeleton className="h-3.5 w-3/5 rounded-lg" />
                            <Skeleton className="h-3.5 w-2/5 rounded-lg" />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-6 w-32 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>

                        <div className="flex items-center justify-between">
                            <LinkButton
                                isDisabled
                                className="group px-0 opacity-50"
                                color="foreground"
                                showAnchorIcon
                                anchorIcon={
                                    <ArrowRight
                                        size={16}
                                        className="ml-1 transition-transform group-hover:translate-x-1"
                                    />
                                }
                            >
                                Подробнее
                            </LinkButton>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
