import {Icon} from "../Icon";
					import { ListIconSvg } from './ListIconSvg';

					export const ListIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ListIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
