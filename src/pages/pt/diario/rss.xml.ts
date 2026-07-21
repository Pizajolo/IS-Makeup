import type { APIContext } from 'astro';
import { journalFeed } from '../../../data/feed';
import pt from '../../../i18n/pt';

export const GET = (context: APIContext) => journalFeed('pt', pt, context);
