import { paymentReceivedEmail, socksDispatchedEmail, welcomeEmail } from "./emailTemplates";
import { TriggerEvent } from "./Models";
import { minutesToMilliseconds, sendEmail } from "./Utils";

export class Flow {
    private delayInMins: number;
    private static readonly DEFAULT_DELAY_IN_MINS = 120;

    constructor(delayInMins: number = Flow.DEFAULT_DELAY_IN_MINS) {
        this.delayInMins = delayInMins;
    }

    // Method to trigger the flow based on the event type
    async triggerFlow(event: TriggerEvent): Promise<void> {
        switch (event.eventName) {
            case 'websiteSignup':
                await this.handleWebsiteSignupEvent(event);
                break;
            case 'sockPurchased':
                await this.handleSockPurchasedEvent(event);
                break;
            default:
                console.error(`Invalid event name: ${event.eventName}`);
                throw new Error(`Invalid event name: ${event.eventName}`);
        }
    }

    async handleWebsiteSignupEvent(event: TriggerEvent): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Website email sending in ${this.delayInMins} minute(s)`)
            setTimeout(async () => {
                try {
                    await sendEmail(welcomeEmail);
                    console.log(`Website signup email successfully sent to ${event.userEmail}`);
                    resolve();
                } catch (error) {
                    console.error(error, event.userEmail);
                    reject(false);
                    throw error;
                }
            }, minutesToMilliseconds(this.delayInMins));
        });
    }

    async handleSockPurchasedEvent(event: TriggerEvent): Promise<void> {
        try {
            await sendEmail(paymentReceivedEmail);
            await sendEmail(socksDispatchedEmail);
            console.log(`Sock purchase email successfully sent to ${event.userEmail}`);
        } catch (error) {
            console.error(`Failed to send email to: ${event.userEmail}`, error);
            throw error;
        }
    }
}
