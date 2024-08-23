import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Repository } from '../../repository/repository';
import { Todo } from '../components/entities/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService extends Repository<Todo> {

  constructor(
    protected override _http: HttpClient,
    protected override _router: Router,
    protected override _dialog: MatDialog
) {
    super(_http, `${environment.baseUrl}/api`, _router,_dialog);
}
}
