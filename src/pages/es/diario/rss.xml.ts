import type { APIContext } from 'astro';
import { journalFeed } from '../../../data/feed';
import es from '../../../i18n/es';

export const GET = (context: APIContext) => journalFeed('es', es, context);
