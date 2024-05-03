import { WordDescriptionEntity } from "./WordInfoDetail"


const WordDescription: React.FC<WordDescriptionEntity> = (props) => {
    return (
        <>
            <p style={{marginTop:'50px', fontSize:'1.2em', lineHeight:'2em'}}>{props.description}</p>
            <p style={{color:'#939393'}}>{props.sourceName}</p>
        </>
    )
}



export default WordDescription