import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ContactForm } from '../models/contactForm';
import { Project } from '../models/project';

const domain = 'https://admin.synocti.ca/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // ===== Projects API Calls =====

  async getProjects(language: string): Promise<{ success: boolean; data?: Project[]; error?: any }> {
    try {
      const response = await firstValueFrom(
        this.http.get<Project[]>(`${domain}api/projects/website/${language}`)
      );
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  }

  // ===== Forms API Calls =====

  async sendContactForm(contactForm: ContactForm): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${domain}api/contact-forms/submit`, contactForm)
      );
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  }

  // ===== Media API Calls =====

  getImageUrl(picturePath: string | null): string | null {
    if (!picturePath) return null;
    return `${domain}${picturePath}`;
  }
}
