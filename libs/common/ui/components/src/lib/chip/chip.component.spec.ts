import {
	type ComponentFixture,
	TestBed,
	waitForAsync,
} from '@angular/core/testing';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
	let component: ChipComponent;
	let fixture: ComponentFixture<ChipComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [ChipComponent],
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeDefined();
	});
});
