import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type LegalDocumentType = 'privacy' | 'terms' | 'cookies';

export interface LegalDocument {
  id: LegalDocumentType;
  titleKey: string;
  lastUpdatedKey: string;
  sectionsKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class LegalDataService {

  private legalDocuments: Record<LegalDocumentType, LegalDocument> = {
    privacy: {
      id: 'privacy',
      titleKey: 'legal.documents.privacy.title',
      lastUpdatedKey: 'legal.documents.privacy.lastUpdated',
      sectionsKey: 'legal.documents.privacy.sections'
    },
    terms: {
      id: 'terms',
      titleKey: 'legal.documents.terms.title',
      lastUpdatedKey: 'legal.documents.terms.lastUpdated',
      sectionsKey: 'legal.documents.terms.sections'
    },
    cookies: {
      id: 'cookies',
      titleKey: 'legal.documents.cookies.title',
      lastUpdatedKey: 'legal.documents.cookies.lastUpdated',
      sectionsKey: 'legal.documents.cookies.sections'
    }
  };

  constructor(private translateService: TranslateService) { }

  getAllDocumentTypes(): LegalDocumentType[] {
    return ['privacy', 'terms', 'cookies'];
  }

  getDocumentById(id: LegalDocumentType): LegalDocument {
    return this.legalDocuments[id];
  }

  isValidDocumentType(document: string): document is LegalDocumentType {
    return ['privacy', 'terms', 'cookies'].includes(document);
  }
}
