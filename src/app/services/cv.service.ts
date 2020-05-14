import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Formation} from '../models/formation';
import {SoftSkill, SoftType} from '../models/soft-skill';
import {Skill} from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(protected http: HttpClient) {
  }

  apiUrl = 'http://localhost:3000/admin/';

  // Section for education component
  getEducationList(): Observable<HttpResponse<Formation[]>> {
    return this.http.get<Formation[]>(this.apiUrl + 'educations', {observe: 'response'});
  }

  getEducationById(id): Observable<HttpResponse<Formation>> {
    const url = this.apiUrl + 'education/' + id;
    return this.http.get<Formation>(url, {observe: 'response'});
  }

  newFormation(dateDebut, dateFin, tit, lie, descr): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.apiUrl + 'education',
      {date_debut: dateDebut, date_fin: dateFin, titre: tit, lieu: lie, description: descr},
      {observe: 'response'});
  }

  updateFormation(dateDebut, dateFin, tit, lie, descr, id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'education/' + id;
    return this.http.put<string>(url,
      {date_debut: dateDebut, date_fin: dateFin, titre: tit, lieu: lie, description: descr},
      {observe: 'response'});
  }

  deleteEducation(id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'education/' + id;
    return this.http.delete<string>(url, {observe: 'response'});
  }

  // Section for soft-skill component
  getSoftSkillList(): Observable<HttpResponse<SoftSkill[]>> {
    return this.http.get<SoftSkill[]>(this.apiUrl + 'softs', {observe: 'response'});
  }

  getSoftSkillById(id): Observable<HttpResponse<SoftSkill>> {
    const url = this.apiUrl + 'soft/' + id;
    return this.http.get<SoftSkill>(url, {observe: 'response'});
  }

  newSoftSkill(typeSoft, titreSoft, pourcent): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.apiUrl + 'soft', {
      type: typeSoft,
      titre: titreSoft,
      pourcentage: pourcent
    }, {observe: 'response'});
  }

  updateSoftSkill(typeSoft, titreSoft, pourcent, id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'soft/' + id;
    return this.http.put<string>(url, {type: typeSoft, titre: titreSoft, pourcentage: pourcent}, {observe: 'response'});
  }

  deleteSoftSkill(id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'soft/' + id;
    return this.http.delete<string>(url, {observe: 'response'});
  }

  // Section for soft skill types
  getSoftTypes(): Observable<HttpResponse<SoftType[]>> {
    return this.http.get<SoftType[]>(this.apiUrl + 'type_softs', {observe: 'response'});
  }

  getSoftSkillsTypeByIdById(id): Observable<HttpResponse<SoftType>> {
    const url = this.apiUrl + 'type_soft/' + id;
    return this.http.get<SoftType>(url, {observe: 'response'});
  }

  newSoftType(nom): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.apiUrl + 'type_soft', {name: nom}, {observe: 'response'});
  }

  updateSoftSkillType(nom, id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'type_soft/' + id;
    return this.http.put<string>(url, {name: nom}, {observe: 'response'});
  }

  deleteSoftSkillTypeById(id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'type_soft/' + id;
    return this.http.delete<string>(url, {observe: 'response'});
  }

  // Section for skill component
  getSkillList(): Observable<HttpResponse<Skill[]>> {
    return this.http.get<Skill[]>('skills', {observe: 'response'});
  }

  getSkillById(id): Observable<HttpResponse<Skill>> {
    const url = this.apiUrl + 'skill/' + id;
    return this.http.get<Skill>(url, {observe: 'response'});
  }

  newSkill(dateDebut, dateFin, titr, entrep, descr): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.apiUrl + 'skill',
      {date_debut: dateDebut, date_fin: dateFin, titre: titr, entreprise: entrep, description: descr},
      {observe: 'response'});
  }

  updateSkill(dateDebut, dateFin, titr, entrep, descr, id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'skill/' + id;
    return this.http.put<string>(url,
      {date_debut: dateDebut, date_fin: dateFin, titre: titr, entreprise: entrep, description: descr},
      {observe: 'response'});
  }

  deleteSkill(id): Observable<HttpResponse<string>> {
    const url = this.apiUrl + 'skill/' + id;
    return this.http.delete<string>(url, {observe: 'response'});
  }
}
