import {expect, jest, describe, beforeEach, afterEach, it} from '@jest/globals';
import { TriggerEvent } from '../lib/Models';
import { Flow } from '../lib/Flow';

describe('Flow.triggerFlow', () => {
    const flow = new Flow();

    beforeEach(() => {
      // Mock the dependent methods
        jest.spyOn(flow, 'handleWebsiteSignupEvent').mockResolvedValue();
        jest.spyOn(flow, 'handleSockPurchasedEvent').mockResolvedValue();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('Website signup event is called when eventName is "websiteSignup"', async () => {
        const flow = new Flow(0);
        jest.spyOn(flow, 'handleWebsiteSignupEvent').mockResolvedValue();
        jest.spyOn(flow, 'handleSockPurchasedEvent').mockResolvedValue();
        const mockEvent: TriggerEvent = {
            eventName: 'websiteSignup',
            userEmail: 'joe@bloggs.com'
        };
        await flow.triggerFlow(mockEvent);
        expect(flow.handleWebsiteSignupEvent).toHaveBeenCalledTimes(1);
        expect(flow.handleWebsiteSignupEvent).toHaveBeenCalledWith(mockEvent);
        expect(flow.handleSockPurchasedEvent).not.toHaveBeenCalled();

    });

    it('Sock purchased event is called when eventName is "sockPurchased"', async () => {
        const flow = new Flow(0);
        jest.spyOn(flow, 'handleWebsiteSignupEvent').mockResolvedValue();
        jest.spyOn(flow, 'handleSockPurchasedEvent').mockResolvedValue();
        const mockEvent: TriggerEvent = {
            eventName: 'sockPurchased',
            userEmail: 'joe@bloggs.com'
        };
        await flow.triggerFlow(mockEvent);
        expect(flow.handleSockPurchasedEvent).toHaveBeenCalledTimes(1);
        expect(flow.handleSockPurchasedEvent).toHaveBeenCalledWith(mockEvent);
        expect(flow.handleWebsiteSignupEvent).not.toHaveBeenCalled();
    });
    // test for email failing to send
    // test for invalid event name
});
