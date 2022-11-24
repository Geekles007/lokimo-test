import {IAdvertisement} from "./IAdvertisement";

export type TResponse<T> = {
    isLoading: boolean;
    error: Error;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
    paginate: T,
    setSelected: (item?: Partial<IAdvertisement>) => void,
    selected: Partial<IAdvertisement | undefined>,
    setRadius: React.Dispatch<React.SetStateAction<number | undefined>>;
    radius: number | undefined;
}
