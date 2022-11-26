
export type TResponse<T> = {
    isLoading: boolean;
    error?: Error;
    setAdverts: (value: T[]) => void;
    adverts: T[],
    all: T[],
    setSelected: (item?: T) => void,
    selected: T | undefined,
}
