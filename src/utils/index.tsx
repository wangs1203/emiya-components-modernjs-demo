import { transform, isEqual, isObject } from 'lodash';

export function difference(object: any, base: any) {
  function changes(_object: object, _base: { [x: string]: any }) {
    return transform(_object, (result: any, value, key) => {
      if (!isEqual(value, _base[key])) {
        result[key] =
          isObject(value) && isObject(_base[key])
            ? changes(value, _base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}
