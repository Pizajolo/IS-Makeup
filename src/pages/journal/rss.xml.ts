import type { APIContext } from 'astro';
import { journalFeed } from '../../data/feed';
import en from '../../i18n/en';

export const GET = (context: APIContext) => journalFeed('en', en, context);
