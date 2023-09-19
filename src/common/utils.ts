import { Page } from "src/types/interfaces";
import { FindManyOptions, Repository } from "typeorm";

export const findPaginated = async <T>(repository: Repository<T>, page: number, rpp: number, options?: FindManyOptions<T>): Promise<Page<T>> => {
    const findAndCountOptions: FindManyOptions = {
        take: rpp,
        skip: (page - 1) * rpp,
        ...options,
    };

    const [list, totalCount] = await repository.findAndCount(findAndCountOptions);

    const result: Page<T> = {
        page,
        rpp,
        list,
        totalCount,
    };

    return result;
}