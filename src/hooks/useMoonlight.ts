import { useEffect, useState } from 'react';

export type MoonlightModule = {
    initializeStreamConfig: () => void;
    startConnection: (host: string, width: number, height: number, bitrate: number) => number;
    startMainLoop: () => void; // 👈 añadido
};

interface MoonlightWindow extends Window {
    createMoonlightModule: (options?: {
        locateFile?: (path: string) => string;
    }) => Promise<MoonlightModule>;
}

export const useMoonlight = () => {
    const [moonlight, setMoonlight] = useState<MoonlightModule | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWasm = async () => {
            const script = document.createElement('script');
            script.src = '/wasm/moonlight.js';
            script.async = true;

            script.onload = async () => {
                const createMoonlightModule = (window as unknown as MoonlightWindow).createMoonlightModule;

                if (typeof createMoonlightModule === 'function') {
                    const module = await createMoonlightModule({
                        locateFile: (path) => `/wasm/${path}`
                    });
                    setMoonlight(module);
                } else {
                    console.error('createMoonlightModule no está disponible en window');
                }

                setLoading(false);
            };

            script.onerror = (err) => {
                console.error('Error cargando moonlight.js', err);
                setLoading(false);
            };

            document.body.appendChild(script);
        };

        loadWasm();
    }, []);

    return { moonlight, loading };
};
