import {Icon} from "../Icon";
					import { Main3poinsIconSvg } from './Main3poinsIconSvg';

					export const Main3poinsIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {Main3poinsIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
