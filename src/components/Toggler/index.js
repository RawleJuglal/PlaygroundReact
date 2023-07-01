import { Toggler } from '../Toggler/Toggler'
import { Button } from "../Button/Button";
import { TogglerOn } from './TogglerOn';
import { TogglerOff } from './TogglerOff';

Toggler.Button = Button
Toggler.On = TogglerOn
Toggler.Off = TogglerOff

export default Toggler