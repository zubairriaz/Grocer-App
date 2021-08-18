import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'

export const transformError = (errResponse: HttpErrorResponse) => {
  console.log(errResponse)
  let errorMessage = 'An unknown error has occurred'
  if (typeof errResponse == 'string') {
    errorMessage = errResponse
  } else if (errResponse.error instanceof ErrorEvent) {
    errorMessage = errResponse.error.message
  } else if (errResponse.status) {
    errorMessage = `Request Failed with ${errResponse.status} and ${errResponse.statusText}`
  } else if (errResponse instanceof Error) {
    errorMessage = errResponse.message
  }

  return throwError(errorMessage)
}
