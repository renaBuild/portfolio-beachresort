import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './app.html',
})
export class App {
  private fb = inject(FormBuilder);

  today = new Date().toISOString().split('T')[0];

  bookingForm = this.fb.group({
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    guests: ['2', Validators.required],
    roomType: ['standard', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    specialRequests: ['']
  });

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  bookingSuccess = signal(false);
  contactSuccess = signal(false);

  rooms = [
    {
      id: 'standard',
      name: 'Standard Ocean View',
      description: 'Cozy and comfortable with a private balcony offering unobstructed views of the sea and sunset.',
      price: 65,
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Sunset Suite',
      description: 'Spacious suite featuring premium bedding, a small living area, and breathtaking panoramic ocean vistas.',
      price: 95,
      capacity: 3,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'villa',
      name: 'Family Beachfront Villa',
      description: 'Ideal for larger groups. Features direct beach access, multiple beds, and a private sunbathing patio.',
      price: 150,
      capacity: 5,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  gallery = [
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', alt: 'Golden Sunset at Ginatilan Beach' },
    { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', alt: 'Resort Pool Area' },
    { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80', alt: 'Oceanfront Dining' },
    { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80', alt: 'Beach Loungers' },
    { url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80', alt: 'Tropical Palm Trees' },
    { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', alt: 'Relaxing Sandy Shores' }
  ];

  reviews = [
    { name: 'Maria Santos', text: 'The sunsets here are unbelievable! The staff is so friendly and the rooms are very clean. A hidden gem in South Cebu.', rating: 5, date: 'Oct 2024' },
    { name: 'John Doe', text: 'Quiet, peaceful, and absolutely relaxing. Loved waking up to the sound of the ocean. Highly recommend the family villa if you travel in larger groups.', rating: 5, date: 'Aug 2024' },
    { name: 'Anna R.', text: 'Booking was so easy and our stay was perfect. We especially enjoyed the easy access to the beach. Will be definitely coming back!', rating: 5, date: 'Mar 2025' }
  ];

  isBookingFieldInvalid(field: string): boolean | undefined {
    const control = this.bookingForm.get(field);
    return control?.invalid && control?.touched;
  }

  isContactFieldInvalid(field: string): boolean | undefined {
    const control = this.contactForm.get(field);
    return control?.invalid && control?.touched;
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      this.bookingSuccess.set(true);
      // Mock API call delay
      setTimeout(() => {
        this.bookingSuccess.set(false);
        this.bookingForm.reset({ guests: '2', roomType: 'standard' });
      }, 5000);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  submitContact() {
    if (this.contactForm.valid) {
      this.contactSuccess.set(true);
      // Mock API call delay
      setTimeout(() => {
        this.contactSuccess.set(false);
        this.contactForm.reset();
      }, 5000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
