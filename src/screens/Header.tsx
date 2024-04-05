import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Route } from '@react-navigation/native';

import {RootStackParamList} from '../App'
import { PreferencesContext } from '../PreferencesContext';

type HeaderScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Header'
>;

type Props = {
    navigation: HeaderScreenNavigationProp,
    route: Route<string>,
    options: NativeStackNavigationOptions,
    back: string | undefined;
};

const Header = ({ navigation, route, options, back }: Props) => {
    const title = getHeaderTitle(options, route.name);
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.surface,
                },
            }}
        >
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            <IconButton
                icon={isThemeDark ? 'brightness-4' : 'brightness-5'}
                onPress={toggleTheme}
            />
        </Appbar.Header>
    );
};

export default Header;
