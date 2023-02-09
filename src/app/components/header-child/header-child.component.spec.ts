import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderChildComponent } from './header-child.component';

describe('HeaderChildComponent', () => {
	let component: HeaderChildComponent;
	let fixture: ComponentFixture<HeaderChildComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ HeaderChildComponent ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(HeaderChildComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
