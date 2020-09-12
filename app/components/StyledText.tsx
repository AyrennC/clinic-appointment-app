import * as React from 'react';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

type FontWeight = 'regular'|'medium'|'bold';
interface FontWeightProps {
  fontWeight?: FontWeight;
}

const getFontFamilySuffix = (fontWeight: FontWeight) => {
  switch (fontWeight) {
    case 'bold':
      return '700Bold';
    case 'medium':
      return '500Medium';
    default:
      return '400Regular';
  }
}

export function MontserratText(props : FontWeightProps & TextProps) {
  const { fontWeight = 'regular', ...others } = props;

  const fontFamilySuffix = React.useMemo(() => getFontFamilySuffix(fontWeight), [fontWeight])

  return <Text {...others} style={[props.style, { fontFamily: `Montserrat_${fontFamilySuffix}` }]} />;
}


export function TitleText(props : FontWeightProps & TextProps) {
  const { fontWeight = 'medium', ...others } = props;

  return <MontserratText {...others} fontWeight={fontWeight} style={[props.style, { color: '#F26627' }]} />;
}
