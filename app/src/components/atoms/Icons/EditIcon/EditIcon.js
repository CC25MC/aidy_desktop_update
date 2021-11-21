import {Icon} from "../Icon";
					import { EditIconSvg } from './EditIconSvg';

					export const EditIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {EditIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
