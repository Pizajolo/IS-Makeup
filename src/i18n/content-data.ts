// The CMS-editable sections, loaded from the JSON files Sveltia writes. The
// explicit types aren't cosmetic: assigning the raw import to them makes
// `astro check` fail the build if the CMS ever writes a shape the site can't
// render — a bad save can't reach production silently.

import faqJson from '../data/faq.json';
import servicesJson from '../data/services.json';
import type { LocalizedFaq, LocalizedServices } from './sections';

export const faq: LocalizedFaq = faqJson;
export const services: LocalizedServices = servicesJson;
