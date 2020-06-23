/**
 * Story Base class
 */

export enum STATUS {
  DEV = 'In development',
  READY = 'Ready to use',
}

abstract class StoryBase {
  abstract id: string;
  abstract name: string;

  // Template
  abstract template: string;
  abstract angularTemplateToCopy: string;
  abstract angularjsTemplateToCopy: string;

  // Style
  abstract styles: [string];

  // Params
  abstract params: object;
  imports: any;
  statusEnum = STATUS;
  theme: string = localStorage.getItem('theme');
  baseDocumentation: String = `
/**
 * Base functionality
 * ------------------
 *
 * Base Params:
 * ------------
 * theme     <String> theme of the component
 *
 * Base Events:
 * ------------
 * ready     <Event>  component is ready
 */
  `;

  constructor() {

    this.imports = [];
  }
}

export default StoryBase;
