// Web Worker for file processing (off main thread)
// This keeps the UI responsive during heavy parsing

self.onmessage = (event: MessageEvent) => {
    const { type, payload } = event.data;

    switch (type) {
        case 'PARSE_CSV':
            // Will be implemented in Phase 2
            self.postMessage({ type: 'PARSE_COMPLETE', payload: [] });
            break;
        case 'PARSE_XLSX':
            // Will be implemented in Phase 2
            self.postMessage({ type: 'PARSE_COMPLETE', payload: [] });
            break;
        case 'CLEAN_DATA':
            // Will be implemented in Phase 3
            self.postMessage({ type: 'CLEAN_COMPLETE', payload: payload });
            break;
        default:
            console.warn('Unknown message type:', type);
    }
};

export { };
