import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

const Link = styled.a`
  color: rgba(0, 0, 0, 0.54);
`;

const StyledTypography = styled(Typography)`
  max-height: 300px;
  overflow: auto;
`;

const PreviewCard = ({ url, data }) =>
  url ? (
    <Card>
      <CardContent>
        <Typography type="caption" paragraph align="center">
          <Link href={url} target="_blank" rel="nofollow">
            {url}
          </Link>
        </Typography>
        {data ? (
          <StyledTypography>{data}</StyledTypography>
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
