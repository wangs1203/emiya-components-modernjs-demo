interface IBaseObject<T = any> {
  [key: string]: T;
}

/**
 * 去除Type中的索引签名
 */
declare type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};
