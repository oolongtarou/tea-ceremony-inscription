
interface Props{
    title: string
    pronunciation: string
    mainFontSize: string
    subFontSize: string
}

const WordTitle: React.FC<Props> = (props) => {
    return (
        <div style={{textAlign:'left'}}>
            <span style={{fontSize:props.mainFontSize, color:'#36540f'}}>{props.title}</span>
            <span style={{fontSize:props.subFontSize, color:'#939393', marginLeft:'10px'}}>{props.pronunciation}</span>
        </div>
    )
}

export default WordTitle