import { JsxElement } from 'typescript'
import { HeaderProps } from '../types'

const Header = (props: HeaderProps): JSX.Element => {
   return (
   <div>
    {props.name}
   </div>
   )    
}

export default Header