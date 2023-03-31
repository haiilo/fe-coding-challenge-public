import {
	type ComponentFixture,
	TestBed,
	waitForAsync,
} from '@angular/core/testing';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
	let component: ShellComponent;
	let fixture: ComponentFixture<ShellComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [ShellComponent],
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeDefined();
	});
});
