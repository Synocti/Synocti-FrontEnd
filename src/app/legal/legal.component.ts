import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegalDataService, LegalDocumentType, LegalDocument } from '../services/legal-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule
],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.css'
})
export class LegalComponent implements OnInit {
  activeDocumentType: LegalDocumentType = 'privacy';
  activeDocument!: LegalDocument;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legalDataService: LegalDataService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    // Get the document type from the route parameter
    this.route.paramMap.subscribe(params => {
      const documentParam = params.get('document');

      // Check if document parameter exists and is valid
      if (documentParam && this.legalDataService.isValidDocumentType(documentParam)) {
        this.activeDocumentType = documentParam as LegalDocumentType;
      } else {
        // If invalid or not provided, redirect to privacy policy
        this.router.navigate(['/legal', 'privacy']);
      }
      this.activeDocument = this.getCurrentDocument();
    });
  }

  setActiveDocument(documentType: LegalDocumentType): void {
    // Update the route to match the selected document
    this.router.navigate(['/legal', documentType]);
    this.activeDocument = this.getCurrentDocument();
  }

  getCurrentDocument(): LegalDocument {
    return this.legalDataService.getDocumentById(this.activeDocumentType);
  }

  getSubtitle(): string {
    const lastUpdatedText = this.translateService.instant('legal.lastUpdated');
    const lastUpdatedDate = this.translateService.instant(this.activeDocument.lastUpdatedKey);
    return `${lastUpdatedText}:  ${lastUpdatedDate}`;
  }
}
