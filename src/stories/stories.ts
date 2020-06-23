import Button from './button/button';
import Checkbox from './checkbox/checkbox';

const stories = [
  {
    id: 'group-button',
    groupName: 'Button',
    stories: [
      Button
    ]
  },
  {
    id: 'group-checkbox',
    groupName: 'Checkbox',
    stories: [
      Checkbox
    ]
  }
].sort((g1, g2) => g1.groupName < g2.groupName ? -1 : 1);

export default stories;
