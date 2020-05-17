import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { RealisationsCategories, RealisationsTypes, Realisations } from '../models/realisations';

@Injectable({
  providedIn: 'root'
})
export class RealisationsService {
  apiUrlProject = 'http://localhost:3000/admin/project/';
  apiUrlProjectCategories = 'http://localhost:3000/admin/ProjectCategories/';
  apiUrlProjectTypes = 'http://localhost:3000/admin/ProjectTypes/';

  constructor(protected http: HttpClient) { }

  newRealisation(typ, titr, cat, ima): Observable<HttpResponse<Realisations>> {
    return this.http.post<Realisations>(this.apiUrlProject, {type: typ, titre: titr, categorie: cat, image: ima}, {observe: 'response'});
  }

  getRealisations(): Observable<HttpResponse<Realisations[]>> {
    return this.http.get<Realisations[]>(this.apiUrlProject, {observe: 'response'});
  }

  deleteRealisation(id): Observable<HttpResponse<Realisations>> {
    return this.http.delete<Realisations>(this.apiUrlProject + id, {observe: 'response'});
  }

  getRealisationById(idReal): Observable<HttpResponse<Realisations>> {
    return this.http.get<Realisations>(this.apiUrlProject + idReal, {observe: 'response'});
  }

  updateRealisation(titr, typ, cat, img, id): Observable<HttpResponse<Realisations>> {
    return this.http.put<Realisations>(this.apiUrlProject + id, {titre: titr, type: typ, categorie: cat, image: img}, {observe: 'response'});
  }

  newCategory(nom): Observable<HttpResponse<RealisationsCategories>> {
    return this.http.post<RealisationsCategories>(this.apiUrlProjectCategories, {name: nom}, {observe: 'response'});
  }

  getCategories(): Observable<HttpResponse<RealisationsCategories[]>> {
    return this.http.get<RealisationsCategories[]>(this.apiUrlProjectCategories, {observe: 'response'});
  }

  newType(nom): Observable<HttpResponse<RealisationsTypes>> {
    return this.http.post<RealisationsTypes>(this.apiUrlProjectTypes, {name: nom}, {observe: 'response'});
  }

  getTypes(): Observable<HttpResponse<RealisationsTypes[]>> {
    return this.http.get<RealisationsTypes[]>(this.apiUrlProjectTypes, {observe: 'response'});
  }


  uploadFile(file: File) {
    return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
              .child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
              () => {
                console.log('Chargement…');
              },
              (error) => {
                console.log('Erreur de chargement ! : ' + error);
                reject();
              },
              () => {
                resolve(upload.snapshot.ref.getDownloadURL());
              }
          );
        }
    );
  }

}
