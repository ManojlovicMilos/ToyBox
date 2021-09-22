export { Superset }

type Superset<T> = {
    [P in keyof T]: T[P] | undefined;
};
