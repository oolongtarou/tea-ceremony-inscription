import tagIcon from "../../assets/tag_icon.svg"

interface WordTagsProps {
    tag: string;
    inputFontSize: string;
    inputImgSize: number;
}

const WordTags: React.FC<WordTagsProps> = (props) => {
    return (
        <div style={{textAlign:'left', color:'#939393', fontSize:props.inputFontSize}}>
            <div style={{display:'flex'}}>
                <img src={tagIcon} alt="単語タグのアイコン" width={props.inputImgSize} height={props.inputImgSize}  style={{marginRight:'10px'}}/>
                {props.tag}
            </div>
        </div>
    )
}

export default WordTags