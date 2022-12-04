



const AmenitiesCard=(props)=>{

    return(
        <>
        <div className="flex items-start">
                     <div className="flex h-5 items-center">
                       <input
                         id={props.id}
                         name="Amenities"
                         value={props.name}
                         type='checkbox'
                         tabIndex={props.id}
                         onClick={() => handleToggle(props.id)} 
                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                       />
                     </div>
                     <div className="ml-3 mr-3 text-sm">
                       <label htmlFor={props.name} className="font-medium text-gray-700">
                         {props.name}
                       </label>
                         </div>
                   </div>
        </>
    )
}
export default AmenitiesCard