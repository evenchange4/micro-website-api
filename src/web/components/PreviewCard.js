import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

const Link = styled.a`
  word-wrap: break-word;
  color: rgba(0, 0, 0, 0.54);
`;

const LinkWrapper = styled(Typography)`
  max-height: 2.5em;
  overflow: hidden;
`;

const PreviewWrapper = styled(Typography)`
  max-height: 300px;
  overflow: auto;
`;

const PreviewCard = ({ url, data }) =>
  url ? (
    <Card>
      <CardContent>
        <LinkWrapper type="caption" paragraph align="center">
          <Link href={url} target="_blank" rel="nofollow">
            {url}
          </Link>
        </LinkWrapper>
        {data ? (
          <PreviewWrapper>{data}</PreviewWrapper>
        ) : (
          <Typography component="div" align="center">
            <CircularProgress size={24} />
          </Typography>
        )}
      </CardContent>
    </Card>
  ) : null;

PreviewCard.displayName = 'PreviewCard';
PreviewCard.propTypes = {
  url: PropTypes.string,
  data: PropTypes.string,
};

export default PreviewCard;
