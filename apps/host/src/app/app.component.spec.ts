import {
	type ComponentFixture,
	TestBed,
	waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [AppComponent],
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeDefined();
	});
});
