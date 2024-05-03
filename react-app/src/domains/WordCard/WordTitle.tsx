
interface Props{
    mainFontSize: string
    subFontSize: string
}

const WordTitle: React.FC<Props> = (props) => {
    return (
        <div style={{textAlign:'left'}}>
            <span style={{fontSize:props.mainFontSize, color:'#36540f'}}>篝火</span>
            {/* <span style={{fontSize:'27.5px', color:'#36540f'}}>篝火</span> */}
            <span style={{fontSize:props.subFontSize, color:'#939393', marginLeft:'10px'}}>かがりび</span>
        </div>
    )
}

export default WordTitle