import {Icon} from "../Icon";
					import { TrashIconSvg } from './TrashIconSvg';

					export const TrashIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {TrashIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
