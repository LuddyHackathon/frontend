import React from 'react';

type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>];

const AccessTokenProvider: React.FC = (props) => {
    const [accessToken, setAccessToken] = React.useState<string>('')
    return <AccessToken.Provider value={[accessToken, setAccessToken]} {...props} />
}

const AccessToken = React.createContext<AccessTokenContext>(['', () => { }]);

const useAccessToken = (): AccessTokenContext => React.useContext<AccessTokenContext>(AccessToken);

export { AccessTokenProvider, useAccessToken };
