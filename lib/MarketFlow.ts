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
            return await this.handleWebsiteSignupEvent(event);
        } else if (event.eventName === 'sockPurchased') {
            return await this.handleSockPurchasedEvent(event);
        }
        console.error("Invalid event name", event.eventName);
    }

    private async handleWebsiteSignupEvent(event: TriggerEvent): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Website email sending in ${this.delayInMins} minute(s)`)
            setTimeout(async () => {
            try {
                const emailSentSuccessfully = await sendEmail();
                console.log(emailSentSuccessfully, `Website signup email successfully sent to ${event.userEmail}`);
                resolve(emailSentSuccessfully);
            } catch (error) {
                console.error('Failed to send email:', error, event.userEmail);
                reject(false);
            }
            }, this.delayInMs);
        });
    }

    private async handleSockPurchasedEvent(event: TriggerEvent): Promise<void> {
        try {
            const result = await sendEmail();
            console.log(`Sock purchase email successfully sent to ${event.userEmail}`);
        } catch (error) {
            console.error('Failed to send email:', error, event.userEmail);
        }
    }
}
