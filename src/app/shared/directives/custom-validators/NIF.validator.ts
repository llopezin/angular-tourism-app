import { AbstractControl } from '@angular/forms';

export class checkNIF {
  public static NIFisValid(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const NIF = control.value.toUpperCase();

    const letter = NIF.charAt(8);
    const nifLettersCheck = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(
      parseInt(NIF, 10) % 23
    );

    const valid =
      /^(\d{8})([A-HJ-NP-TV-Z])$/.test(NIF) && nifLettersCheck == letter;

    return valid ? null : { invalidNIF: { value: 'NIF' } };
  }
}
