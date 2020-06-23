import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef,
  Input,
  ModuleWithComponentFactories,
  NgModule,
  NO_ERRORS_SCHEMA,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import StoryBase from '../../stories/storyBase';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnChanges {
  @Input()
  story: any = {
    storyInstance: {}
  };

  // Inject a reference to a DOM element with the corresponding hash-tag (#)
  @ViewChild('container', {read: ViewContainerRef, static: true})
  container: ViewContainerRef;

  // Component reference
  private componentRef: ComponentRef<{}>;

  constructor(private compiler: Compiler, private ref: ElementRef, public snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.story && changes.story.currentValue) {
      this.compileStory(changes.story.currentValue);
    }

    this.ref.nativeElement.scrollTop = 0;
  }

  /**
   * Compile a story to a component
   */
  compileStory(story: any) {
    const factory = this.createComponentFactorySync(story.storyClass, story.storyInstance);

    // Destroy previous component reference
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

  /**
   * Create an on-the-fly component
   */
  private createComponentFactorySync(storyClass: any, storyInstance: StoryBase): ComponentFactory<any> {
    // Create a new decorator
    const metadata = {
      selector: 'runtime-component',
      template: storyInstance.template,
      styles: storyInstance.styles,
      encapsulation: ViewEncapsulation.None
    };
    const decoratedCmp = Component(metadata)(storyClass);

    const moduleClass = class RuntimeComponentModule {
    };
    const decoratedNgModule = NgModule({
      imports: [
        CommonModule,
        ...storyInstance.imports
      ], declarations: [decoratedCmp],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })(moduleClass);

    this.compiler.clearCacheFor(decoratedCmp);
    this.compiler.clearCacheFor(decoratedNgModule);
    const module: ModuleWithComponentFactories<any> = this.compiler.compileModuleAndAllComponentsSync(decoratedNgModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  clickToCopy(text) {
    const copyText = document.getElementById('copy-to-clipboard');
    // @ts-ignore
    copyText.value = text;
    // @ts-ignore
    copyText.select();
    document.execCommand('copy');

    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Copied to clipboard', 'close', {
      duration: 2000,
    });
  }
}
