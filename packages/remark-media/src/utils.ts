export function randomString(length: number, chars: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function unique<T>(arr: T[]): T[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

export function parseAttributes(str: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)(?:[:=]([^\s]+))?/g;
  let match: RegExpExecArray | null = regex.exec(str);

  while (match !== null) {
    const key = match[1];
    const value = match[2] || 'true';
    if (key) {
      attrs[key] = value;
    }
    match = regex.exec(str);
  }

  return attrs;
}

export function stringifyAttributes(attrs: Record<string, unknown>): string {
  return Object.entries(attrs)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      if (value === true || value === 'true') {
        return key;
      }
      if (typeof value === 'boolean' || typeof value === 'number' || !Number.isNaN(Number(value))) {
        return `${key}=${value}`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
