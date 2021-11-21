import {Icon} from "../Icon";
					import { GridIconSvg } from './GridIconSvg';

					export const GridIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {GridIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
