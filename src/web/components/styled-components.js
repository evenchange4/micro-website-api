import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 48px 12px 0 12px;
`;

export const ButtonFooter = styled.footer`
  margin-top: 48px;
  margin-bottom: 24px;
  text-align: center;

  > * + * {
    margin-left: 12px;
  }
`;

export const StyledActionWrapper = styled.div`
  display: flex;

  > * {
    display: flex;
  }

  > *:nth-child(1) {
    flex: 1;

    * + * {
      margin-left: 8px;
    }
  }

  > *:nth-child(2) > button {
    width: 1em;
  }
`;
