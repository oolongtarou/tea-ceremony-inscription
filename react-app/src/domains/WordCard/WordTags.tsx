
const tags = ["天候", "伝統", "和歌", "物語"]

export default function WordTags() {
    return (
        <div style={{textAlign:'left', color:'#939393', fontSize:'15px'}}>
            <div><span>アイコン</span> {tags.join(", ")}</div>
        </div>
    )
}