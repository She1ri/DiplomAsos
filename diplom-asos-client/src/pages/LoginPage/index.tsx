import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authService } from "../../services/authService";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const loginByGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse: { access_token: string }) => {
            const { access_token } = tokenResponse;
            setIsLoading(true);
            setError(null);
            setSuccess(false);

            try {
                const jwtToken = await authService.loginWithGoogle(access_token);
                authService.saveToken(jwtToken);
                setSuccess(true);
                console.log("Успішний вхід! JWT токен збережено.");
                // Тут можна додати редирект на головну сторінку або dashboard
                // navigate('/dashboard');
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Помилка входу через Google";
                setError(errorMessage);
                console.error("Помилка входу:", err);
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            setError("Помилка авторизації через Google");
            setIsLoading(false);
        }
    });

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto', 
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px'
        }}>
            <h1>Вхід на сайт</h1>
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    marginBottom: '15px',
                    padding: '10px',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{ 
                    color: 'green', 
                    marginBottom: '15px',
                    padding: '10px',
                    backgroundColor: '#e6ffe6',
                    borderRadius: '4px'
                }}>
                    Успішно ввійшли!
                </div>
            )}

            <button 
                onClick={() => { loginByGoogle(); }}
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    backgroundColor: isLoading ? '#ccc' : '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? 'Завантаження...' : 'Вхід через Google'}
            </button>
        </div>
    );
}

export default LoginPage;