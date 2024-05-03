import tagIcon from "../../assets/tag_icon.svg"

const tags = ["天候", "伝統", "和歌", "物語"]

interface WordTagsProps {
    inputFontSize: string
    inputImgSize: number
}

const WordTags: React.FC<WordTagsProps> = (props) => {
    return (
        <div style={{textAlign:'left', color:'#939393', fontSize:props.inputFontSize}}>
            <div style={{display:'flex'}}><img src={tagIcon} alt="単語タグのアイコン" width={props.inputImgSize} height={props.inputImgSize}  style={{marginRight:'10px'}}/> {tags.join(", ")}</div>
        </div>
    )
}

export default WordTags