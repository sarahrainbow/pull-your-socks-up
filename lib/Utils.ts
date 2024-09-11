// a home for common, reusable tasks

export const sendEmail = async (): Promise<void> => {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Simulating an asynchronous operation, e.g., sending an email
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 95% chance to return true, 5% chance to throw error - emails fail
    if (randomNumber > 0.95) {
        throw new Error("Email failed to send");
    }
}

export const minutesToMilliseconds = (minutes: number) => {
    return minutes * 60 * 1000;
}