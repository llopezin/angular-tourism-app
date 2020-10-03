import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MatchingFields {
  public static match(fields: Array<AbstractControl>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = fields[0].value !== fields[1].value;
      const noEmptyValues = fields[1].value && fields[0].value;
      return invalid && noEmptyValues
        ? { noMatchError: { field: [fields[0], fields[1]] } }
        : null;
    };
  }
}
