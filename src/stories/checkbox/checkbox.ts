import StoryBase from '../storyBase';
// @ts-ignore
import style from './checkbox.scss';
import {subscribe, unsubscribe} from '../../app/services/pubsub';
import {OnDestroy, OnInit} from '@angular/core';

class Checkbox extends StoryBase implements OnInit, OnDestroy {
  id = 'comp-checkbox';
  name = 'Checkbox';
  template = `
    <div class='checkbox-demo'>
      <div class='checkbox'>
        <div></div>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
      </div>
    </div>
  `;
  angularTemplateToCopy = `
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  `;
  angularjsTemplateToCopy = `
    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  `;
  styles: [string] = [style];
  params: object = {
    checked: true,
    disabled: false,
    onchange: value => console.log(value)
  };
  paramsText = `
  const checked = true;
  const disabled = false;

  function onchange(value) {
    console.log(value);
  }
  `;
  status = this.statusEnum.READY;
  documentation = `
/**
 * Checkbox
 * ----------
 * A checkbox component
 *
 * Attributes:
 * -----------
 * small      checkbox style is small
 * big        checkbox style is big
 *
 * Params:
 * -------
 * checked    <Boolean> checkbox is selected
 * disabled   <Boolean> checkbox is disabled
 *
 * Events:
 * -------
 * ready      <Event> checkbox is ready
 * change     <Event> checkbox is changed
 *                       event.value - true/false
 */
 `;

  ngOnInit(): void {
    subscribe(Checkbox, (theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    unsubscribe(Checkbox);
  }
}

export default Checkbox;
