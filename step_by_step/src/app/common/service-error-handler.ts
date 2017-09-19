import { Observable } from 'rxjs/Observable';
import { BadInputError } from './bad-input-error';
import { NotFoundError } from './not-found-error';
import { AppError } from './app-error';

export class ServiceErrorHandler {
  static handleError(response: Response) {
    if (response.status === 400) {
      return Observable.throw(new BadInputError(response.json()));
    }
    if (response.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(response));
  }
}
