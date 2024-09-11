import { TriggerEvent, Email } from "./Models";
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
                throw new Error(`Invalid event name: ${event.eventName}`);
        }
    }

    async handleWebsiteSignupEvent(event: TriggerEvent): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Website email sending in ${this.delayInMins} minute(s)`)
            setTimeout(async () => {
            try {
                const welcomeEmail: Email = {
                    subject: "Welcome",
                    body: "Need some socks?",
                }
                await sendEmail(welcomeEmail);
                console.log(`Website signup email successfully sent to ${event.userEmail}`);
                resolve();
            } catch (error) {
                console.error('Failed to send email:', error, event.userEmail);
                reject(false);
            }
            }, minutesToMilliseconds(this.delayInMins));
        });
    }

    async handleSockPurchasedEvent(event: TriggerEvent): Promise<void> {
        try {
            const paymentReceivedEmail: Email = {
                subject: "Payment received",
                body: "Thank you!",
            }
            await sendEmail(paymentReceivedEmail);
            const socksDispatchedEmail: Email = {
                subject: "Socks dispatched!",
                body: "Get ready!",
            }
            await sendEmail(socksDispatchedEmail);
            console.log(`Sock purchase email successfully sent to ${event.userEmail}`);
        } catch (error) {
            console.error('Failed to send email:', error, event.userEmail);
        }
    }
}
