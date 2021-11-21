
const searchByFilter = (by) => (data,state) => {
    const { value : textValue } = state;
    if( Array.isArray(by) ){
        return by.some( key => {
            if(!textValue){
                return true;
            }
            const compareValue = data[key];

            if(typeof compareValue === "string" || typeof compareValue === "number"){
                return (compareValue + "").toLowerCase().indexOf( textValue.toLowerCase() ) > -1
            }

            return false;
        })
    }
};

export { searchByFilter };