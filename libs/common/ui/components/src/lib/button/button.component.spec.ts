import {
	type ComponentFixture,
	TestBed,
	waitForAsync,
} from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [ButtonComponent],
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeDefined();
	});
});
