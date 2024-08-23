import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../components/entities/login';
import { environment } from '../../environments/environment';
import { HttpDataResponse } from '../utilities/http-data-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    protected readonly _http: HttpClient,
  ) { }

  public login(user: UserLogin): Observable<HttpDataResponse<UserLogin>>{
    return this._http.post<HttpDataResponse<any>>(`${environment.baseUrl}/user/login/`, user)
}

}
