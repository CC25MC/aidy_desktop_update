import {Icon} from "../Icon";
					import { AddimageIconSvg } from './AddimageIconSvg';

					export const AddimageIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {AddimageIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
