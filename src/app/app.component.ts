import {Component} from '@angular/core';
import stories from '../stories/stories';
import hljs from 'highlight.js/lib/highlight';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selected: any;
  themes: string[] = [
    'test',
    'test-dark'
  ];
  selectedThemeIndex: number;
  selectedTheme: string;
  stories: Object[];

  constructor() {
    const hash = location.hash.split('?');
    let params = new URLSearchParams();
    if (hash.length === 2) {
      params = new URLSearchParams(hash[1]);
    }

    // Stories
    this.stories = stories.map(group => {
      const storyGroup = {
        id: group.id,
        name: group.groupName,
        isOpen: false,
        stories: []
      };

      // @ts-ignore
      storyGroup.stories = group.stories.map(storyClass => {
        const story = {
          storyClass,
          storyInstance: new storyClass(),
          style: '',
          angularTemplateToCopy: '',
          angularjsTemplateToCopy: ''
        };
        story.style = story.storyInstance.styles.toString().replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
        story.style = hljs.highlight('css', story.style).value;
        story.angularTemplateToCopy = hljs.highlight('html', story.storyInstance.angularTemplateToCopy || story.storyInstance.template).value;
        story.angularjsTemplateToCopy = hljs.highlight('html', story.storyInstance.angularjsTemplateToCopy).value;

        if (hash.length > 0 && storyClass.name === hash[0].substr(1)) {
          storyGroup.isOpen = true;
          this.selected = story;
        }

        return story;
      });

      return storyGroup;
    });

    if (!this.selected)
      location.hash = '';


    // Theme
    let theme = params.get('theme') || localStorage.getItem('theme');
    if (!theme) {
      this.selectedThemeIndex = 0;
      theme = this.themes[this.selectedThemeIndex];
      localStorage.setItem('theme', theme);
    } else {
      this.selectedThemeIndex = this.themes.findIndex(_theme => _theme === theme);
    }
    this.selectedTheme = theme;
  }

  onSelect(story) {
    this.selected = story;
    location.hash = story.storyClass.name;
    document.querySelector('.drawer-content.mat-drawer-content').scrollTop = 0;
  }

  isOpened() {
    // Screen size (phone or pc)
    return window.innerWidth > 600;
  }
}
