import './App.css';
import { useMoonlight } from './hooks/useMoonlight';

function App() {
    const { moonlight, loading } = useMoonlight();

    const handleConnect = () => {
        if (!moonlight) {
            console.warn('Moonlight aún no está listo');
            return;
        }

        // Puedes cambiar estos valores de prueba:
        const host = '192.168.0.100';
        const width = 1280;
        const height = 720;
        const bitrate = 8000;

        const result = moonlight.startConnection(host, width, height, bitrate);
        console.log('Resultado de startConnection:', result);
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
