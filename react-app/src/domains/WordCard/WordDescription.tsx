import React from "react"

interface DescriptionProps {
    description: string
}

const Description: React.FC<DescriptionProps> = props => {
    return(
        <>
            <div 
                style={{width:'275px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'#939393', fontSize:'15px', textAlign:'left'}}
                >
                    {props.description}
            </div>
        </>
    )
}

export default  Description