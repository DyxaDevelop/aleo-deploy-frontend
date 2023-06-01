import React from 'react';

interface ShowProps {
  visible: boolean;
  children: React.ReactNode;
}

export const Show = (props: ShowProps) => {
  const { visible, children } = props;
  if (visible && children) {
    return <>{children}</>;
  }
  return null;
};
