import { WordDescriptionEntity } from "./WordInfoDetail"


const WordDescription: React.FC<WordDescriptionEntity> = (props) => {
    // 改行コードを含めたひとまとまりの語釈を改行コードごとに分割する。
    const descriptionLines: string[] = props.description.split("\n");
    return (
        <div style={{overflow:'auto', maxHeight:'60vh'}}>
            {descriptionLines.map((line, index) => (
                <p key={index} style={{fontSize:'1.2em', lineHeight:'1em'}}>{line}</p>
            ))}
            <p style={{color:'#939393'}}>{props.sourceName}</p>
        </div>
    )
}



export default WordDescription