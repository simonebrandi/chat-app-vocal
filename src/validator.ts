// Validators
// This file contains all your validators for the formGroups and for inputPrompts.
// Patterns can be tested by using a RegEx validator such as http://www.regexpal.com, https://regex101.com, among others.

import { Validators } from '@angular/forms';

export namespace Validator {
  // Set your validators here, don't forget to import and use them in the appropriate class that uses formGroups.
  // In this example, they are used on LoginPage where a formGroup for email and passwords is used.
  export const emailValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]
  ];
  export const passwordValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')]
  ];
  export const fullnameValidator = ['', [
    Validators.minLength(1),
    Validators.required
    ]
  ];
  export const usernameValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')]
  ];
  // Set your prompt input validators here, don't forget to import and use them on the AlertController prompt.
  // In this example they are used by home.ts where the user are allowed to change their profile.
  // errorMessages are used by the AlertProvider class and is imported inside AlertProvider.errorMessages which is used by showErrorMessage().
  export const profileNameValidator = {
    minLength: 5,
    lengthError: { title: 'Nome Breve!', subTitle: 'Ci dispiace, ma il nome deve contenere più di 4 caratteri.' },
    pattern: /^[a-zA-Z0-9\s]*$/g,
    patternError: { title: 'Nome Non Valido!', subTitle: 'Ci dispiace, ma il nome inserito contiene caratteri speciali.' }
  };
  export const profileuserNameValidator = {
    minLength: 5,
    lengthError: { title: 'Username Breve!', subTitle: 'Ci dispiace, ma il nome deve contenere più di 4 caratteri.' },
    pattern: /^[a-zA-Z0-9\s]*$/g,
    patternError: { title: 'Username Non Valida!', subTitle: 'Ci dispiace, ma il nome inserito contiene caratteri speciali.' }
  };
  export const profileEmailValidator = {
    pattern: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/g,
    patternError: { title: 'Email Non Valida!', subTitle: 'Ci dispiace, ma la email inserita non è valida.' }
  };
  export const profilePasswordValidator = {
    minLength: 5,
    lengthError: { title: 'Password Breve!', subTitle: 'Ci dispiace, ma la password deve contenere più di 4 caratteri.' },
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
    patternError: { title: 'Password Non Valida!', subTitle: 'Ci dispiace, ma la password contiene caratteri speciali.' }
  };
  // Group Form Validators
  export const groupNameValidator = ['', [Validators.required, Validators.minLength(1)]];
  export const groupDescriptionValidator = ['', [Validators.required, Validators.minLength(1)]];
}
