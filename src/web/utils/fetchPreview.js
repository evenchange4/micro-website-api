// @flow
/* global fetch */

/* ::
type FetchPreview = string => Promise<string>
*/

const fetchPreview /* : FetchPreview */ = url =>
  fetch(url, {
    method: 'GET',
  }).then(response => response.text());

export default fetchPreview;
