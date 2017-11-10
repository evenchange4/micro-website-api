import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b4b4b4;
  margin-top: 120px;
  padding: 12px 0;

  a {
    text-decoration: none;
    color: #b4b4b4;
  }

  svg {
    fill: currentColor;
  }

  > div {
    display: flex;
    align-items: flex-end;
  }
`;

const Code = () => (
  <svg width="1em" height="1em" viewBox="0 0 14 16">
    <path
      fillRule="evenodd"
      d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"
    />
  </svg>
);

const Love = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 16">
    <path
      fillRule="evenodd"
      d="M11.2 3c-.52-.63-1.25-.95-2.2-1-.97 0-1.69.42-2.2 1-.51.58-.78.92-.8 1-.02-.08-.28-.42-.8-1-.52-.58-1.17-1-2.2-1-.95.05-1.69.38-2.2 1-.52.61-.78 1.28-.8 2 0 .52.09 1.52.67 2.67C1.25 8.82 3.01 10.61 6 13c2.98-2.39 4.77-4.17 5.34-5.33C11.91 6.51 12 5.5 12 5c-.02-.72-.28-1.39-.8-2.02V3z"
    />
  </svg>
);

const GitHub = () => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

const Footer = () => (
  <Wrapper>
    <div>
      <Code />&nbsp;with&nbsp;
      <Love />&nbsp;by&nbsp;
      <a href="https://twitter.com/evenchange4">@evenchange4</a>.
    </div>
    <div>
      <a href="https://github.com/evenchange4/micro-website-api">
        <GitHub />
      </a>
    </div>
  </Wrapper>
);

export default Footer;
