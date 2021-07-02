import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

export const SearchHeaderContainer = styled(View)`
  width: ${props => `${props.windowWidth}px`};
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;
