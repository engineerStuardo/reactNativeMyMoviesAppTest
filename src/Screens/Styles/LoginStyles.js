import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../assets/background.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TransparentContainer = styled(View)`
  width: ${props => `${props.windowWidth}px`};
  height: ${props => `${props.windowWidth}px`};
  background-color: rgba(255, 255, 255, 0.35);
`;

export const MainContainer = styled(View)`
  flex: 1;
  margin-top: ${props => `${props.windowHeight / 9}px`};
  padding-top: ${props => `${props.windowHeight / 135}px`};
`;

export const LottieViewContainer = styled(View)`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 6.5%;
  left: 40%;
`;

export const FormContainer = styled(View)`
  flex: 1;
  margin-top: 165px;
  align-self: center;
`;

export const FormInnerContainer = styled(View)`
  width: ${props => `${props.windowWidth / 2.2}px`};
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
`;
