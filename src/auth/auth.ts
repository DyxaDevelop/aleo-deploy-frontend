import { types, Instance } from 'mobx-state-tree';
import React from 'react';

export const AuthStore = types
  .model({
    wallet: types.string,
    isLogged: types.string,
    open: types.boolean,
  })
  .actions((self) => ({
    hide: () => {
      // self.open = false;
      // if (self.title) {
      //   self.title = '';
      // }
    },
  }))
  .actions((self) => ({
    show: (value: string, title?: string) => {
      // self.text = value;
      // if (title) {
      //   self.title = title;
      // }
      // self.open = true;
    },
  }));

export type IAuthStore = Instance<typeof AuthStore>;

export const ErrorModaltContextStore = React.createContext(
  null as unknown as IAuthStore,
);
