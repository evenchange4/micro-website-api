/* eslint no-unused-expressions:0 */

import { injectGlobal } from 'styled-components';
import normalize from 'polished/lib/mixins/normalize';

injectGlobal`
  ${normalize()}

  html {
    font-size: 14px;
  }
`;
