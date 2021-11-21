import { Box, Icon, Image, Set } from 'bumbag';
import { useField } from 'formik';

const GalleryField = ({
    name,
    minEmptyCards = 4,
    getPreview
}) => {
    //eslint-disable-next-line
    const [ field, meta, helpers] = useField(name);
    const images = Array.isArray(meta.value) ? meta.value : [];

    const handleAddImages = (event) => {
        const files = event.target.files;
        let newImages = []; 
        for( const file of files ) {
            newImages.push(
                Object.assign(file,{ preview: URL.createObjectURL(file) })
            );
        }
        helpers.setValue( [...images,...newImages] );
    };
    return (
        <Set spacing = "major-4">
            {images.map( (image,id) => (
                <GalleryItem 
                    key = {`image-${id}`}
                    index = {id}
                    onChange = {handleAddImages}
                    image = { typeof getPreview === "function" ? getPreview(image) : image.preview }
                />
            ))}
            {Array.from({ length: minEmptyCards - images.length - 1 }, (_,index) => (
                <GalleryItem 
                    key = {index} 
                    index = {index} 
                    onChange = {handleAddImages} 
                />
            ))}
            <GalleryItem 
                index = {"add"} 
                onChange = {handleAddImages} 
            />
        </Set>
    );
};

const GalleryItem = ({
    index,
    image,
    onChange
}) => {
    const id = `gallery-item-${index}`;
    return (
        <Box>
            <Box use = "label" htmlFor = {id} display = "block">
                <Box 
                    overflow = "hidden"
                    width = "170px" 
                    height = "170px"
                    background = "#09234B"
                    borderRadius = "12px"
                    justifyContent = "center"
                    alignItems = "center"
                    display = "flex"
                    cursor = "pointer"
                >
                    {image 
                        ? (
                            <Image
                                width = "100%"
                                height = "100%"
                                src = {image}
                                alt = {id}
                                fit = "cover"
                            />
                        ) : (
                            <Icon icon = "img" color = "white" fontSize = {"2em"} />
                        )
                    }
                    <Box multiple="multiple" use = "input" display = "none" id = {id} type = "file" onChange = {onChange} />
                </Box>
            </Box>
        </Box>
    );
};

export { GalleryField };