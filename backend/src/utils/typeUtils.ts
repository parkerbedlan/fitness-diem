export type Impossible<K extends keyof any> = {
  [P in K]: never;
};

export type NoExtraProperties<T, U extends T = T> = U &
  Impossible<Exclude<keyof U, keyof T>>;

export type Replacement<M extends [any, any], T> = M extends any
  ? [T] extends [M[0]]
    ? M[1]
    : never
  : never;

export type DeepReplace<T, M extends [any, any]> = {
  [P in keyof T]: T[P] extends M[0]
    ? Replacement<M, T[P]>
    : T[P] extends object
    ? DeepReplace<T[P], M>
    : T[P];
};

export type OptionalAndAny<T> = DeepReplace<
  Partial<NoExtraProperties<T>>,
  [any, any]
>;
