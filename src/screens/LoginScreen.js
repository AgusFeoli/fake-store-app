import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login as loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { ERROR_MESSAGES } from '../utils/errorUtils';
import GoPersonalLogo from '../components/GoPersonalLogo';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorDisplay from '../components/ErrorDisplay';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    
    const { 
        error, 
        isLoading, 
        handleError, 
        clearError, 
        executeWithErrorHandling 
    } = useErrorHandler(ERROR_MESSAGES.LOGIN);

    // Memoize dimension calculations
    const dimensions = useMemo(() => ({
        logoSize: Math.max(60, width * 0.15),
        titleFontSize: Math.max(18, width * 0.05),
        subtitleFontSize: Math.max(14, width * 0.035),
        paddingHorizontal: width * 0.05,
        logoMarginBottom: height * 0.03,
        titleMarginBottom: height * 0.01,
        subtitleMarginBottom: height * 0.04,
        formGap: height * 0.01,
        buttonMarginBottom: height * 0.02,
    }), [width, height]);

    const handleLogin = async () => {
        if (!username || !password) {
            handleError(new Error('Please enter username and password.'), 'Form validation');
            return;
        }
        
        clearError();
        
        try {
            const data = await executeWithErrorHandling(
                () => loginUser(username, password),
                'Login'
            );
            await login(data.token); // Context handles state and navigation
        } catch (error) {
            // Error already handled by executeWithErrorHandling
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.content, { paddingHorizontal: dimensions.paddingHorizontal }]}>                
                <View style={[styles.logoContainer, { marginBottom: dimensions.logoMarginBottom }]}>                    
                    <GoPersonalLogo size={dimensions.logoSize} color="#000000" />                
                </View>
                <Text style={[styles.title, { 
                    fontSize: dimensions.titleFontSize, 
                    marginBottom: dimensions.titleMarginBottom 
                }]}>Log In Now</Text>
                <Text style={[styles.subtitle, { 
                    fontSize: dimensions.subtitleFontSize, 
                    marginBottom: dimensions.subtitleMarginBottom 
                }]}>Please login to continue using our app</Text>
                
                <ErrorDisplay 
                    error={error}
                    onRetry={handleLogin}
                    showRetry={true}
                    style={{ marginHorizontal: 0, marginVertical: 8 }}
                />
                
                <View style={[styles.formContainer, { gap: dimensions.formGap }]}>
                    <CustomInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={[styles.loginButton, { marginBottom: dimensions.buttonMarginBottom }]}>
                    <CustomButton
                        title="Login"
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
    },
    subtitle: {
        color: "#6B7280",
        textAlign: "center",
    },
    formContainer: {},
    loginButton: {},
});