const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to wait until Redux state is ready
export default async function waitForReduxValue (selector, checkCondition, timeout = 5000, interval = 100) {
    const startTime = Date.now();

    while (true) {
        const value = selector();
        if (checkCondition(value)) {
            return value;
        }
        if (Date.now() - startTime >= timeout) {
            throw new Error("Timeout while waiting for Redux value.");
        }
        await delay(interval);
    }
};
