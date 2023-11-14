import { createContext, useState } from 'react';

export const userContext = createContext(null);

export default ({ children }) => {
  const [openuserModal, setOpenUserModal] = useState(false);
  const [starter, setStarter] = useState({
    columns: {},
    columnOrder: [],
    jobs: {}
  });

  const store = {
    openuserModal,
    setOpenUserModal,
    starter,
    setStarter
  };

  return <userContext.Provider value={store}>{children}</userContext.Provider>;
};
