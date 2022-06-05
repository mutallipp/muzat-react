/**
 * 剔除null 的key
 */
 export type FilterNullableKey<T extends Object> = {
  [K in keyof T]: T[K] extends null ? any extends T[K] ? '' : K : ''
}[keyof T]
/**
 * 过滤对象null值
 */
export type FilterNullable<T extends Object> = Omit<T, FilterNullableKey<T>>

/**
 * 元素类型
 */
export type ElementType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'symbol' | 'bigint' | 'function' | 'array' | 'object' | 'map' | 'set'
/**
 * 元素真实类型
 */
export type ActualTypeElementType = ElementType | 'date' | 'regexp' | 'error' | 'math' | 'json'

/**
 * 字符串转类型
 */
export type StringToType<T> = T extends 'string' ? string : (
  T extends 'number' ? number : (
    T extends 'boolean' ? boolean : (
      T extends 'null' ? null : (
        T extends 'undefined' ? undefined : (
          T extends 'symbol' ? symbol : (
            T extends 'bigint' ? bigint : (
              T extends 'function' ? Function : (
                T extends 'array' ? Array<unknown> : (
                  T extends 'object' ? Object : (
                    T extends 'map' ? Map<unknown, unknown> : (
                      T extends 'set' ? Set<unknown> : (
                        T extends 'date' ? Date : (
                          T extends 'regexp' ? RegExp : (
                            T extends 'error' ? Error : (
                              T extends 'math' ? Math : (
                                T extends 'json' ? JSON : never
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
)
