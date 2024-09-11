export interface TriggerEvent {
    eventName: "websiteSignup" | "sockPurchased",
    userEmail: string,
}

export interface Email {
    subject: string,
    body: string,
}