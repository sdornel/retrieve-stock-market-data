import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockMarketApiService } from './stock-market-api.service';
import { WebSocketService } from './websocket-helper.service';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('WebSocketService', () => {
    let service: WebSocketService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [WebSocketService]
        });
        service = TestBed.inject(WebSocketService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Ensure that there are no outstanding requests after each test
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('trackTimeToNonpingResponse()', () => {
        let testScheduler: TestScheduler;
    
        beforeEach(() => {
            // Initialize the TestScheduler with a custom assertion logic
            testScheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });
            // Reset firstCallTime to null before each test
            service.firstCallTime = null;
        });
    
        it('when firstCallTime is null, returns observable boolean value of false', () => {
            testScheduler.run(({ expectObservable }) => {
                const result = service.trackTimeToNonpingResponse();
                const expectedMarble = '(a|)';
                const expectedValues = { a: false };
    
                expectObservable(result).toBe(expectedMarble, expectedValues);
            });
        });
    
        it('when time elapsed since first call is greater than 4 seconds, returns observable of true', () => {
            testScheduler.run(({ expectObservable }) => {
                // Assuming service.firstCallTime can be manually set for the test,
                // and using the TestScheduler's frame-based timing for simulation.
    
                // Set firstCallTime 5 seconds before now in TestScheduler time.
                // This simulates that the first call happened 5 seconds ago.
                service.firstCallTime = Date.now() - 5000;
    
                const result = service.trackTimeToNonpingResponse();
                const expectedMarble = '(a|)';
                const expectedValues = { a: true };
    
                expectObservable(result).toBe(expectedMarble, expectedValues);
            });
        });

        it('when time elapsed since first call is less than 4 seconds, returns observable of false', () => {
            testScheduler.run(({ expectObservable }) => {
                service.firstCallTime = Date.now() - 300;
    
                const result = service.trackTimeToNonpingResponse();
                const expectedMarble = '(a|)';
                const expectedValues = { a: false };
    
                expectObservable(result).toBe(expectedMarble, expectedValues);
            });
        });
    });
});