import './App.css';
import { useMoonlight } from './hooks/useMoonlight';

function App() {
    const { moonlight, loading } = useMoonlight();

    const handleConnect = () => {
        if (!moonlight) {
            console.warn('Moonlight aún no está listo');
            return;
        }

        const host = '192.168.1.152';
        const width = 1280;
        const height = 720;
        const bitrate = 8000;

        try {
            // Inicializa parámetros de streaming
            moonlight.initializeStreamConfig?.();

            // Inicia conexión
            const result = moonlight.startConnection(host, width, height, bitrate);
            console.log('Resultado de startConnection:', result);

            // Inicia loop principal en el siguiente ciclo del event loop
            setTimeout(() => {
                moonlight.startMainLoop();
            }, 0);
        } catch (error) {
            console.error('Error al iniciar la conexión o el loop:', error);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Moonlight Web Client (WASM)</h1>

            {loading ? (
                <p>Cargando WebAssembly...</p>
            ) : (
                <>
                    <button onClick={handleConnect}>Iniciar Conexión</button>
                </>
            )}
        </div>
    );
}

export default App;
