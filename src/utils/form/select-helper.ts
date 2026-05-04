import { IOption } from "@/src/types/form-t"

export const toSelArr = <T extends { id: number | string }>(
    arr: T[],
    titleKey: keyof T
): IOption[] =>
    arr.map((item) => ({
        id: String(item.id),
        title: item[titleKey] as string,
    }))
