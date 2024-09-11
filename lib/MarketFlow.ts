import { TriggerEvent } from "./Models";
import { minutesToMilliseconds, sendEmail } from "./Utils";

export class Flow {
    private delayInMs: number;
    private delayInMins: number;

    constructor(delayInMins: number = 120) {
        this.delayInMs = minutesToMilliseconds(delayInMins);
        this.delayInMins = delayInMins;
    }

    // Method to trigger the flow based on the event type
    public async triggerFlow(event: TriggerEvent): Promise<void> {
        if (event.eventName === 'websiteSignup') {
            await this.handleWebsiteSignupEvent(event);
        } else if (event.eventName === 'sockPurchased') {
            await this.handleSockPurchasedEvent(event);
        } else {
            throw new Error(`Invalid event name: ${event.eventName}`)
        }
    }

    async handleWebsiteSignupEvent(event: TriggerEvent): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Website email sending in ${this.delayInMins} minute(s)`)
            setTimeout(async () => {
            try {
                await sendEmail();
                console.log(`Website signup email successfully sent to ${event.userEmail}`);
                resolve();
            } catch (error) {
                console.error('Failed to send email:', error, event.userEmail);
                reject(false);
            }
            }, this.delayInMs);
        });
    }

    async handleSockPurchasedEvent(event: TriggerEvent): Promise<void> {
        try {
            await sendEmail();
            console.log(`Sock purchase email successfully sent to ${event.userEmail}`);
        } catch (error) {
            console.error('Failed to send email:', error, event.userEmail);
        }
    }
}
