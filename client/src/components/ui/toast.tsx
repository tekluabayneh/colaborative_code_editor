
const toast = {
    success: (message: string) => {
        console.log(`Success: ${message}`);
    },
    error: (message: string) => {
        console.error(`Error: ${message}`);
    },
    info: (message: string) => {
        console.info(`Info: ${message}`);
    },
    warning: (message: string) => {
        console.warn(`Warning: ${message}`);
    }
    };
export default toast;

