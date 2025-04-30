import { NotFoundException } from '@nestjs/common';

export function ensureExists<T>(
  data: T | null | undefined,
  message: string,
): T {
  if (!data) {
    throw new NotFoundException(message);
  }
  return data;
}
