import { Service } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { USERS } from '../models/user.mock';

// @Service()
// export class Auth {}

// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

@Service()
export class AuthService {
  private readonly users: User[] = USERS;

  // private readonly storageKey = 'renthub_current_user';
  private readonly USERS_KEY = 'rent-hub-users';
  private readonly CURRENT_USER_KEY = 'rent-hub-current-user';

  private readonly currentUserSubject =
    new BehaviorSubject<User | null>(
      this.loadCurrentUser()
    );

  readonly currentUser$ = this.currentUserSubject.asObservable();
  
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  register( name: string, email: string, password:string): boolean {
    const users =
      this.loadUsers();

    const existingUser =
      users.find(
        user =>
          user.email.toLowerCase() ===
          email.toLowerCase()
      );

    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      this.USERS_KEY,
      JSON.stringify(users)
    );

    this.setCurrentUser(
      newUser
    );

    return true;
  }


  login(
    email: string,
    password: string
  ): boolean {

    const users =
      this.loadUsers();

    const user =
      users.find(
        item =>
          item.email.toLowerCase() ===
            email.toLowerCase() &&
          item.password === password
      );

    if (!user) {
      return false;
    }

    this.setCurrentUser(user);

    return true;
  }

  logout(): void {

    localStorage.removeItem(
      this.CURRENT_USER_KEY
    );

    localStorage.removeItem(
      this.USERS_KEY
    );

    this.currentUserSubject.next(
      null
    );

  }

  private setCurrentUser(
    user: User
  ): void {

    localStorage.setItem(
      this.CURRENT_USER_KEY,
      JSON.stringify(user)
    );

    this.currentUserSubject.next(
      user
    );
  }

  private loadUsers(): User[] {

    // const stored =
    //   localStorage.getItem(
    //     this.USERS_KEY
    //   );

    // if (!stored) {
    //   return [];
    // }

    try {
      // return JSON.parse(stored) as User[];
        localStorage.setItem(
             this.USERS_KEY,
             JSON.stringify(this.users)
             );
      return this.users;
    }
    catch {
      return [];
    }
  }

  private loadCurrentUser():
    User | null {
    const stored =
      localStorage.getItem(
        this.CURRENT_USER_KEY
      );

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as User;
    }
    catch {
      return null;
    }
  }
}

  // login(
  //   email: string,
  //   password: string
  // ): boolean {

  //   const user =
  //     this.users.find(
  //       u =>
  //         u.email.toLowerCase() === email.toLowerCase() &&
  //         u.password === password
  //     );

  //   if (!user) {
  //     return false;
  //   }

  //   localStorage.setItem(
  //     this.storageKey,
  //     JSON.stringify(user)
  //   );

  //   return true;
  // }


  // logout(): void {

  //   localStorage.removeItem(
  //     this.storageKey
  //   );

  // }


  // isAuthenticated(): boolean {

  //   return localStorage.getItem(
  //     this.storageKey
  //   ) !== null;

  // }


  // getCurrentUser(): User | null {

  //   const user =
  //     localStorage.getItem(
  //       this.storageKey
  //     );

  //   if (!user) {
  //     return null;
  //   }

  //   return JSON.parse(user) as User;

  // }


  // register(user: User): boolean {

  //   const existingUser =
  //     this.users.find(
  //       u =>
  //         u.email.toLowerCase() ===
  //         user.email.toLowerCase()
  //     );

  //   if (existingUser) {
  //     return false;
  //   }

  //   this.users.push(user);

  //   return true;
  // }