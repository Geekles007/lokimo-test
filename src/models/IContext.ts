
export type IContext<T> = [
    Partial<T> | undefined,
    React.Dispatch<React.SetStateAction<Partial<T>>>
]
