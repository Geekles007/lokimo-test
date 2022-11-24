
export type TResponse<T> = {
    isLoading: boolean;
    error?: Error;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
    setAdverts: React.Dispatch<React.SetStateAction<T[]>>
    adverts: T[],
    all: T[],
    setSelected: (item?: Partial<T>) => void,
    selected: Partial<T | undefined>,
}
