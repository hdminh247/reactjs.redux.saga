/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: '© 2019 Thai Mobility. All copy rights.',
  },

  terms: {
    id: `${scope}.terms`,
    defaultMessage: 'Terms and condition',
  },
  privacy: {
    id: `${scope}.privacy`,
    defaultMessage: 'Privacy policy',
  },
  legal: {
    id: `${scope}.legal`,
    defaultMessage: 'Legal notice',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made with love by {author}.
    `,
  },
});
