import {
	type ComponentFixture,
	TestBed,
	waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

	describe('elements', () => {
		describe('spinner', () => {
			test('should not be present by default', () => {
				expect(
					fixture.debugElement.query(By.css('[data-qa="buttonLoading"]'))
				).toBe(null);
			});

			test('should be present if is loading', () => {
				component.isLoading = true;
				fixture.detectChanges();
				expect(
					fixture.debugElement.query(By.css('[data-qa="buttonLoading"]'))
				).toBeDefined();
			});
		});
	});

	describe('attributes', () => {
		describe('disabled', () => {
			test('should not be preset by default', () => {
				expect(fixture.debugElement.attributes.disabled).toBe(undefined);
			});

			test('should be preset if disabled', () => {
				component.disabled = true;
				fixture.detectChanges();
				expect(fixture.debugElement.attributes.disabled).toBe('true');
			});

			test('should be preset if isLoading', () => {
				component.isLoading = true;
				fixture.detectChanges();
				expect(fixture.debugElement.attributes.disabled).toBe('true');
			});
		});
	});

	describe('classes', () => {
		test('should have default classes', () => {
			expect(fixture.debugElement.classes.button).toBe(true);
			expect(fixture.debugElement.classes['button--disabled']).toBe(undefined);
		});

		test('should have button--disabled if is disabled', () => {
			component.disabled = true;
			fixture.detectChanges();
			expect(fixture.debugElement.classes.button).toBe(true);
			expect(fixture.debugElement.classes['button--disabled']).toBe(true);
		});

		test('should have button--disabled if is disabled', () => {
			component.isLoading = true;
			fixture.detectChanges();
			expect(fixture.debugElement.classes.button).toBe(true);
			expect(fixture.debugElement.classes['button--disabled']).toBe(true);
		});
	});
});
