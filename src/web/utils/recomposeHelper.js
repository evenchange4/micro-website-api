import { from } from 'rxjs/observable/from';
import { componentFromStreamWithConfig } from 'recompose/componentFromStream';
import { createEventHandlerWithConfig } from 'recompose/createEventHandler';

export const config = {
  fromESObservable: from,
  toESObservable: stream => stream,
};

export const componentFromStream = componentFromStreamWithConfig(config);
export const createEventHandler = createEventHandlerWithConfig(config);
