import { Injectable } from '@angular/core';
import { HttpService } from '../api/api.service';
import { Credentials } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import appConfig from '../../config/main.config';
import { User } from '../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, private router: Router) { }

  public isAuthenticated(): boolean {
    const expiresAt = localStorage.getItem('expiresAt');

    if (!expiresAt) {
      return false;
    }

    return new Date().getTime() < -(-expiresAt);
  }

  // TODO! Change any with different interface
  public login(credentials: Credentials): Observable<any> {
    return this.httpService.post(appConfig.authenticateEndPoint, { ...credentials });
  }

  public signUp(newUser: User): Observable<any> {
    return this.httpService.post(appConfig.createUserEndPoint, { ...newUser });
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    this.router.navigate(['login']);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserInfo(): User {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUser(token: string, userInfo: User, expiresAt: number): void {
    this.setToken(token);
    this.setUserInfo(userInfo);
    this.setExpiresAt(expiresAt);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setUserInfo(userInfo: User): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  private setExpiresAt(expiresAt: number): void {
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt * 1000));
  }


}
