import React from 'react'
const shortenCharacters =  (str) => {
    if (str.length > 80)
        return str.substring(0, 79) + "...";
    return str;
}
const HitCard = ({termData}) => {
  
  
    return (
    <div className=" bg-gray-600 text-white flex flex-col px-2 py-3 w-full h-28 mb-4 rounded-lg overflow-y-hidden">
        <h1 className="font-bold text-lg">{termData.TITLE}</h1>
        <h3 className=" font-light text-sm">{shortenCharacters(termData.DESCRIPTION)}</h3>
    </div>
  )
}

export default HitCard;