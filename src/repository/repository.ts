import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { IRepository } from "../interfaces/repository.interface";
import { MatDialog } from '@angular/material/dialog';
import { AppFeeback } from '../app/enums/app-feedback.enum';

export abstract class Repository<T> implements IRepository<T>{

  constructor(
      protected readonly _http: HttpClient,
      protected readonly _base: string,
      protected readonly _router: Router,
      protected readonly _dialog: MatDialog
  ) {}


  putFind$(uri: string | undefined): Observable<T[] | T | any> {
      return this._http.put<T[] | T>(this._base + `/${uri}`,"")
      .pipe(
          map((res: any) => {
              if(res.status.code == '400')
                  throw res.status.message;

              else if (res.status.code == '500')
                  throw AppFeeback.NETWORK_ERROR;

              else if (res.status.code == '401')
                  throw AppFeeback.SESSION_EXPIRED;

              return res.response;
          }),
          catchError(error => {
              if(typeof error !== 'string'){
                  if(error.status == 0 || error.status == 200){
                      this._router.navigate(['/login'], { replaceUrl: true })

                      this._dialog.closeAll()
                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )
  }

  postFind$(uri: string | undefined): Observable<T[] | T | any> {
      return this._http.post<T[] | T>(this._base + `/${uri}`,"")
      .pipe(
          map((res: any) => {
              if(res.status.code == '400')
                  throw res.status.message;

              else if (res.status.code == '500')
                  throw AppFeeback.NETWORK_ERROR;

              else if (res.status.code == '401')
                  throw AppFeeback.SESSION_EXPIRED;

              return res.response;
          }),
          catchError(error => {
              if(typeof error !== 'string'){
                  if(error.status == 0 || error.status == 200){
                      this._router.navigate(['/login'], { replaceUrl: true })

                      this._dialog.closeAll()
                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )
  }


//   find$(uri: string | undefined): Observable<T[] | T | any> {
//     console.log("test",this._base + `/${uri}/`)
//       return this._http.get<T[] | T>(this._base + `/${uri}/`)
//       .pipe(
//           map((res: any) => {
//               switch (res.status.code) {
//                   case "400":
//                       throw res.status.message;

//                   case "500":
//                       throw AppFeeback.NETWORK_ERROR;

//                   case "401":
//                       throw AppFeeback.SESSION_EXPIRED;

//                   case "":
//                       throw res.status.message;

//                   case "200":
//                       return res.response;

//                   default:
//                       break;
//               }
//           }),
//           catchError(error => {
//               if(typeof error !== 'string'){
//                   if(error.status == 0 || error.status == 200){
//                       this._router.navigate(['/login'], { replaceUrl: true })
//                       this._dialog.closeAll()

//                       throw AppFeeback.SESSION_EXPIRED;
//                   }
//                   else throw AppFeeback.NETWORK_ERROR;
//               }
//               throw error
//           })
//       )
//   }
find$(uri: string | undefined): Observable<T[] | T | any> {
    return this._http.get<T[] | T>(this._base + `/${uri}`)
      .pipe(
        catchError(error => {
          if (error && error.status) {
            // HTTP request error
            if (error.status === 401) {
              // Handle session expired error
              // You can choose to redirect to login page here
              // this.router.navigate(['/login']);
              return throwError(() => new Error(AppFeeback.SESSION_EXPIRED));
            } else {
              // Handle other HTTP request errors
              return throwError(() => new Error(AppFeeback.SESSION_EXPIRED));
            }
          } else {
            // Error in response structure or unexpected error
            // Handle other types of errors
            return throwError(() => new Error(AppFeeback.SESSION_EXPIRED));
        }
        })
      );
  }
  save$(data: T, uri: string): Observable<T> {
      return this._http.post<T>(this._base + `/${uri}`, data)
      .pipe(
          map((res: any) => {
              switch (res.status.code) {
                  case "400":
                      throw res.status.message;

                  case "500":
                      throw AppFeeback.NETWORK_ERROR;

                  case "401":
                      throw AppFeeback.SESSION_EXPIRED;

                  case "":
                      throw res.status.message;

                  case "418":
                      throw res.status.message;

                  case "200":
                      return res.response;

                  default:
                      break;
              }
          }),
          catchError(error => { 
              if(typeof error !== 'string'){
                  if(error.status == 0 || error.status == 200){
                      this._router.navigate(['/login'], { replaceUrl: true })
                      this._dialog.closeAll()

                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )
  }

  update$(data: T, uri: string | undefined): Observable<T> {
      return this._http.put<T>(this._base + `/${uri}`, data)
      .pipe(
          map((res: any) => {
              switch (res.status.code) {
                  case "400":
                      throw res.status.message;

                  case "500":
                      throw AppFeeback.NETWORK_ERROR;

                  case "401":
                      throw AppFeeback.SESSION_EXPIRED;

                  case "":
                      throw res.status.message;

                  case "200":
                      return res.response;

                  default:
                      break;
              }
          }),
          catchError(error => {
              if(typeof error !== 'string'){
                  if(error.status == 0 || error.status == 200){
                      this._router.navigate(['/login'], { replaceUrl: true })
                      this._dialog.closeAll()

                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )

  }

  delete$(uri: string | undefined): Observable<T> {
      return this._http.delete<T>(this._base + `/${uri}`)
      .pipe(
          map((res: any) => {
              switch (res.status.code) {
                  case "400":
                      throw res.status.message;

                  case "500":
                      throw AppFeeback.NETWORK_ERROR;

                  case "401":
                      throw AppFeeback.SESSION_EXPIRED;

                  case "":
                      throw res.status.message;

                  case "200":
                      return res.response;

                  default:
                      break;
              }
          }),
          catchError(error => {
              if(typeof error !== 'string'){
                  if(error.status == 0 || error.status == 200){
                      this._router.navigate(['/login'], { replaceUrl: true })
                      this._dialog.closeAll()
                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )
  }

  patch$(data: T, uri: string | undefined): Observable<T> {
      return this._http.patch<T>(this._base + `/${uri}`, data)
      .pipe(
          map((res: any) => {
              switch (res.status.code) {
                  case "400":
                      throw res.status.message;

                  case "500":
                      throw AppFeeback.NETWORK_ERROR;

                  case "401":
                      throw AppFeeback.SESSION_EXPIRED;

                  case "":
                      throw res.status.message;

                  case "200":
                      return res.response;

                  default:
                      break;
              }
          }),
          catchError(error => {
              if(typeof error !== 'string'){
                  if(error.status == 0){
                      this._router.navigate(['/login'], { replaceUrl: true })
                      this._dialog.closeAll()
                      throw AppFeeback.SESSION_EXPIRED;
                  }
                  else throw AppFeeback.NETWORK_ERROR;
              }
              throw error
          })
      )
  }
}
