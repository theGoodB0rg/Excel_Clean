import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../stores/data-store';
import { parseFile } from '../lib/file-parser';

export const useFileHandler = () => {
    const navigate = useNavigate();
    const { setFile, setProcessing, setError } = useDataStore();

    const handleFileSelected = useCallback(async (file: File) => {
        setProcessing(true, 10);
        setError(null);

        try {
            setProcessing(true, 30);
            const result = await parseFile(file);
            setProcessing(true, 80);

            setTimeout(() => {
                setFile(file.name, result);
                navigate('/tool');
            }, 200);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse file');
            setProcessing(false, 0); // Ensure processing stops on error
        }
    }, [setFile, setProcessing, setError, navigate]);

    return { handleFileSelected };
};
