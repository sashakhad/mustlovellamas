import { format, parse } from 'date-fns';

export function normalizeDateString(date: string): string {
  if (date.includes('.')) {
    return date.replace(/\./g, '-');
  }
  return date;
}

export function parsePostDate(date: string): Date {
  return parse(normalizeDateString(date), 'yyyy-MM-dd', new Date());
}

export function formatPostDate(date: string): string {
  return format(parsePostDate(date), 'MMM d, yyyy');
}

export function formatPostMonth(date: string): string {
  return format(parsePostDate(date), 'MMMM');
}

export function formatPostYear(date: string): string {
  return format(parsePostDate(date), 'yyyy');
}

export function formatPostStamp(date: string): string {
  return format(parsePostDate(date), 'yyyy.MM.dd');
}
