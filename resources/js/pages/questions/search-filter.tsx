import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
    DropdownSection,
} from "@nextui-org/react";
import { ListFilter, Search, X } from "lucide-react";
import type { Selection } from "@nextui-org/react";
import { Tag } from "@/types";

interface SearchFilterProps {
    searchQuery: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedKeys: Selection;
    setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;
    tags: Tag[] | null | undefined;
    handleTagChange: (tagId: string) => void;
    handleClearTag: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchQuery,
    handleSearchChange,
    selectedKeys,
    setSelectedKeys,
    tags,
    handleTagChange,
    handleClearTag,
}) => {
    return (
        <div className="flex w-full items-center space-x-4">
            <search className="w-full" role="search">
                <Input
                    size="lg"
                    defaultValue={searchQuery}
                    onChange={handleSearchChange}
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Введите фразу для поиска"
                    startContent={
                        <Search
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                            className="text-default-400 pointer-events-none flex-shrink-0"
                        />
                    }
                />
            </search>

            <Dropdown>
                <DropdownTrigger>
                    <Button size="lg" variant="bordered" className="capitalize">
                        <div className="flex items-center gap-2">
                            <ListFilter
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                                className="text-default-400"
                            />
                            Фильтр
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(key) => {
                        setSelectedKeys(key);
                        const selectedTagId = Array.from(key)[0].toString();
                        if (selectedTagId) {
                            handleTagChange(selectedTagId);
                        }
                    }}
                >
                    <DropdownSection
                        className="max-h-96 overflow-y-auto"
                        title="Тема вопроса"
                    >
                        {tags && typeof tags === "object" ? (
                            Object.values(tags).length > 0 ? (
                                Object.values(tags).map((tag: Tag) => (
                                    <DropdownItem key={tag.id}>
                                        {tag.tag}
                                    </DropdownItem>
                                ))
                            ) : (
                                <DropdownItem
                                    textValue="Нет доступных тегов"
                                    hideSelectedIcon
                                >
                                    <span>Нет доступных тегов</span>
                                </DropdownItem>
                            )
                        ) : (
                            <DropdownItem
                                textValue="Нет доступных тегов"
                                hideSelectedIcon
                            >
                                <span>Нет доступных тегов</span>
                            </DropdownItem>
                        )}
                    </DropdownSection>
                    <DropdownItem
                        hideSelectedIcon
                        className="flex items-center text-danger"
                        color="danger"
                        onClick={handleClearTag}
                        textValue="Сбросить фильтр"
                    >
                        <div className="flex items-center gap-1">
                            <X size={16} strokeWidth={2} aria-hidden="true" />
                            Сбросить фильтр
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default SearchFilter;
