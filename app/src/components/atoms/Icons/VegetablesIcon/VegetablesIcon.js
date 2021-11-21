import {Icon} from "../Icon";
					import { VegetablesIconSvg } from './VegetablesIconSvg';

					export const VegetablesIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {VegetablesIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
