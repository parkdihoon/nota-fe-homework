export function renameFields<T>(obj: any, mappings: { [key: string]: string }): T {
  if (Array.isArray(obj)) {
    // 배열인 경우, 각 요소에 대해 재귀적으로 처리
    return obj.map(item => renameFields(item, mappings)) as unknown as T;
  } else if (typeof obj === 'object' && obj !== null) {
    // 객체인 경우, 필드명을 변경
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = mappings[key] || key; // 매핑 규칙에 따라 필드명 변경
      const value = obj[key];

      // 재귀적으로 내부 객체나 배열 처리
      acc[newKey] = renameFields(value, mappings);
      return acc;
    }, {} as T);
  }
  return obj; // 기본형 값(primitive value)은 그대로 반환
}
