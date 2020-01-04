# TeduShop Angular 8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Upgrade to Angular CLI 8
- npm install -g npm-check-updates
- ncu
- ncu -u
- npm install
- sudo npm install -g rxjs-tslint rxjs-5-to-6-migrate -p src/tsconfig.app.json
- npm install @angular/cdk --save
- npm i -S core-js@2.5.7
- Change all "es6" and "es7" to "es" in your polyfills.ts and polyfills.ts (Optional).
From: import 'core-js/es6/symbol';
To: import 'core-js/es/symbol';

- First thing is you need to change your import in app.component.ts from

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

to

import { BsModalRef } from 'ngx-bootstrap';

- import { ChartsModule } from 'ng2-charts/ng2-charts';
 to import { ChartsModule } from 'ng2-charts';
