import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { SocialIconComponent } from '../shared/social-icon/social-icon.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactForm } from '../models/contactForm';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialIconComponent,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  error = false;
  loading = false;

  contactInfo = {
    email: 'contact@synocti.ca',
    phone: '(438) 493-5557',
    hours: 'contact.info.hours.value'
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      contactMethod: ['email'],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // Reset status
    this.success = false;
    this.error = false;

    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;

    // Create a ContactForm instance from form values
    const formValues = this.contactForm.value;
    const contactFormData = new ContactForm(
      formValues.fullName,
      formValues.email,
      formValues.phone || '',
      formValues.contactMethod,
      formValues.subject || '',
      formValues.message
    );

    //Api call to send the form data
    const result = await this.apiService.sendContactForm(contactFormData);
    if (result.success) {
      this.success = true;
      this.loading = false;
      this.resetForm();
    } else {
      console.error('Error submitting form:', result.error);
      this.error = true;
      this.loading = false;
    }
  }

  private resetForm(): void {
    this.contactForm.reset({
      contactMethod: 'email' // Reset to default value
    });
    this.submitted = false;
  }
}
