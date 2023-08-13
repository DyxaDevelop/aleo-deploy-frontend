import { UserLangContext } from 'App';
import { LoaderContainer } from 'Routes';
import { Loader } from 'components/Loader/Loader';
import { DefaultLayout } from 'layouts/DefaultLayout';
import React, { useContext, useEffect, useState } from 'react';

//@ts-ignore
export const LanguageHOC = (OriginalComponent, page) => {
  console.log(page);
  //@ts-ignore
  function NewComponent(props) {
    // @ts-ignore
    const { lang } = useContext(UserLangContext);
    console.log(lang);

    const [importedData, setImportedData] = useState(null);

    useEffect(() => {
      const importData = async () => {
        try {
          const module = await import(`../lang/${lang}/${page}.json`);
          //@ts-ignore
          setImportedData(module.default);
          console.log(module.default);
        } catch (error) {
          console.error('Error importing JSON data:', error);
        }
      };

      importData();
    }, [lang]);

    if (importedData === null) {
      return (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      );
    }

    return <OriginalComponent lang={importedData} />;
  }

  return React.memo(NewComponent);
};
