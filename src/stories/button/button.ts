import StoryBase from '../storyBase';
// @ts-ignore
import style from './button.scss';
import {subscribe, unsubscribe} from '../../app/services/pubsub';
import {OnDestroy, OnInit} from '@angular/core';

class Button extends StoryBase implements OnInit, OnDestroy {
  id = 'comp-button';
  name = 'Button';
  template = `
    <div class='button-demo'>
      <div class='buttons'>
        <button (click)='params.clickFunc()' >DEFAULT</button>
    </div>
  `;
  angularTemplateToCopy = `
    <button
      [attr.disabled]='disabled'
      (click)='onClick()'>...</button>
  `;
  angularjsTemplateToCopy = `
    <button
      ng-disabled='{{disabled}}'
      ng-click='onClick()'>...</button>
  `;
  styles: [string] = [style];
  params: object = {
    text: 'Click here to make something',
    size: 'small',
    disabled: false,
    clickFunc: function () {
      this.clicks++;
    },
    clicks: 0
  };
  paramsText = `
  const disabled = false;

  function onClick() {
    counter++;
  }
  `;
  status = this.statusEnum.READY;
  documentation = `
/**
 * Button
 * ----------
 * A Button component
 *
 * Attributes:
 * -----------
 * secondary    button is secondary
 * link         button is link
 * small        button is small
 *
 * Params:
 * -------
 * disabled   <Boolean> button is disabled
 *
 * Events:
 * -------
 * ready      <Event> button is ready
 * click      <Event> button is clicked
 */
 `;

  ngOnInit(): void {
    subscribe(Button, (theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    unsubscribe(Button);
  }
}

export default Button;
